/**
 * Created by untung on 1/19/15.
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> */\n'
            },
            build: {
                files: [
                    {
                        src: ['src/server.js', '!Gruntfile.js'],
                        dest: 'build/server.min.js'
                    },
                    {
                        src: ['src/mosca.js', '!Gruntfile.js'],
                        dest: 'build/mosca.min.js'
                    }
                ]
            }
        },
        clean: {
            build: ['build/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['uglify']);
}