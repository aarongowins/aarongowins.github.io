import Widget from 'bitbucket/internal/widget';
import $ from 'jquery';
import _ from 'lodash';
import resemble from 'resemble';
import ImageDifferModes from './image-differ-modes';
import DifferMode from './image-differ-mode';

/**
 * Create an ImageDiffer instance in the provided $container. This instance must eventually be `.init()`ed
 *
 * @param {jQuery|HTMLElement} $container where to place the differ.
 * @constructor
 */
class ImageDiffer extends Widget {

    /**
     * @param {jQuery|HtmlElement} container
     */
    constructor (container) {
        super();
        this._$container = $(container);
    }

    /**
     * Initialize the instance. This expects two images to be found in the $container and assumes the first
     * is the "old" revision and the second is the "new" revision. This function will retrieve information about the
     * images like width and height.
     *
     * @returns {Promise} promise that is resolved when the ImageDiffer is fully initialized.
     */
    init () {
        let $imgs = this._$imgs = this._$container.find('img');

        this._$sinceImg = $imgs.eq(0);
        this._$untilImg = $imgs.eq(1);

        this._$untilRevision = this._$untilImg.parent();
        this._$sinceRevision = this._$sinceImg.parent();
        this._$revisions = this._$untilRevision.add(this._$sinceRevision);

        this._$untilRevisionLabel = this._$untilRevision.find('h5');
        this._$sinceRevisionLabel = this._$sinceRevision.find('h5');
        this._setupDiffModes();

        this.setMode(ImageDifferModes.TWO_UP);

        let initialized = $.Deferred();

        let defaultModes = [ImageDifferModes.TWO_UP];
        // Extra modes is all available modes except two-up
        let extraModes = _.chain(ImageDifferModes).values().difference(defaultModes).value();

        $.when(
            calculateImageNaturalSize(this._$sinceImg),
            calculateImageNaturalSize(this._$untilImg)
        ).done((oldSize, newSize) => {
            let sameDimensions = (oldSize.width === newSize.width) && (oldSize.height === newSize.height);
            let enableExtraModes = sameDimensions && oldSize.width > 0;
            this.enabledModes = enableExtraModes ? defaultModes.concat(extraModes) : defaultModes;
            initialized.resolve(this.enabledModes);
        }).fail(function() {
            initialized.reject();
        });


        return initialized;
    }

    /**
     * destroy this instance and reclaim memory. It cannot be used after this.
     */
    destroy () {
        if (this.modes && this._mode) {
            this.modes[this._mode].destroy();
        }
        this._mode = null;
    }

    /**
     * Set the mode to be used to diff these images.
     *
     * @param {string} mode - which diffing {@link ImageDifferModes mode} to use
     */
    setMode (mode) {
        if (this._mode !== mode) {
            this._onDiffModeChanged(mode, this._mode);
            this._mode = mode;
        }
    }

    /**
     * When the diff mode changes trigger a mode change event and update the container class
     *
     * @param {string} newMode - new {@link ImageDifferModes mode}
     * @param {string} oldMode - old {@link ImageDifferModes mode}
     * @private
     */
    _onDiffModeChanged (newMode, oldMode) {

        this._$container.removeClass(_.values(ImageDifferModes).join(' ')).addClass(newMode);

        if (oldMode) {
            this.modes[oldMode].destroy();
        }
        if (newMode) {
            this.modes[newMode].setup();
        }

        this.trigger('modeChanged', {
            newMode,
            oldMode
        });
    }

    /**
     * Sets up the diff modes. For each diff mode a DiffMode is created that has a setup and destroy method
     * that can be used to perform the setup/destroy when switching between modes.
     *
     * @private
     */
    _setupDiffModes () {

        this.modes = {};


        let _setSplitDiffElementProperties = ($untilRevisionImageContainer, $splitContainer, naturalImageSize) => {

            // determine the chain of element widths that will allow us to fit our imgs within the content frame:
            // max width of .binary-container
            let maxBinaryContainerWidth = getMaxWidthToFit(this._$container, this._$container.parent().width());
            // max width of .split-container
            let maxSplitContainerWidth = getMaxWidthToFit($splitContainer, maxBinaryContainerWidth);
            // max width of each .binary
            let maxRevisionWidth = getMaxWidthToFit(this._$sinceRevision, maxSplitContainerWidth);
            // max width of each image
            let maxImgWidth = getMaxWidthToFit(this._$sinceImg, maxRevisionWidth);

            // set the imgs to their natural width explicitly, or else to the max width if they won't fit.
            let imageWidth = Math.min(naturalImageSize.width, maxImgWidth);
            this._$imgs.width(imageWidth);
            // set a proportional height
            this._$imgs.height(Math.floor((imageWidth / naturalImageSize.width) * naturalImageSize.height));

            // set the image container height to perfectly fit the images (they have a border, so we can't just use the same value).
            $untilRevisionImageContainer.height(this._$imgs.outerHeight(true));


            // now that we have the width of the images, work back up so we can set an explicit width on .binary
            let revisionWidth = imageWidth + (maxRevisionWidth - maxImgWidth);
            this._$revisions.width(revisionWidth);
            // shift the entire .until-revision container to the left by the same distance as the width of the image, so that the two .binary containers overlap
            this._$untilRevision.css('margin-left', -revisionWidth);
        };

        /**
         * Setup and Destroy for TWO_UP are noops
         */
        this.modes[ImageDifferModes.TWO_UP] = new DifferMode();

        /**
         * Setup and Destroy methods for BLEND mode
         */
        this.modes[ImageDifferModes.BLEND] = new DifferMode(
            /**
             * Setup for BLEND mode
             */
            () => {
                // add in the slider
                let $opacitySliderContainer = $(bitbucket.component.imageDiffer.opacitySlider());
                this._$container.children('.since-revision').before($opacitySliderContainer);

                $opacitySliderContainer.on('input change', 'input[type="range"]', (e) => {
                    this._$untilImg.css('opacity', parseFloat($(e.target).val()));
                });
            },
            /**
             * Destroy for BLEND mode
             */
            () => {
                let $opacitySliderContainer = this._$container.children('.opacity-slider-container');

                $opacitySliderContainer.off('input change');
                $opacitySliderContainer.remove();
                this._$untilImg.css('opacity', '');
            }
        );

        /**
         * Setup and Destroy methods for SPLIT mode
         */
        this.modes[ImageDifferModes.SPLIT] = new DifferMode(
            /**
             * Setup for SPLIT mode
             */
            () => {
                calculateImageNaturalSize(this._$imgs).done((naturalImageSize) => {

                    this._$untilImg.wrap(bitbucket.component.imageDiffer.imageContainer());
                    this._$revisions.wrapAll(bitbucket.component.imageDiffer.splitContainer());

                    this._$untilRevisionImageContainer = this._$untilImg.parent();
                    this._$splitContainer = this._$container.find('.split-container');


                    let maxImageContainerWidth;
                    let setMaxImageContainerWidth = () => {
                        _setSplitDiffElementProperties(this._$untilRevisionImageContainer, this._$splitContainer, naturalImageSize);
                        maxImageContainerWidth = this._$sinceImg.outerWidth(true);
                    };

                    this._onResize = _.debounce(setMaxImageContainerWidth, 200);

                    $(window).on('resize', this._onResize);
                    setMaxImageContainerWidth();

                    if (naturalImageSize.width < 50) {
                        // If the image width is < 50px, that offset based on image width is not going to be sufficient to prevent overlap, so fix it at -50px
                        this._$untilRevisionLabel.css('margin-left', '-50px');
                        this._$sinceRevisionLabel.css('margin-right', '-50px');
                    } else if (naturalImageSize.width < 100) {
                        // If the image width is < 100px, offset the since and until (old/new) labels by the same px distance using negative margins so they sit outside of the .binary container
                        this._$untilRevisionLabel.css('margin-left', -naturalImageSize.width);
                        this._$sinceRevisionLabel.css('margin-right', -naturalImageSize.width);
                    }

                    let onMove = (e) => {
                        this._$untilRevisionImageContainer.css('width', Math.min(e.pageX - e.data.offset.left, maxImageContainerWidth));
                    };

                    this._$splitContainer.hover(() => {
                        this._$revisions.on('mousemove', { offset: this._$untilRevision.offset() }, onMove);
                    }, () => {
                        this._$revisions.off('mousemove', onMove);
                    });

                });
            },
            /**
             * Destroy for SPLIT mode
             */
            () => {
                this._$imgs.css({
                    width: '',
                    height: ''
                });
                this._$revisions.css('width', '');
                this._$untilRevision.css('margin-left', '');
                this._$untilRevisionLabel.add(this._$sinceRevisionLabel).css({
                    marginLeft: '',
                    marginRight: ''
                });

                this._$untilImg.unwrap();
                this._$untilRevisionImageContainer.remove(); // cleanup events
                delete this._$untilRevisionImageContainer;

                this._$revisions.unwrap();
                this._$splitContainer.remove(); // cleanup events
                delete this._$splitContainer;

                if (this._onResize) {
                    $(window).off('resize', this._onResize);
                    delete this._onResize;
                }
            }
        );

        /**
         * Setup and Destroy for PIXEL_DIFF mode
         */
        this.modes[ImageDifferModes.PIXEL_DIFF] = new DifferMode(
            /**
             * Setup for PIXEL_DIFF mode
             */
            () => {
                this._$revisions.wrapAll(bitbucket.component.imageDiffer.pixelDiffContainer());
                this._$pixelDiffContainer = this._$container.find('.pixeldiff-container');

                if (this._$pixelDiffImg) {
                    this._$pixelDiffContainer.append(this._$pixelDiffImg);
                    return;
                }

                let $spinner = $(bitbucket.component.imageDiffer.spinner());
                this._$pixelDiffContainer.append($spinner);
                $spinner.spin('large');

                _.defer(() => {
                    let sincePromise = getImageData(this._$sinceImg);
                    let untilPromise = getImageData(this._$untilImg);

                    $.when(sincePromise, untilPromise).then((sinceImgData, untilImgData) => {
                        resemble.outputSettings({
                            errorColor: {
                                red: 208,
                                green: 68,
                                blue: 55
                            },
                            errorType: 'flat',
                            transparency: 0.1     // setting to 0 is broken: https://github.com/Huddle/Resemble.js/issues/26
                        });

                        let comparePromise = $.Deferred();
                        resemble(sinceImgData).compareTo(untilImgData).onComplete((data) => comparePromise.resolve(data));

                        return comparePromise;
                    }).done((data) => {
                        this._$pixelDiffImg = $(bitbucket.component.imageDiffer.pixelDiffImage({ imageSrc: data.getImageDataUrl() }));
                        this._$pixelDiffContainer.append(this._$pixelDiffImg);
                    }).always(() => {
                        $spinner.remove();
                    });
                });
            },
            /**
             * Destroy for PIXEL_DIFF mode
             */
            () => {
                if (this._$pixelDiffImg) {
                    this._$pixelDiffImg.remove();  // Removing from DOM but keeping generated image for perf reasons
                }

                this._$revisions.unwrap();
                this._$pixelDiffContainer.remove();
                delete this._$pixelDiffContainer;
            }
        );
    }

}

/**
 * Calculate the natural size of an image.
 *
 * @param {jQuery|HtmlElement} image
 * @returns {Promise.<{width:number, height:number}>}
 */
function calculateImageNaturalSize (image) {
    let $image = $(image);
    if ($image.data('natural-size')) {
        return $.Deferred().resolve($image.data('natural-size'));
    }

    // user the naturalWidth and naturalHeight properties if it's available
    if (image.naturalWidth) {
        let size = { width: image.naturalWidth, height: image.naturalHeight };
        $image.data('natural-size', size);
        return $.Deferred().resolve(size);
    }

    // create an image object in memory, wait till it's loaded and get its dimensions
    let newImg = new Image();
    let promise = $.Deferred();
    let onComplete = _.once(() => {
        let size = { width: newImg.width, height: newImg.height };
        $image.data('natural-size', size);
        promise.resolve(size);
    });

    newImg.onload = onComplete;
    newImg.src = $image.attr('src');
    if (newImg.complete) {
        onComplete();
    }
    return promise;
}

/**
 * Get the maximum width of a given element by subtracting the box model things from it
 *
 * @param {jQuery} $el
 * @param {number} parentWidth
 * @returns {number}
 */
function getMaxWidthToFit ($el, parentWidth) {

    let marginBorderPadding = $el.data('margin_border_padding');
    if (marginBorderPadding == null) {
        marginBorderPadding = $el.outerWidth(true) - $el.width();
        $el.data('margin_border_padding', marginBorderPadding);
    }

    return parentWidth - marginBorderPadding;
}

/**
 * Get the image data for a given image tag
 *
 * @param {jQuery} $image
 * @returns {*|Promise.<{width: number, height: number}>|Promise|!Promise.<RESULT>}
 */
function getImageData ($image) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    return calculateImageNaturalSize($image).then(function (size) {
        canvas.height = size.height;
        canvas.width = size.width;
        ctx.drawImage($image[0], 0, 0);
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
}

export default ImageDiffer;

