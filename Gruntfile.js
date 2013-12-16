/* jshint
  node:true
*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        "js/**/*.js",
        "Gruntfile.js",
      ],
      options: {
        "curly": true,
        "eqnull": true,
        "eqeqeq": true,
        "undef": true,
        "browser": true,
        "globals": {
          "require": true,
          "define": true,
          "console": true,
        }
      }
    },

    watch: {
      files: [
        "<%= jshint.files %>",
      ],
      tasks: [
        "jshint",
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};