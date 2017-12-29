require.config( {
    // no minification, is done by the min task
    //optimize: 'none',
    baseUrl: 'scripts',
    paths: {
        "jquery": "../lib/jquery.min",
        "jquerymobile": "../lib/jquerymobile.min",
        "jquery.validate": "../lib/jquery.validate.min",
        "underscore": "../lib/lodash.min"
    },
    shim: {
        'underscore': { exports: "_" },
        'jquery': { exports: "$" },
        'jquery.validate': ['jquery'],
        'jquerymobile': ['jquery', 'mobileinit']
    }
});

// Includes File Dependencies
require([
    // libraries
    "jquery",
    "underscore",
    "jquery.validate",

    // other files
    "todo_list",
    "alpha",
    // "beta",

    "jquerymobile" // load last
]);