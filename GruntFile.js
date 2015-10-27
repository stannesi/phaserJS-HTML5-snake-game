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
                    useAvailablePort: true,
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

    });
    
    grunt.registerTask('default', ['concat', 'connect', 'open', 'watch']);
}
    