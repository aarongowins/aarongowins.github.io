define('eevee', [
    'backbone',
    'eve',
    'underscore'
], function (
    Backbone,
    eve,
    _
) {

    'use strict';

    var eevee = {
        /**
         * Trigger a global event.
         *
         * @param {string} eventName - The name of the event to fire. This should be a '.'-delimited namespace.
         * @param {Object} context - The context to fire the event with. Handlers will be called with the context as `this`.
         * Any further params will be used as arguments to the handlers.
         */
        trigger : function(eventName, context/*, ...args*/) {
            return eve.apply(this, arguments);
        },
        /**
         * Call a function every time an event is fired.
         *
         * @param {string} eventName - The name of the event to handle. This should be a '.'-delimited namespace.
         *                           You can replace any component of the namespace with a '*' for wildcard matching.
         * @param {function} fn - The handler function to call when the event is fired.
         */
        on : function(eventName, fn) {
            return eve.on(eventName, fn);
        },
        /**
         * Stop calling a function when an event is fired. The function is assumed to have previously been passed to
         * `.on` or `.once`
         *
         * @param {string} eventName - The name of the event to stop handling. This should be a '.'-delimited namespace.
         *                           You can replace any component of the namespace with a '*' for wildcard matching.
         * @param {function} fn - The handler function to stop calling when the event is fired.
         */
        off : function(eventName, fn) {
            return eve.off(eventName, fn);
        },
        /**
         * Call a function the first time an event is fired.
         *
         * @param {string} eventName - The name of the event to handle once. This should be a '.'-delimited namespace.
         *                           You can replace any component of the namespace with a '*' for wildcard matching.
         * @param {function} fn - The handler function to call the first time the event is fired.
         */
        once : function(eventName, fn) {
            return eve.once(eventName, fn);
        },
        /**
         * Return all handlers that would be triggered when an event is fired.
         *
         * @param {string} eventName - The name of the event to return handlers for.
         * @return {Array.<function>} - An array of handler functions.
         */
        listeners : function(eventName) {
            return eve.listeners(eventName);
        },
        /**
         * Determine the current event name or whether the current event name includes a specific sub-name.
         *
         * @param {string=} subname - The sub-name to search for in the current event name (optional).
         * @return {string|boolean} Either returns the name of the currently firing event, or if a sub-name is passed in
         *                          it instead returns whether this event includes that sub-name.
         */
        name : function(subname) {
            return eve.nt(subname);
        },
        /**
         * Creates an event object that tracks all listeners and provides a convenience function .destroy()
         * that will stop listening to all events in the chain, rather than manually having to call .off()
         * again.
         *
         * @example
         *     var chain = events.chain().on('a', callback).on('b', callback);
         *     ...
         *     chain.destroy();
         *
         * @returns {EventChain}
         */
        chain: function() {
            return this.chainWith(this);
        },
        /**
         * Works exactly like .chain(), but allows you to specify your own
         * event producer to attach and detach listeners on. The event producer must conform to the
         * EventProducer interface.
         *
         * @example
         *     var chain = events.chainWith($('.something')).on('a', callback).on('b', callback);
         *     ...
         *     chain.destroy();
         *
         * @param {EventProducer} that - An object on which to attach/detach event listeners.
         * @returns {EventChain}
         */
        chainWith: function(that) {
            var listeners = [];
            var eventChain = {
                /**
                 * @param {string} eventName - The type of event to attach the listener to.
                 * @param {function} eventListener - The listener to attach.
                 * @returns {EventChain}
                 */
                on: function(eventName, eventListener) {
                    var args = arguments;
                    that.on.apply(that, args);
                    listeners.push(function() {
                        that.off.apply(that, args);
                    });
                    return this;
                },
                /**
                 * Destroy the event chain and detach all listeners. The chain should not be used after calling this method.
                 */
                destroy: function() {
                    // I would use map except that I want to avoid dependencies
                    for (var i = 0; i < listeners.length; i++) {
                        listeners[i]();
                    }
                    // Just in case someone wants to keep using it
                    listeners = [];
                }
            };

            return eventChain;
        },
        /**
         * Call this method to stop propagation of the currently firing event.
         */
        stop : function() {
            return eve.stop();
        },
        /**
         * Create an event mixin similar to Backbone.Events which also triggers events in the global event bus.
         *
         * Prototypes which are extended with a mixin
         *
         * @param {String} namespace the namespace to use when cascading local events to global events
         * @param {Object} [options] mixin options.
         * @param {boolean} [options.localOnly] whether the event should only be fired locally
         * @returns {Backbone.Events} an event mixin which can be used to extend any prototype
         */
        createEventMixin : function(namespace, options) {
            options = options || {};
            return _.extend({}, Backbone.Events, {
                /**
                 * @param {String} eventName
                 */
                trigger: function(eventName/*, ...args */) {
                    // Trigger local events before global events
                    var result = Backbone.Events.trigger.apply(this, arguments);
                    if (!options.localOnly) {
                        eevee.trigger.apply(eevee, [namespace + '/' + eventName, this].concat(Array.prototype.slice.call(arguments, 1)));
                    }
                    return result;
                },
                /**
                 * Listen for the specified local events triggered by `that` and retrigger them from `this`.
                 * Uses `chainWith` internally so it returns a destroyable.
                 *
                 * @param {{on: Function, off: Function}} that
                 * @returns {{on: Function, destroy: Function}}
                 */
                retriggerFrom: function(that /*, eventName1, eventName2...*/) {
                    var eventNames = Array.prototype.slice.call(arguments, 1);

                    function retrigger(eventable, eventName){
                        return eventable.on(eventName, this.trigger.bind(this, eventName));
                    }

                    return eventNames.reduce(retrigger.bind(this), eevee.chainWith(that));
                }
            });
        },
        /**
         * Convenience method for the very common 'localOnly' use of createEventMixin
         * @returns {Backbone.Events}
         */
        createLocalEventMixin : function(){
            return this.createEventMixin(null, { localOnly : true });
        },
        /**
         * Add local and global events to the supplied `thing`
         * @param {Object}  thing - the thing to extend
         * @param {Object}  [options] mixin options.
         * @param {boolean} [options.localOnly] whether the event should only be fired locally
         */
        addEventMixin: function(thing, namespace, options) {
            _.extend(thing, this.createEventMixin(namespace, options));
        },
        /**
         * Add local events to the supplied `thing`
         * @param {Object}  thing - the thing to extend
         */
        addLocalEventMixin: function (thing) {
            _.extend(thing, this.createLocalEventMixin());
        }
    };

    return eevee;
});
