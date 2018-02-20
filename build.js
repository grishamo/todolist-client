({
    // no minification, is done by the min task
    //optimize: 'none',
    paths: {
        "q" : "../lib/q.min",
        "jquery": "../lib/jquery.min",
        "datepicker" : "../lib/jQuery.ui.datepicker",
        "datepickermobile" : "../lib/jquery.ui.datepicker.mobile",
        "jquerymobile": "http://code.jquery.com/mobile/git/jquery.mobile-git",
        "jquery.validate": "../lib/jquery.validate.min"
    },
    shim: {
        'jquery': { exports: "$" },
        'datepicker': ['jquery'],
        'datepickermobile': ['jquery'],
        'jquerymobile': ['jquery', 'mobileinit'],
        'jquery.validate': ['jquery']
    },
    baseUrl: 'scripts',
    mainConfigFile: 'scripts/main.js',

    out: 'dist/scripts/output.min.js',
    optimize: 'uglify2',

    include: ['main']
})


