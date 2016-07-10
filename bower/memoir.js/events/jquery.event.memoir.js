(function($, memoir) {
    memoir.bind('memoir.popstate', function(e) {
        $(document).trigger('memoir.popstate', e);
    });
    memoir.bind('memoir.changestate', function(e) {
        $(document).trigger('memoir.changestate', e);
    });
})(jQuery, memoir);
