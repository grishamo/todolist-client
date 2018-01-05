require.config( {
    baseUrl: 'scripts',
    paths: {
        "q" : "../lib/q.min",
        "jquery": "../lib/jquery.min",
        "jquerymobile": "../lib/jquerymobile.min",
        "jquery.validate": "../lib/jquery.validate.min"
    },
    shim: {
        'q' : {exports: 'Q'},
        'jquery': { exports: "$" },
        'jquerymobile': ['jquery', 'mobileinit'],
        'jquery.validate': ['jquery']
    }
});

// Includes File Dependencies
require([
    // libraries
    "jquery",
    "jquery.validate",

    // other files
    "app",

    "jquerymobile" // load last
]);