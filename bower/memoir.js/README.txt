##################################################
##
## Memoir.js - A light weight pushState wrapper
##
##################################################
Usage:

var memoir = window.memoir || require('memoir'); // Which ever is your flavour

if (memoir.nativeSupport()) {
    
}


Memoir.js is designed to do the following:
* provide a consistent API for doing pushState across multiple browsers
* fallback to page reloads for browsers which don't support pushState or support it partially
* Provide a way to optimise your code by checking whether pushState is natively supported
* To not rely on any 3rd party JavaScript libraries (e.g. jQuery, underscorejs etc)

It is NOT designed to do the following:
* Use storage APIs such as LocalStorage or SessionStorage
* To support hashbang fallback implementations.

It can be used instead of libraries such as history.js or pjax where a simple yet flexible implementation is required
