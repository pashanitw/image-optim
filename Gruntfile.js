var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
module.exports = function(grunt) {

    grunt.initConfig({

        imagemin: {
            dynamic: {
                options: {
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg(),pngquant()],
                    multipass: true,
                    optimizationLevel: 7
                },// Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    src: ['**/*.{png,jpg,svg}'],   // Actual patterns to match
                    dest: 'dist/compressed/' ,
                    cwd: 'dist/responsive/'
                }]
            }
        },
        responsive_images: {
            myTask: {
                options: {
                    sizes: [{
                        name: 'small',
                        width: 320,
                        quality:60
                    },{
                        name: 'medium',
                        width: 640,
                        suffix: "_x1"
                    },{
                        name:"large",
                        width: 800,
                        suffix:"_x2"
                    }]
                },
                files: [{
                    expand: true,
                    src: ['*/**.{jpg,gif,png}'],
                    dest: 'dist/responsive',
                    filter: 'isFile',
                    cwd: 'src/'
                }]
            }
        },
        dataUri: {
            dist: {
                // src file
                src: ['src/**/*.css'],
                // output dir
                dest: 'dist/images',
                options: {
                    // specified files are only encoding
                    target: ['src/images/**/*.*'],
                    // adjust relative path?
                    fixDirLevel: true,
                    // img detecting base dir
                    // baseDir: './'

                    // Do not inline any images larger
                    // than this size. 2048 is a size
                    // recommended by Google's mod_pagespeed.
                    maxBytes : 20000

                }
            }
        },

        svgsprite  : {
            your_target: {
                src: ['src/images/*.svg'],
                dest: 'dist/dir',
                options: {
                    // Target-specific options
                }
            }
        },
        sprite: {
            options: {
                varPrefix: '', // defaults to `data-image-`
                varSuffix: '', // defaults to empty string
                colors: {      // a color mapping object that will map
                    // files named with the following scheme
                    // `truck.colors-red-green.svg` into separate datauri vars.
                    red: '#00ffff',
                    green: '#ff00ff'
                }
            },
            your_target: {
                files: {
                    src: "images/**/*.{png,jpg,gif,svg}",
                    dest: "generated/_datauri_variables.scss"
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-data-uri');
    grunt.registerTask('compress', ['imagemin']);
    grunt.registerTask('responsive', ['responsive_images']);
    grunt.registerTask('datauri', ['dataUri']);
    grunt.registerTask('sprite', ['sprite']);

};