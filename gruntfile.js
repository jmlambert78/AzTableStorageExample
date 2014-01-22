/*
 * Grunt setup
 *
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqnull: true,
                eqeqeq: true,
                undef: true,
                globals: {
                    "jQuery": true,
                    "angular": true
                }
            },
            ignores: {src: ['./node_modules/**/*.*', './views/**/*.*', './public/**/*.*']},
            files: {src: ['./**/*.*']}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']); // doesn't work
};