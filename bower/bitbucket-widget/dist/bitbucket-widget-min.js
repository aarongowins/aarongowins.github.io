(function(g){"function"===typeof define&&define.amd?define(["exports","module","lodash"],g):"function"===typeof define&&!define.amd?define("bitbucket/internal/widget",["exports","module","lodash"],g):"undefined"!==typeof exports&&g(exports,module)})(function(g,m){function k(a,c){var b=Object.getOwnPropertyNames(a).filter(function(b){return-1===n.indexOf(b)&&f.isFunction(a[b])}),d=Object.getPrototypeOf(a);return d.isPrototypeOf(c)?b:f.uniq(b.concat(k(d,c)))}var f=require("lodash"),e,h=function(a){if(!(this instanceof
h))throw new TypeError("Cannot call a class as a function");f.bindAll(this,k(this,h));a&&(this.options=f.extend({},this.constructor.defaults,a))};e=h.prototype;var i={options:{get:function(){return this._options},set:function(a){this._options=a}},_getListeners:{value:function(a){this._listeners||(this._listeners={});this._listeners[a]||(this._listeners[a]=[]);return this._listeners[a]}},on:{value:function(a,c){var b=this._getListeners(a);f.contains(b,c)||b.push(c);return this}},off:{value:function(a,
c){for(var b=this._getListeners(a),d=b.length;d--;)(b[d]===c||b[d]._handler===c)&&b.splice(d,1);return this}},once:{value:function(a,c){var b=this.off.bind(this,a,c);b._handler=c;this.on(a,c);this.on(a,b);return this}},trigger:{value:function(a){for(var c=this,b=arguments.length,d=Array(1<b?b-1:0),e=1;e<b;e++)d[e-1]=arguments[e];this._getListeners(a).slice().forEach(function(a){try{a.apply(c,d)}catch(b){f.defer(function(){throw b;})}});return this}},_addDestroyable:{value:function(a){this._destroyables||
(this._destroyables=[]);f.isFunction(a)&&(a={destroy:a});if(!f.isFunction(a.destroy))throw Error("Argument is not destroyable");this._destroyables.push(a);return this}},destroy:{value:function(){this._destroyables&&(f.invoke(this._destroyables,"destroy"),this._destroyables=null);this.trigger("destroy");this._listeners&&(this._listeners=null)}}},l;for(l in i){var j=i[l];j.configurable=!0;j.value&&(j.writable=!0)}Object.defineProperties(e,i);e=h;Object.defineProperty(e.prototype,"__nonEnumerable",{enumerable:!0,
get:function(){throw Error("BitbucketWidget is not enumerable. Inherit using Object.create().");}});var n=["constructor","__nonEnumerable"];m.exports=e});