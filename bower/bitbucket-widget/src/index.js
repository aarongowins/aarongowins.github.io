import _ from 'lodash';

/**
 * Base Widget class for components that require events and lifecycle handling.
 * If your class requires a set of default options implement it with
 * a (read-only) "defaults" property.
 * @example
 * class MyWidget extends BitbucketWidget { }
 * MyWidget.defaults = {
 *     "things": "stuff",
 *     "foo": "bar"
 * }
 * let widget = new MyWidget({ "foo": "hello world" });
 * widget.options.foo === "hello world"
 * widget.options.things === "stuff"
 *
 * @example
 * // If you require additional arguments, you'll need to
 * // pass the options along to the super constructor.
 * class MyUIWidget extends BitbucketWidget {
 *     constructor (el, options) {
 *         super(options);
 *         this.$el = $(el);
 *     }
 * }
 */
class BitbucketWidget {

    /**
     *
     * @param {Object} [options]
     */
    constructor(options) {

        _.bindAll(this, getProtoChainMethods(this, BitbucketWidget));

        if (options) {
            // When the widget is initialised and there are defaults, extend options over the defaults
            // to set the options for this instance.
            this.options = _.extend({}, this.constructor.defaults, options);
        }
    }

    /**
     * @returns {Object}
     */
    get options () {
        return this._options;
    }

    /**
     * @param {Object} options
     */
    set options (options) {
        this._options = options;
    }

    /**
     *
     * @param {Object} obj - object with listeners
     * @param {string} eventName
     * @returns {Array<Function>}}
     * @private
     */
    _getListeners (eventName) {
        if (!this._listeners) {
            this._listeners = {};
        }
        if (!this._listeners[eventName]) {
            this._listeners[eventName] = [];
        }
        return this._listeners[eventName];
    }
    /**
     * listen to an event
     * @param {string} eventName
     * @param {Function} handler
     * @returns {BitbucketWidget}
     */
    on (eventName, handler) {
        let listeners = this._getListeners(eventName);
        if (!_.contains(listeners, handler)) {
            listeners.push(handler);
        }
        return this;
    }

    /**
     * Stop listening to an event
     * @param {string} eventName
     * @param {Function} handler
     * @returns {BitbucketWidget}
     */
    off (eventName, handler) {
        let listeners = this._getListeners(eventName);
        let i = listeners.length;
        while (i--) {
            // if it's the callback, or the boundOff for the callback
            if (listeners[i] === handler || listeners[i]._handler === handler) {
                listeners.splice(i, 1);
            }
        }
        return this;
    }

    /**
     * Listen to an event once, then unbind it from future occurrences of the event
     * @param {string} eventName
     * @param {Function} handler
     * @returns {BitbucketWidget}
     */
    once (eventName, handler) {
        let boundOff = this.off.bind(this, eventName, handler);
        boundOff._handler = handler;
        this.on(eventName, handler);
        this.on(eventName, boundOff);
        return this;
    }

    /**
     * Call all listeners for an event.
     * @param {string} eventName
     * @param {...*} [args] - optional set of arguments that will be passed to the event handler
     * @returns {BitbucketWidget}
     */
    trigger (eventName, ...args) {
        // We slice the listeners array and iterate over the copy because the list of listeners
        // may be updated while we're looping over it. i.e. when a 'once' is triggered.
        let listeners = this._getListeners(eventName).slice();
        listeners.forEach((fn) => {
            try {
                fn.apply(this, args);
            }
            catch (e) {
                _.defer(() => {
                    throw e;
                });
            }
        });
        return this;
    }

    /**
     * Add a thing to be destroyed when I am destroyed.
     * @param {{ destroy : Function } | Function} destroyable - thing to destroy with me
     * @private
     */
    _addDestroyable (destroyable) {
        if (!this._destroyables) {
            this._destroyables = [];
        }
        if (_.isFunction(destroyable)) {
            destroyable = {
                destroy: destroyable
            };
        }
        if (!_.isFunction(destroyable.destroy)) {
            throw new Error("Argument is not destroyable");
        }
        this._destroyables.push(destroyable);
        return this;
    }

    /**
     * When called, the widget is no longer usable. All nested destroyables will have destroy called on them.
     * After destruction, the destroy event is fired.
     */
    destroy () {
        if (this._destroyables) {
            _.invoke(this._destroyables, 'destroy');
            this._destroyables = null;
        }
        this.trigger('destroy');
        if (this._listeners) {
            this._listeners = null;
        }
    }

}
/**
 * Throw an error if the prototype of this object is enumerated over.
 * This prevents inheriting from it in the wrong way, for example using [lodash|jQuery].extend()
 */
Object.defineProperty(BitbucketWidget.prototype, '__nonEnumerable', {
    enumerable: true,
    get: function() {
        throw new Error("BitbucketWidget is not enumerable. Inherit using Object.create().");
    }
});

/**
 * Get the prototype chain methods for a given object and stop traversing when
 * a given 'until' object's prototype is reached.
 * We skip the constructor
 * @param {Object} obj - The object to start traversing at
 * @param {Object} until - The object's prototype to stop traversing at.
 * @returns {Array<string>}
 */
const forbiddenProps = ['constructor', '__nonEnumerable'];
function getProtoChainMethods (obj, until) {
    var keys = Object.getOwnPropertyNames(obj).filter(function(item) {
        var isForbiddenProp = forbiddenProps.indexOf(item) !== -1;
        // check for isForbiddenProp first because we don't want check if forbidden props are functions
        return !isForbiddenProp && _.isFunction(obj[item]);
    });
    var proto = Object.getPrototypeOf(obj);
    if (proto.isPrototypeOf(until)) {
        return keys;
    }
    return _.uniq(keys.concat(getProtoChainMethods(proto, until)));
}

export default BitbucketWidget;
