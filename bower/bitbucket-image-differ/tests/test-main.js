// bind polyfill for PhantomJS from MDN:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
//
// (Public Domain as per https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses)
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

var allTestFiles = [];
var TEST_REGEXP = /^\/base\/tests.*?(spec|test)\.js$/i;

var pathToModule = function(path) {
    if (/^\/absolute/.test(path)) {
        return path.replace('\\', '/');
    } else {
        return path.replace(/^\/base\//, '').replace(/\.js$/, '');
    }
};

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});

var karmaStarted = false;

var requireConfig = {
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    // we have to kickoff Require, as it is asynchronous
    callback: function () {
        var self = this;
        // when loading tests containing Squire this callback could fire multiple times as each
        // Squire instance creates a Require context
        if (!karmaStarted) {
            karmaStarted = true;

            // load all the actual test files here..
            require(allTestFiles, function() {
                // Introduce a delay as when using Squire some test files load asynchronously,
                // this allows us to get a correct test count.
                setTimeout(function () {
                    window.__karma__.start.apply(self, Array.prototype.splice(arguments));
                }, 200);
            });
        }
    },
    paths: {
        // generic modules that are probably going to be required by tests
        'aui': 'bower_components/aui/aui/js/aui',
        'eventEmitter': 'bower_components/eventEmitter/EventEmitter',
        'jquery': 'bower_components/jquery/jquery',
        'lodash': 'bower_components/lodash/lodash',
        'resemble': 'bower_components/resemblejs/resemble'
    },
    shim: {
        'aui': {
            deps: ['jquery'],
            init: function () {
                /*global AJS*/
                return AJS;
            }
        }
    }
};

// Adds modules found in bower_components and the module under test to paths
Object.keys(window.__karma__.config.componentModules).forEach(function (moduleName) {
    requireConfig.paths[moduleName] = window.__karma__.config.componentModules[moduleName];
});

require.config(requireConfig);