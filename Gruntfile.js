module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        /* --------------------------------------
        -------- get ressources  ---------------- */
        //        "local-googlefont": {
        //            kaushan:{
        //                options: {
        //                    family: "Kaushan+Script",
        //                    subset: "latin,latin-ext",
        //                    "sizes": [300,400,700,900],
        //                    "cssDestination": "css",
        //                    "fontDestination": "css/fonts"
        //                }
        //            }
        //
        //        },
        bower: {
            build: {
                dest: 'vendor/',
                css_dest:'css/vendor',
                js_dest:'js/vendor',
                fonts_dest:'dist/fonts',
                options: {
                    keepExpandedHierarchy: false,
                    packageSpecific: {
                        'components-font-awesome': {
                            files: [
                                "fonts/fontawesome-webfont.woff",
                                "fonts/fontawesome-webfont.woff2"
                            ]
                        }
                    }

                },

            }
        },
        copy: {
            forDist :{
                files: [
                    // includes files within path
                    {expand: true, cwd:'for_dist', src: ['**'], dest: 'dist/', filter: 'isFile'},
                ],

            }
        },
        bower_concat: {
            all: {
                dest: 'js/_bower.js',
                cssDest: 'css/_bower.css',
                bowerOptions: {
                    //      relative: false
                }
            }
        },

        /* --------------------------------------
        -------- optim CSS  ---------------- */
        //1. uncss
        //2. cssmin
        //3. processhtml

        uncss: {
            dist: {
                options: {
                    ignore:[
                        '.nav-over-header',
                        /.*cc-cookies.*/,
                        '.btn-danger','.btn-xs',
                        /.*navbar.*/,/.*collapse.*/,
                        '.nav-tabs',
                        /.*tooltip.*/,
                        /.*bv-.*/,/.*has-.*/,/.*form-.*/,/.*input-.*/,'.help-block','.glyphicon-remove','.glyphicon-ok','.btn[disabled]',
                        '.alert-danger','.alert','.alert-success',
                        /.*modal*/, /.*fade*/
                    ],
                    ignoreSheets: [/fonts.googleapis/],
                },
                files: {
                    'dist/inc/moventes.css': ['*.html']
                }
            }
        },
        cssmin: {
            options: {
                //                shorthandCompacting: false,
                //                roundingPrecision: -1,
                banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

                report:'min'
                //                ,sourceMap:true

            },
            build: {
                files: {
                    'dist/inc/moventes.min.css': ['dist/inc/moventes.css']
                }
            }
        },


        /* --------------------------------------
        -------- optim JS  ---------------- */
        //1. uglify
        //2. processhtml

        uglify: {
            build: {
                'files' : {
                    'dist/inc/moventes.min.js' : ['js/_bower.js','js/*.js','https://maps.googleapis.com/maps/api/js'],
                },
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    compress:true,
                    report:'min',
                    sourceMap:true,
                    preserveComments:false,
                    mangle: {
                        except: ['jQuery']
                    }

                },
            }
        },

        // -------------- PROCESS HTML
        processhtml: {
            dist: {
                options: {
                    process: true,
                },
                files: [
                    {
                        expand: true,
                        src: ['*.html'],
                        dest: 'dist/',
                        ext: '.html'
                    },
                ],
            }
        },


        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img'
                }]
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    removeIgnored:true,
                    minifyJS:true,
                    minifyCSS:true

                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        }

    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //    grunt.loadNpmTasks('grunt-local-googlefont');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
    grunt.registerTask('optimCss',['uncss','cssmin']);
    grunt.registerTask('optimJS',['uglify']);
    grunt.registerTask('getRessources',['bower','bower_concat']);
    grunt.registerTask('default', ['getRessources','optimCss','optimJS','processhtml:dist','copy:forDist','htmlmin']);




};
