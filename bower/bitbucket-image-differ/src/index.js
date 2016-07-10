import Differ from './image-differ';
import Toolbar from './image-differ-toolbar';
import $ from 'jquery';

/**
 * @param {jQuery|HtmlElement} container
 * @returns {{on: Function, readyPromise: Promise}}
 */
function init(container) {
    let $container = $(container);
    let toolbar = new Toolbar($(bitbucket.component.imageDiffer.toolbar.main()).prependTo($container));
    let differ = new Differ($container);

    toolbar.on('modeChanged', (mode) => { differ.setMode(mode.newMode); });

    let readyPromise = new $.Deferred();
    differ.init().done((enabledModes) => {
        if (toolbar) {
            toolbar.init(enabledModes);
        }
        readyPromise.resolve({
            /**
             * Stop exposing this method when Stash no longer needs to retrigger Image Differ events
             * @deprecated
             */
            on: differ.on.bind(differ),
            enabledModes,
            _differ: differ,
            _toolbar: toolbar,
            destroy: () => {
                differ.destroy();
                differ = null;
                toolbar.destroy();
                toolbar = null;
            }
        });
    });
    return readyPromise;
}

export default {
    init: init,
    Differ,
    Toolbar
};
