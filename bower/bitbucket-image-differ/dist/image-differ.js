// This file was automatically generated from image-differ-toolbar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace bitbucket.component.imageDiffer.toolbar.
 */

if (typeof bitbucket == 'undefined') { var bitbucket = {}; }
if (typeof bitbucket.component == 'undefined') { bitbucket.component = {}; }
if (typeof bitbucket.component.imageDiffer == 'undefined') { bitbucket.component.imageDiffer = {}; }
if (typeof bitbucket.component.imageDiffer.toolbar == 'undefined') { bitbucket.component.imageDiffer.toolbar = {}; }


bitbucket.component.imageDiffer.toolbar.main = function(opt_data, opt_ignored) {
  return '' + aui.toolbar2.toolbar2({content: '' + aui.toolbar2.item({item: 'primary', extraClasses: 'image-differ-toggle', content: '' + bitbucket.component.imageDiffer.toolbar.toggleButtons(null)}), extraClasses: 'image-differ-toolbar'});
};
if (goog.DEBUG) {
  bitbucket.component.imageDiffer.toolbar.main.soyTemplateName = 'bitbucket.component.imageDiffer.toolbar.main';
}


bitbucket.component.imageDiffer.toolbar.toggleButtons = function(opt_data, opt_ignored) {
  return '' + aui.buttons.buttons({content: '' + aui.buttons.button({extraClasses: 'image-differ-two-up', isPressed: true, text: AJS.I18n.getText('imageDiffer.toolbar.button.two-up'), extraAttributes: {title: AJS.I18n.getText('imageDiffer.toolbar.button.two-up.tooltip')}}) + aui.buttons.button({extraClasses: 'image-differ-blend', isDisabled: true, text: AJS.I18n.getText('imageDiffer.toolbar.button.blend'), extraAttributes: {title: AJS.I18n.getText('imageDiffer.toolbar.button.blend.disabled.tooltip'), 'data-enabled-title': AJS.I18n.getText('imageDiffer.toolbar.button.blend.tooltip')}}) + aui.buttons.button({extraClasses: 'image-differ-split', isDisabled: true, text: AJS.I18n.getText('imageDiffer.toolbar.button.split'), extraAttributes: {title: AJS.I18n.getText('imageDiffer.toolbar.button.split.disabled.tooltip'), 'data-enabled-title': AJS.I18n.getText('imageDiffer.toolbar.button.split.tooltip')}}) + aui.buttons.button({extraClasses: 'image-differ-pixeldiff', isDisabled: true, text: AJS.I18n.getText('imageDiffer.toolbar.button.pixeldiff'), extraAttributes: {title: AJS.I18n.getText('imageDiffer.toolbar.button.pixeldiff.disabled.tooltip'), 'data-enabled-title': AJS.I18n.getText('imageDiffer.toolbar.button.pixeldiff.tooltip')}})});
};
if (goog.DEBUG) {
  bitbucket.component.imageDiffer.toolbar.toggleButtons.soyTemplateName = 'bitbucket.component.imageDiffer.toolbar.toggleButtons';
}

// This file was automatically generated from image-differ.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace bitbucket.component.imageDiffer.
 */

if (typeof bitbucket == 'undefined') { var bitbucket = {}; }
if (typeof bitbucket.component == 'undefined') { bitbucket.component = {}; }
if (typeof bitbucket.component.imageDiffer == 'undefined') { bitbucket.component.imageDiffer = {}; }


bitbucket.component.imageDiffer.imageContainer = function(opt_data, opt_ignored) {
  return '<div class="image-container" />';
};
if (goog.DEBUG) {
  bitbucket.component.imageDiffer.imageContainer.soyTemplateName = 'bitbucket.component.imageDiffer.imageContainer';
}


bitbucket.component.imageDiffer.splitContainer = function(opt_data, opt_ignored) {
  return '<div class="split-container" />';
};
if (goog.DEBUG) {
  bitbucket.component.imageDiffer.splitContainer.soyTemplateName = 'bitbucket.component.imageDiffer.splitContainer';
}


bitbucket.component.imageDiffer.pixelDiffContainer = function(opt_data, opt_ignored) {
  return '<div class="pixeldiff-container" />';
};
if (goog.DEBUG) {
  bitbucket.component.imageDiffer.pixelDiffContainer.soyTemplateName = 'bitbucket.component.imageDiffer.pixelDiffContainer';
}


bitbucket.component.imageDiffer.pixelDiffImage = function(opt_data, opt_ignored) {
  return '<div class="pixeldiff binary"><img src="' + soy.$$escapeHtml(opt_data.imageSrc) + '" /></div>';
};
if (goog.DEBUG) {
  bitbucket.component.imageDiffer.pixelDiffImage.soyTemplateName = 'bitbucket.component.imageDiffer.pixelDiffImage';
}


bitbucket.component.imageDiffer.opacitySlider = function(opt_data, opt_ignored) {
  return '<div class="opacity-slider-container"><input type="range" min="0" max="1" step="0.01" value="1" /></div>';
};
if (goog.DEBUG) {
  bitbucket.component.imageDiffer.opacitySlider.soyTemplateName = 'bitbucket.component.imageDiffer.opacitySlider';
}


bitbucket.component.imageDiffer.spinner = function(opt_data, opt_ignored) {
  return '<div class="spinner" />';
};
if (goog.DEBUG) {
  bitbucket.component.imageDiffer.spinner.soyTemplateName = 'bitbucket.component.imageDiffer.spinner';
}

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', 'jquery', 'bitbucket/internal/widget', 'lodash', 'resemble'], factory);
    } else if (typeof define === 'function' && !define.amd) {
        define('bitbucket/internal/image-differ', ['exports', 'module', 'jquery', 'bitbucket/internal/widget', 'lodash', 'resemble'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, module);
    }
})(function (exports, module) {

"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var $ = require("jquery");
var Widget = require("bitbucket/internal/widget");
var _ = require("lodash");
var resemble = require("resemble");

/**
 * An enum of diffing modes - different ways to diff an image
 * @readonly
 * @enum {string}
 */
var ImageDifferModes = {
    /**
     * Display the images side by side for visual comparison
     */
    TWO_UP: "two-up",
    /**
     * Blend the images together, using a slider to change the relative opacity of each image.
     */
    BLEND: "blend",
    /**
     * Split the images vertically showing the old image on one side and the new image on the other.
     * Mouse position determines where the vertical split occurs.
     */
    SPLIT: "split",
    /**
     * Combines the two images to calculate which pixels have changed between versions.
     * Shows changed pixels.
     */
    PIXEL_DIFF: "pixeldiff"
};

/**
 * Image Differ Mode.
 * Use this class to create an Image Differ Mode instance with a
 * setup and destroy method. Used for switching between modes.
 */

var ImageDifferMode = (function () {

    /**
     * @param {Function} [setup]
     * @param {Function} [destroy]
     */

    function ImageDifferMode(setup, destroy) {
        _classCallCheck(this, ImageDifferMode);

        if (setup) {
            this.setup = setup;
        }
        if (destroy) {
            this.destroy = destroy;
        }
    }

    _createClass(ImageDifferMode, {
        setup: {

            /**
             * A setup method for the mode
             */

            value: function setup() {}
        },
        destroy: {

            /**
             * A destroy method for the mode where it cleans up after itself
             */

            value: function destroy() {}
        }
    });

    return ImageDifferMode;
})();

var DifferMode = ImageDifferMode;

var ImageDiffer = (function (_Widget) {

    /**
     * @param {jQuery|HtmlElement} container
     */

    function ImageDiffer(container) {
        _classCallCheck(this, ImageDiffer);

        _get(Object.getPrototypeOf(ImageDiffer.prototype), "constructor", this).call(this);
        this._$container = $(container);
    }

    _inherits(ImageDiffer, _Widget);

    _createClass(ImageDiffer, {
        init: {

            /**
             * Initialize the instance. This expects two images to be found in the $container and assumes the first
             * is the "old" revision and the second is the "new" revision. This function will retrieve information about the
             * images like width and height.
             *
             * @returns {Promise} promise that is resolved when the ImageDiffer is fully initialized.
             */

            value: function init() {
                var _this = this;

                var $imgs = this._$imgs = this._$container.find("img");

                this._$sinceImg = $imgs.eq(0);
                this._$untilImg = $imgs.eq(1);

                this._$untilRevision = this._$untilImg.parent();
                this._$sinceRevision = this._$sinceImg.parent();
                this._$revisions = this._$untilRevision.add(this._$sinceRevision);

                this._$untilRevisionLabel = this._$untilRevision.find("h5");
                this._$sinceRevisionLabel = this._$sinceRevision.find("h5");
                this._setupDiffModes();

                this.setMode(ImageDifferModes.TWO_UP);

                var initialized = $.Deferred();

                var defaultModes = [ImageDifferModes.TWO_UP];
                // Extra modes is all available modes except two-up
                var extraModes = _.chain(ImageDifferModes).values().difference(defaultModes).value();

                $.when(calculateImageNaturalSize(this._$sinceImg), calculateImageNaturalSize(this._$untilImg)).done(function (oldSize, newSize) {
                    var sameDimensions = oldSize.width === newSize.width && oldSize.height === newSize.height;
                    var enableExtraModes = sameDimensions && oldSize.width > 0;
                    _this.enabledModes = enableExtraModes ? defaultModes.concat(extraModes) : defaultModes;
                    initialized.resolve(_this.enabledModes);
                }).fail(function () {
                    initialized.reject();
                });

                return initialized;
            }
        },
        destroy: {

            /**
             * destroy this instance and reclaim memory. It cannot be used after this.
             */

            value: function destroy() {
                if (this.modes && this._mode) {
                    this.modes[this._mode].destroy();
                }
                this._mode = null;
            }
        },
        setMode: {

            /**
             * Set the mode to be used to diff these images.
             *
             * @param {string} mode - which diffing {@link ImageDifferModes mode} to use
             */

            value: function setMode(mode) {
                if (this._mode !== mode) {
                    this._onDiffModeChanged(mode, this._mode);
                    this._mode = mode;
                }
            }
        },
        _onDiffModeChanged: {

            /**
             * When the diff mode changes trigger a mode change event and update the container class
             *
             * @param {string} newMode - new {@link ImageDifferModes mode}
             * @param {string} oldMode - old {@link ImageDifferModes mode}
             * @private
             */

            value: function _onDiffModeChanged(newMode, oldMode) {

                this._$container.removeClass(_.values(ImageDifferModes).join(" ")).addClass(newMode);

                if (oldMode) {
                    this.modes[oldMode].destroy();
                }
                if (newMode) {
                    this.modes[newMode].setup();
                }

                this.trigger("modeChanged", {
                    newMode: newMode,
                    oldMode: oldMode
                });
            }
        },
        _setupDiffModes: {

            /**
             * Sets up the diff modes. For each diff mode a DiffMode is created that has a setup and destroy method
             * that can be used to perform the setup/destroy when switching between modes.
             *
             * @private
             */

            value: function _setupDiffModes() {
                var _this = this;

                this.modes = {};

                var _setSplitDiffElementProperties = function ($untilRevisionImageContainer, $splitContainer, naturalImageSize) {

                    // determine the chain of element widths that will allow us to fit our imgs within the content frame:
                    // max width of .binary-container
                    var maxBinaryContainerWidth = getMaxWidthToFit(_this._$container, _this._$container.parent().width());
                    // max width of .split-container
                    var maxSplitContainerWidth = getMaxWidthToFit($splitContainer, maxBinaryContainerWidth);
                    // max width of each .binary
                    var maxRevisionWidth = getMaxWidthToFit(_this._$sinceRevision, maxSplitContainerWidth);
                    // max width of each image
                    var maxImgWidth = getMaxWidthToFit(_this._$sinceImg, maxRevisionWidth);

                    // set the imgs to their natural width explicitly, or else to the max width if they won't fit.
                    var imageWidth = Math.min(naturalImageSize.width, maxImgWidth);
                    _this._$imgs.width(imageWidth);
                    // set a proportional height
                    _this._$imgs.height(Math.floor(imageWidth / naturalImageSize.width * naturalImageSize.height));

                    // set the image container height to perfectly fit the images (they have a border, so we can't just use the same value).
                    $untilRevisionImageContainer.height(_this._$imgs.outerHeight(true));

                    // now that we have the width of the images, work back up so we can set an explicit width on .binary
                    var revisionWidth = imageWidth + (maxRevisionWidth - maxImgWidth);
                    _this._$revisions.width(revisionWidth);
                    // shift the entire .until-revision container to the left by the same distance as the width of the image, so that the two .binary containers overlap
                    _this._$untilRevision.css("margin-left", -revisionWidth);
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
                function () {
                    // add in the slider
                    var $opacitySliderContainer = $(bitbucket.component.imageDiffer.opacitySlider());
                    _this._$container.children(".since-revision").before($opacitySliderContainer);

                    $opacitySliderContainer.on("input change", "input[type=\"range\"]", function (e) {
                        _this._$untilImg.css("opacity", parseFloat($(e.target).val()));
                    });
                },
                /**
                 * Destroy for BLEND mode
                 */
                function () {
                    var $opacitySliderContainer = _this._$container.children(".opacity-slider-container");

                    $opacitySliderContainer.off("input change");
                    $opacitySliderContainer.remove();
                    _this._$untilImg.css("opacity", "");
                });

                /**
                 * Setup and Destroy methods for SPLIT mode
                 */
                this.modes[ImageDifferModes.SPLIT] = new DifferMode(
                /**
                 * Setup for SPLIT mode
                 */
                function () {
                    calculateImageNaturalSize(_this._$imgs).done(function (naturalImageSize) {

                        _this._$untilImg.wrap(bitbucket.component.imageDiffer.imageContainer());
                        _this._$revisions.wrapAll(bitbucket.component.imageDiffer.splitContainer());

                        _this._$untilRevisionImageContainer = _this._$untilImg.parent();
                        _this._$splitContainer = _this._$container.find(".split-container");

                        var maxImageContainerWidth = undefined;
                        var setMaxImageContainerWidth = function () {
                            _setSplitDiffElementProperties(_this._$untilRevisionImageContainer, _this._$splitContainer, naturalImageSize);
                            maxImageContainerWidth = _this._$sinceImg.outerWidth(true);
                        };

                        _this._onResize = _.debounce(setMaxImageContainerWidth, 200);

                        $(window).on("resize", _this._onResize);
                        setMaxImageContainerWidth();

                        if (naturalImageSize.width < 50) {
                            // If the image width is < 50px, that offset based on image width is not going to be sufficient to prevent overlap, so fix it at -50px
                            _this._$untilRevisionLabel.css("margin-left", "-50px");
                            _this._$sinceRevisionLabel.css("margin-right", "-50px");
                        } else if (naturalImageSize.width < 100) {
                            // If the image width is < 100px, offset the since and until (old/new) labels by the same px distance using negative margins so they sit outside of the .binary container
                            _this._$untilRevisionLabel.css("margin-left", -naturalImageSize.width);
                            _this._$sinceRevisionLabel.css("margin-right", -naturalImageSize.width);
                        }

                        var onMove = function (e) {
                            _this._$untilRevisionImageContainer.css("width", Math.min(e.pageX - e.data.offset.left, maxImageContainerWidth));
                        };

                        _this._$splitContainer.hover(function () {
                            _this._$revisions.on("mousemove", { offset: _this._$untilRevision.offset() }, onMove);
                        }, function () {
                            _this._$revisions.off("mousemove", onMove);
                        });
                    });
                },
                /**
                 * Destroy for SPLIT mode
                 */
                function () {
                    _this._$imgs.css({
                        width: "",
                        height: ""
                    });
                    _this._$revisions.css("width", "");
                    _this._$untilRevision.css("margin-left", "");
                    _this._$untilRevisionLabel.add(_this._$sinceRevisionLabel).css({
                        marginLeft: "",
                        marginRight: ""
                    });

                    _this._$untilImg.unwrap();
                    _this._$untilRevisionImageContainer.remove(); // cleanup events
                    delete _this._$untilRevisionImageContainer;

                    _this._$revisions.unwrap();
                    _this._$splitContainer.remove(); // cleanup events
                    delete _this._$splitContainer;

                    if (_this._onResize) {
                        $(window).off("resize", _this._onResize);
                        delete _this._onResize;
                    }
                });

                /**
                 * Setup and Destroy for PIXEL_DIFF mode
                 */
                this.modes[ImageDifferModes.PIXEL_DIFF] = new DifferMode(
                /**
                 * Setup for PIXEL_DIFF mode
                 */
                function () {
                    _this._$revisions.wrapAll(bitbucket.component.imageDiffer.pixelDiffContainer());
                    _this._$pixelDiffContainer = _this._$container.find(".pixeldiff-container");

                    if (_this._$pixelDiffImg) {
                        _this._$pixelDiffContainer.append(_this._$pixelDiffImg);
                        return;
                    }

                    var $spinner = $(bitbucket.component.imageDiffer.spinner());
                    _this._$pixelDiffContainer.append($spinner);
                    $spinner.spin("large");

                    _.defer(function () {
                        var sincePromise = getImageData(_this._$sinceImg);
                        var untilPromise = getImageData(_this._$untilImg);

                        $.when(sincePromise, untilPromise).then(function (sinceImgData, untilImgData) {
                            resemble.outputSettings({
                                errorColor: {
                                    red: 208,
                                    green: 68,
                                    blue: 55
                                },
                                errorType: "flat",
                                transparency: 0.1 // setting to 0 is broken: https://github.com/Huddle/Resemble.js/issues/26
                            });

                            var comparePromise = $.Deferred();
                            resemble(sinceImgData).compareTo(untilImgData).onComplete(function (data) {
                                return comparePromise.resolve(data);
                            });

                            return comparePromise;
                        }).done(function (data) {
                            _this._$pixelDiffImg = $(bitbucket.component.imageDiffer.pixelDiffImage({ imageSrc: data.getImageDataUrl() }));
                            _this._$pixelDiffContainer.append(_this._$pixelDiffImg);
                        }).always(function () {
                            $spinner.remove();
                        });
                    });
                },
                /**
                 * Destroy for PIXEL_DIFF mode
                 */
                function () {
                    if (_this._$pixelDiffImg) {
                        _this._$pixelDiffImg.remove(); // Removing from DOM but keeping generated image for perf reasons
                    }

                    _this._$revisions.unwrap();
                    _this._$pixelDiffContainer.remove();
                    delete _this._$pixelDiffContainer;
                });
            }
        }
    });

    return ImageDiffer;
})(Widget);

/**
 * Calculate the natural size of an image.
 *
 * @param {jQuery|HtmlElement} image
 * @returns {Promise.<{width:number, height:number}>}
 */
function calculateImageNaturalSize(image) {
    var $image = $(image);
    if ($image.data("natural-size")) {
        return $.Deferred().resolve($image.data("natural-size"));
    }

    // user the naturalWidth and naturalHeight properties if it's available
    if (image.naturalWidth) {
        var size = { width: image.naturalWidth, height: image.naturalHeight };
        $image.data("natural-size", size);
        return $.Deferred().resolve(size);
    }

    // create an image object in memory, wait till it's loaded and get its dimensions
    var newImg = new Image();
    var promise = $.Deferred();
    var onComplete = _.once(function () {
        var size = { width: newImg.width, height: newImg.height };
        $image.data("natural-size", size);
        promise.resolve(size);
    });

    newImg.onload = onComplete;
    newImg.src = $image.attr("src");
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
function getMaxWidthToFit($el, parentWidth) {

    var marginBorderPadding = $el.data("margin_border_padding");
    if (marginBorderPadding == null) {
        marginBorderPadding = $el.outerWidth(true) - $el.width();
        $el.data("margin_border_padding", marginBorderPadding);
    }

    return parentWidth - marginBorderPadding;
}

/**
 * Get the image data for a given image tag
 *
 * @param {jQuery} $image
 * @returns {*|Promise.<{width: number, height: number}>|Promise|!Promise.<RESULT>}
 */
function getImageData($image) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    return calculateImageNaturalSize($image).then(function (size) {
        canvas.height = size.height;
        canvas.width = size.width;
        ctx.drawImage($image[0], 0, 0);
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
}

var Differ = ImageDiffer;

var ImageDiffToolbar = (function (_Widget2) {
    function ImageDiffToolbar(toolbarEl) {
        _classCallCheck(this, ImageDiffToolbar);

        _get(Object.getPrototypeOf(ImageDiffToolbar.prototype), "constructor", this).call(this);
        this._$toolbar = $(toolbarEl);
        this._$toggle = this._$toolbar.find(".image-differ-toggle");
    }

    _inherits(ImageDiffToolbar, _Widget2);

    _createClass(ImageDiffToolbar, {
        init: {

            /**
             * Initialize the toolbar and enable all diffing modes, if appropriate.
             *
             * @param {Array.<string>} enabledModes - an array of enabled {@link ImageDifferModes}
             */

            value: function init(enabledModes) {
                var _this = this;

                var buttons = {};
                _.values(ImageDifferModes).forEach(function (mode) {
                    // Check all available modes against the enabled modes and
                    // set the button state for it accordingly.
                    var isModeEnabled = enabledModes.indexOf(mode) !== -1;
                    var $button = _this._$toggle.find(".image-differ-" + mode);
                    $button.attr("aria-disabled", !isModeEnabled).prop("disabled", !isModeEnabled);

                    if (!isModeEnabled) {
                        return;
                    }
                    if ($button.attr("data-enabled-title")) {
                        $button.attr("data-disabled-title", $button.attr("title"));
                    }

                    $button.attr("data-mode", mode);
                    $button.attr("title", $button.attr("data-enabled-title"));
                    buttons[mode] = $button;
                });

                /* TODO: Remove when dropping IE9 Support in Stash */
                if (enabledModes.indexOf(ImageDifferModes.BLEND) !== -1) {
                    // don't show blend mode for old browsers (<= IE9)
                    var supportsRangeInput = (function () {
                        var el = document.createElement("input");el.setAttribute("type", "range");return el.type === "range";
                    })();
                    var $button = buttons[ImageDifferModes.BLEND];
                    $button.attr("aria-disabled", !supportsRangeInput).prop("disabled", !supportsRangeInput);
                    if (!supportsRangeInput) {
                        $button.attr("title", $button.attr("data-disabled-title"));
                    }
                }

                /**
                 * Trigger a local modeChanged event and set the mode
                 * @param {string} newMode
                 */
                var changeMode = function (newMode) {
                    var oldMode = _this._mode;
                    _this._mode = newMode;
                    _this.trigger("modeChanged", {
                        newMode: newMode,
                        oldMode: oldMode
                    });
                };

                var $modeListButtons = this._$toggle.find(".aui-button");

                $modeListButtons.on("click", function (e) {
                    e.preventDefault();
                    var $el = $(e.target);
                    if ($el.attr("aria-disabled") !== "true" && $el.attr("aria-pressed") !== "true") {
                        var newMode = $el.attr("data-mode");
                        $modeListButtons.attr("aria-pressed", "false");
                        $el.attr("aria-pressed", "true");
                        changeMode(newMode);
                    }
                }).tooltip({ gravity: "s" });

                changeMode(ImageDifferModes.TWO_UP);
            }
        },
        getMode: {

            /**
             * Can be called to retrieve the currently selected diffing mode represented by the toolbar at any time.
             *
             * @returns {string} the currently selected {@link ImageDifferModes mode}
             */

            value: function getMode() {
                return this._mode;
            }
        },
        destroy: {

            /**
             * destroy this toolbar instance and remove it from the DOM. Once destroyed, it cannot be reused.
             */

            value: function destroy() {
                if (this._$toolbar) {
                    this._$toolbar.remove();
                    this._$toolbar = null;
                }
                this._$toggle = null;
            }
        }
    });

    return ImageDiffToolbar;
})(Widget);

var Toolbar = ImageDiffToolbar;

function index__init(container) {
    var $container = $(container);
    var toolbar = new Toolbar($(bitbucket.component.imageDiffer.toolbar.main()).prependTo($container));
    var differ = new Differ($container);

    toolbar.on("modeChanged", function (mode) {
        differ.setMode(mode.newMode);
    });

    var readyPromise = new $.Deferred();
    differ.init().done(function (enabledModes) {
        if (toolbar) {
            toolbar.init(enabledModes);
        }
        readyPromise.resolve({
            /**
             * Stop exposing this method when Stash no longer needs to retrigger Image Differ events
             * @deprecated
             */
            on: differ.on.bind(differ),
            enabledModes: enabledModes,
            _differ: differ,
            _toolbar: toolbar,
            destroy: function () {
                differ.destroy();
                differ = null;
                toolbar.destroy();
                toolbar = null;
            }
        });
    });
    return readyPromise;
}

var index = {
    init: index__init,
    Differ: Differ,
    Toolbar: Toolbar
};

module.exports = index;

});
