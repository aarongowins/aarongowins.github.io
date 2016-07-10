import Widget from 'bitbucket/internal/widget';
import $ from 'jquery';
import _ from 'lodash';
import ImageDifferModes from './image-differ-modes';

/**
 * A toolbar containing controls for diffing two image files.
 *
 * When the constructor is called, the toolbar will be in an initial,
 * partially disabled state where only the two-up mode is available.
 * `.init()` must eventually also be called on the toolbar.
 *
 * @param {jQuery|HTMLElement} toolbarEl - the toolbar generated from calling
 *        Soy template bitbucket.component.imageDiffer.toolbar.main or HTML markup
 * @constructor ImageDiffToolbar
 */
class ImageDiffToolbar extends Widget {

    constructor (toolbarEl) {
        super();
        this._$toolbar = $(toolbarEl);
        this._$toggle = this._$toolbar.find('.image-differ-toggle');
    }

    /**
     * Initialize the toolbar and enable all diffing modes, if appropriate.
     *
     * @param {Array.<string>} enabledModes - an array of enabled {@link ImageDifferModes}
     */
    init (enabledModes) {
        let buttons = {};
        _.values(ImageDifferModes).forEach((mode) => {
            // Check all available modes against the enabled modes and
            // set the button state for it accordingly.
            let isModeEnabled = enabledModes.indexOf(mode) !== -1;
            let $button = this._$toggle.find(`.image-differ-${mode}`);
            $button.attr('aria-disabled', !isModeEnabled).prop('disabled', !isModeEnabled);

            if (!isModeEnabled) {
                return;
            }
            if ($button.attr('data-enabled-title')) {
                $button.attr('data-disabled-title', $button.attr('title'));
            }

            $button.attr('data-mode', mode);
            $button.attr('title', $button.attr('data-enabled-title'));
            buttons[mode] = $button;
        });

        /* TODO: Remove when dropping IE9 Support in Stash */
        if (enabledModes.indexOf(ImageDifferModes.BLEND) !== -1) {
            // don't show blend mode for old browsers (<= IE9)
            let supportsRangeInput = (function () { let el = document.createElement('input'); el.setAttribute('type', 'range'); return el.type === 'range'; }());
            let $button = buttons[ImageDifferModes.BLEND];
            $button.attr('aria-disabled', !supportsRangeInput).prop('disabled', !supportsRangeInput);
            if (!supportsRangeInput) {
                $button.attr('title', $button.attr('data-disabled-title'));
            }
        }

        /**
         * Trigger a local modeChanged event and set the mode
         * @param {string} newMode
         */
        let changeMode = (newMode) => {
            let oldMode = this._mode;
            this._mode = newMode;
            this.trigger('modeChanged', {
                newMode,
                oldMode
            });
        };

        let $modeListButtons = this._$toggle.find('.aui-button');

        $modeListButtons
            .on('click', (e) => {
                e.preventDefault();
                let $el = $(e.target);
                if ($el.attr('aria-disabled') !== 'true' && $el.attr('aria-pressed') !== 'true') {
                    let newMode = $el.attr('data-mode');
                    $modeListButtons.attr('aria-pressed', 'false');
                    $el.attr('aria-pressed', 'true');
                    changeMode(newMode);
                }

            })
            .tooltip({ gravity: 's' });

        changeMode(ImageDifferModes.TWO_UP);
    }

    /**
     * Can be called to retrieve the currently selected diffing mode represented by the toolbar at any time.
     *
     * @returns {string} the currently selected {@link ImageDifferModes mode}
     */
    getMode () {
        return this._mode;
    }

    /**
     * destroy this toolbar instance and remove it from the DOM. Once destroyed, it cannot be reused.
     */
    destroy () {
        if (this._$toolbar) {
            this._$toolbar.remove();
            this._$toolbar = null;
        }
        this._$toggle = null;
    }

}

export default ImageDiffToolbar;
