define(['jquery'], function($) {
    $(document).on("mobileinit", function() {
      //jqm configuration
      // $.mobile.ajaxEnabled = false;
        $.mobile.page.prototype.options.degradeInputs.date = true;
        // $.mobile.page.prototype.options.keepNative = "select, input.foo, textarea.bar";
    });
});
