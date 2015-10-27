module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './deploy'
                }
            }
        },
        concat: {
            dist: {
                src: [ 'src/js/lib/*.js', 'src/js/state/*.js', 'src/js/*.js' ],
                dest: 'deploy/js/<%= pkg.name %>.js'
            }
        },
        watch: {
            files: 'src/**/*.js',
            tasks: ['concat']
        },
        open: {
            dev: {
                path: 'http://localhost:8000/index.html'
            }
        }
    });
    
    grunt.registerTask('default', ['concat', 'connect', 'open', 'watch']);
}
    