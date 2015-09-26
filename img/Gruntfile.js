module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        imagemin: {
            dist: {
                options: {
                   // optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['*.{png,jpg,gif}','bg/*.{png,jpg,gif}','!original/**'],
                    dest: '../dist/img'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['imagemin']);

};
