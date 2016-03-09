
module.exports = function(grunt){

  grunt.initConfig({
  concat: {
    dist: {
      src: ['js/main.js', 'js/tools.js', 'js/global_functions.js', 'js/tools/*.js'],
      dest: 'build/monkeyInline.js',
    },
  },
  less: {
    production: {
      files: {
        "build/css/monkeyInlineStyle.css": "less/monkeyInlineStyle.less",
        "css/MonkeyInlineDemo.css": "less/MonkeyInlineDemo.less"
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
  cssmin: {
    target: {
      files: {
        'build/css/monkeyInlineStyle.min.css': ['build/css/monkeyInlineStyle.css']
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
    },
    mincss:{
      files: ['build/css/monkeyInlineStyle.css'],
      task: ['cssmin'],
    }
  },
});

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default',['concat','less','uglify','cssmin','watch']);
  grunt.registerTask('minify',['uglify','cssmin']);

};
