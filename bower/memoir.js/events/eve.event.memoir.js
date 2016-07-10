(function(eve, memoir, require, undefined) {
    if (!memoir && require) {
        eve = eve || require('eve');
        memoir = require('memoir');
    }
    memoir.bind('memoir.popstate', function(e) {
        eve('memoir.popstate', this, e);
    });
    memoir.bind('memoir.changestate', function(e) {
        eve('memoir.changestate', this, e);
    });
})(this.eve, this.memoir, this.require);
