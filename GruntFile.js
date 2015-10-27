module.exports = function(grunt) {
    
    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [ 'src/js/lib/*.js', 'src/js/state/*.js', 'src/js/*.js' ],
                dest: 'deploy/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n
                        '/*! author: <%= pkg.author %>  %> */\n'
              },
            dist: {
                src: 'deploy/js/<%= pkg.name %>.js',
                dest: 'deploy/js/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            files: 'src/**/*.js',
            tasks: ['concat', 'uglify']
        }
    });
    
    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'watch']);
}
    