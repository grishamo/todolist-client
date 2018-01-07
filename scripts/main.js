require.config( {
    baseUrl: 'scripts',
    paths: {
        "q" : ["../lib/q.min"],
        "jquery": ["../lib/jquery.min"],
        "datepicker" : ["../lib/jQuery.ui.datepicker"],
        "datepickermobile" : ["../lib/jquery.ui.datepicker.mobile"],
        "jquerymobile": ["http://code.jquery.com/mobile/git/jquery.mobile-git"],
        "jquery.validate": ["../lib/jquery.validate.min"]
    },
    shim: {
        'jquery': { exports: "$" },
        'datepicker': ['jquery'],
        'datepickermobile': ['jquery'],
        'jquerymobile': ['jquery', 'mobileinit'],
        'jquery.validate': ['jquery']
    }
});

// Includes File Dependencies
require([
    // libraries
    "jquery",
    "jquery.validate",
    "datepicker",
    "datepickermobile",

    // other files
    "app",

    "jquerymobile"// load last

    // "datepickermobile"
]);