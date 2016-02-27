
module.exports = function(grunt){

  grunt.initConfig({
  concat: {
    dist: {
      src: ['js/main.js', 'js/tools/*.js'],
      dest: 'build/monkeyInline.js',
    },
  },
  less: {
    production: {
      files: {
        "build/css/monkeyInlineStyle.css": "less/monkeyInlineStyle.less"
      }
    }
  },
  uglify: {
    my_target: {
      files: {
        'build/monkeyInline.min.js': ['build/monkeyInline.js']
      }
    }
  },
  watch: {
    js: {
      files: ['js/**/*.js'],
      tasks: ['concat'],
    },
    less: {
      files: ['less/**/*.less'],
      tasks: ['less'],
    },
    min:{
      files: ['build/monkeyInline.js'],
      task: ['uglify'],
    }
  },
});

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default',['concat','less','uglify','watch']);
  grunt.registerTask('minify',['uglify']);

};
