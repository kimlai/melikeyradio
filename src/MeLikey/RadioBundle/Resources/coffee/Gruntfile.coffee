module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    
    coffee:
      options:
        bare: true
      # compile sources and specs into ./test/js/
      test:
        files: [
          { expand: true, ext: '.js', dest: 'test/js/', src: '**/*.coffee', cwd: 'src/' }
          { expand: true, ext: '.js', dest: 'test/js/specs/', src: '**/*.coffee', cwd: 'test/specs/' }
        ]
      # compile sources into ../public/js/
      deploy:
        files: [
          { expand: true, ext: '.js', dest: '../public/js/', src: '**/*.coffee', cwd: 'src/' }
        ]

    watch:
      test:
        files: ['**/*.coffee']
        tasks: ['coffee:test']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
