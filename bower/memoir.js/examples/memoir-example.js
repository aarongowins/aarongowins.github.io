$(document).ready(function() {
    if (memoir.nativeSupport()) {
        $(document).on('click', 'a', function(e) {
            var url = this.href;
            $.get(url)
                .done(function(data) {
                    memoir.pushState({ html : $(data).first().html() }, '', url);
                    console.log('memoir.pushState to ' + url);
                });
            e.preventDefault();
        });
        memoir.bind('memoir.changestate', function(event) {
            $("ul").empty().html(event.state.html);
            console.log('did changestate');
        });
        memoir.bind('memoir.popstate', function(event) {
            console.log('did popstate');
        });
        memoir.initialState({ html : $("ul").html() });
  }
});
