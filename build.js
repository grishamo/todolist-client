({
    // no minification, is done by the min task
    //optimize: 'none',
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
    },
    baseUrl: 'scripts/',
    mainConfigFile: 'scripts/main.js',

    out: 'dist/output.min.js',
    optimize: 'uglify2',

    include: ['main']
})


