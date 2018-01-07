({
    // no minification, is done by the min task
    //optimize: 'none',
    paths: {
        "jQuery": "../lib/jquery.min",
        "jquerymobile": "../lib/jquerymobile.min",
        "jquery.validate": "../lib/jquery.validate.min",
        "underscore": "../lib/lodash.min"
    },
    shim: {
        'underscore': { exports: "_" },
        'jQuery': { exports: "$" },
        'jquery.validate': ['jQuery'],
        'jquerymobile': ['jQuery', 'mobileinit']
    },
    baseUrl: 'scripts/',
    mainConfigFile: 'scripts/main.js',

    out: 'dist/output.min.js',
    optimize: 'uglify2',

    include: ['main']
})


