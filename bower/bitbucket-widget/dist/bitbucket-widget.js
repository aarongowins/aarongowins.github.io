(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', 'lodash'], factory);
    } else if (typeof define === 'function' && !define.amd) {
        define('bitbucket/internal/widget', ['exports', 'module', 'lodash'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, module);
    }
})(function (exports, module) {

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = require("lodash");

var BitbucketWidget = (function () {

    /**
     *
     * @param {Object} [options]
     */

    function BitbucketWidget(options) {
        _classCallCheck(this, BitbucketWidget);

        _.bindAll(this, getProtoChainMethods(this, BitbucketWidget));

        if (options) {
            // When the widget is initialised and there are defaults, extend options over the defaults
            // to set the options for this instance.
            this.options = _.extend({}, this.constructor.defaults, options);
        }
    }

    _createClass(BitbucketWidget, {
        options: {

            /**
             * @returns {Object}
             */

            get: function () {
                return this._options;
            },

            /**
             * @param {Object} options
             */
            set: function (options) {
                this._options = options;
            }
        },
        _getListeners: {

            /**
             *
             * @param {Object} obj - object with listeners
             * @param {string} eventName
             * @returns {Array<Function>}}
             * @private
             */

            value: function _getListeners(eventName) {
                if (!this._listeners) {
                    this._listeners = {};
                }
                if (!this._listeners[eventName]) {
                    this._listeners[eventName] = [];
                }
                return this._listeners[eventName];
            }
        },
        on: {
            /**
             * listen to an event
             * @param {string} eventName
             * @param {Function} handler
             * @returns {BitbucketWidget}
             */

            value: function on(eventName, handler) {
                var listeners = this._getListeners(eventName);
                if (!_.contains(listeners, handler)) {
                    listeners.push(handler);
                }
                return this;
            }
        },
        off: {

            /**
             * Stop listening to an event
             * @param {string} eventName
             * @param {Function} handler
             * @returns {BitbucketWidget}
             */

            value: function off(eventName, handler) {
                var listeners = this._getListeners(eventName);
                var i = listeners.length;
                while (i--) {
                    // if it's the callback, or the boundOff for the callback
                    if (listeners[i] === handler || listeners[i]._handler === handler) {
                        listeners.splice(i, 1);
                    }
                }
                return this;
            }
        },
        once: {

            /**
             * Listen to an event once, then unbind it from future occurrences of the event
             * @param {string} eventName
             * @param {Function} handler
             * @returns {BitbucketWidget}
             */

            value: function once(eventName, handler) {
                var boundOff = this.off.bind(this, eventName, handler);
                boundOff._handler = handler;
                this.on(eventName, handler);
                this.on(eventName, boundOff);
                return this;
            }
        },
        trigger: {

            /**
             * Call all listeners for an event.
             * @param {string} eventName
             * @param {...*} [args] - optional set of arguments that will be passed to the event handler
             * @returns {BitbucketWidget}
             */

            value: function trigger(eventName) {
                var _this = this;

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                // We slice the listeners array and iterate over the copy because the list of listeners
                // may be updated while we're looping over it. i.e. when a 'once' is triggered.
                var listeners = this._getListeners(eventName).slice();
                listeners.forEach(function (fn) {
                    try {
                        fn.apply(_this, args);
                    } catch (e) {
                        _.defer(function () {
                            throw e;
                        });
                    }
                });
                return this;
            }
        },
        _addDestroyable: {

            /**
             * Add a thing to be destroyed when I am destroyed.
             * @param {{ destroy : Function } | Function} destroyable - thing to destroy with me
             * @private
             */

            value: function _addDestroyable(destroyable) {
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
        },
        destroy: {

            /**
             * When called, the widget is no longer usable. All nested destroyables will have destroy called on them.
             * After destruction, the destroy event is fired.
             */

            value: function destroy() {
                if (this._destroyables) {
                    _.invoke(this._destroyables, "destroy");
                    this._destroyables = null;
                }
                this.trigger("destroy");
                if (this._listeners) {
                    this._listeners = null;
                }
            }
        }
    });

    return BitbucketWidget;
})();

/**
 * Throw an error if the prototype of this object is enumerated over.
 * This prevents inheriting from it in the wrong way, for example using [lodash|jQuery].extend()
 */
Object.defineProperty(BitbucketWidget.prototype, "__nonEnumerable", {
    enumerable: true,
    get: function get() {
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
var forbiddenProps = ["constructor", "__nonEnumerable"];
function getProtoChainMethods(obj, until) {
    var keys = Object.getOwnPropertyNames(obj).filter(function (item) {
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

var index = BitbucketWidget;

module.exports = index;

});
