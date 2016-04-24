"use strict";

module.exports = function(grunt) {

    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: pkg,
        // banner: grunt.file.read("dev/copy.js").replace(/@VERSION/, pkg.version),
        banner: grunt.file.read("dev/banner.txt"),
        // Task configuration.
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                src: "<%= concat.dist.dest %>",
                dest: "<%= pkg.name %>-min.js"
            },
            nodeps: {
                src: "<%= concat.nodeps.dest %>",
                dest: "<%= pkg.name %>-nodeps-min.js"
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: "VERSION",
                        replacement: "<%= pkg.version %>"
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["<%= concat.dist.dest %>", "<%= concat.nodeps.dest %>"],
                    dest: "./"
                }]
            }
        },
        concat: {
            dist: {
                dest: "<%= pkg.name %>.js",
                src: [
                    "dev/eve.js",
                    "dev/raphael.core.js",
                    "dev/raphael.svg.js",
                    "dev/raphael.vml.js",
                    "dev/raphael.amd.js"
                ]
            },
            nodeps: {
                dest: "<%= pkg.name %>-nodeps.js",
                src: [
                    "dev/raphael.core.js",
                    "dev/raphael.svg.js",
                    "dev/raphael.vml.js",
                    "dev/raphael.amd.js"
                ]
            }
        },
        webpack: {
            dist: {
                // webpack options
                entry: "./dev/raphael.amd.js",
                output: {
                    path: "./",
                    filename: "<%= pkg.name %>.js",
                    library: "Raphael"
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks('grunt-webpack');

    // Default task.
    grunt.registerTask("default", ["concat", "replace", "uglify"]);
    grunt.registerTask("build:dist", ["webpack:dist"]);

};
