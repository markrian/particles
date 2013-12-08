module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      jshintrc: ".jshintrc",
      files: [
        "js/**/*.js",
        "Gruntfile.js"
      ]
    },

    watch: {
      files: [
        "<%= jshint.files %>"
      ],
      tasks: [
        "jshint"
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};