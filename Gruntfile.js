module.exports = function(grunt) {

  // подключаем плагин load-grunt-tasks, чтобы не перечислять все прочие плагины
  require('load-grunt-tasks')(grunt);

  // описываем задачи, которые планируем использовать (их запуск - см. низ этого файла)
  grunt.initConfig({

    // очищаем папку build перед новой записью
    clean: {
      build: ['build']
    },

	// копируем файлы из папки source в папку build и дальше работаем с этой папкой
    copy: {
      build: {
		files: [{
			expand: true,
			cwd: "source",
			src: [
			'img/**',             
            'js/**',
            'css/style.css',
            'css/normalize.css',
			'css/grid.css',
            'font/**',
            'includes/**',
            'index.html'
			],
			dest: "build"
		}]
	  }
	},
	
    // обрабатываем разметку
    includereplace: {
      html: {
        expand: true,
        // откуда брать исходные файлы
        cwd: 'source/',
        // какие файлы обрабатывать
        src: '*.html',
        // куда писать результат обработки
        dest: 'build/',
      }
    },
    
    // autoprefixer
    autoprefixer: {
      options: {
	    browsers: ["last 2 version", "ie 10"]
	  },
	  style: {
		src: "build/css/style.css"
      }
	},

    // объединяем медиавыражения
    cmq: {
      style: {
        files: {
          // в какой файл, из какого файла (тут это один и тот же файл)
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    // Сжимаем css
    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          // в какой папке брать исходники
          cwd: 'build/css',
          // какие файлы (ЛЮБОЕ_ИМЯ.css, но не ЛЮБОЕ_ИМЯ.min.css)
          src: ['*.css', '!*.min.css'],
          // в какую папку писать результат
          dest: 'build/css',
          // какое расширение дать результатам обработки
          ext: '.min.css'
        }]
      }
    },
	
	//Сжимаем картинки
    imagemin: { 
      images: {         
        options: {           
          optimizationLevel: 3         
        },         
        files: [{           
          expand: true,           
          src: ["build/img/**/*.{png,jpg,gif,svg}"]         
        }]       
      } 
    },

    // Заменяем пути в файле index.html
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /\"js\/main.js/g, 
              replacement: '"js/main.min.js'
            },
            {
              match: /\"css\/style.css/g, 
              replacement: '"css/style.min.css'
            },
            {
              match: /\"css\/normalize.css/g, 
              replacement: '"css/normalize.min.css'
            }
          ]
        },
        files: [
          {
			expand: true, 
		    src: ['build/index.html']
		  }
        ]
      }
    }

  });



  // задача по умолчанию
  grunt.registerTask('default', [
    'clean',
    'copy',
    'includereplace:html',
    'autoprefixer',
    'cmq',
    'cssmin',
    'imagemin',
    'replace'
//    'browserSync'
  ]);

};