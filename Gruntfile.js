module.exports = function (grunt) {

  // подключаем плагин load-grunt-tasks, чтобы не перечислять все прочие плагины
  require('load-grunt-tasks')(grunt);

  // описываем задачи, которые планируем использовать (их запуск - см. низ этого файла)
  grunt.initConfig({

    // очищаем папку build перед новой записью
    clean: {
      build: ['build']
    },

    // собираем все импорты из папки includes в один файл
    sass_compile_imports: {
      keep_extension: {
        options: {
            quiet: true
        },
        target: 'source/scss/_includes.scss',
        files: [{
            expand: true,
            cwd   : 'source/includes/',
            src   : ['**/*.scss']
        }]
      }
    },

    // компилируем scss
    sass: {
      source: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'source/scss',
          src: ['*.scss', '!variables.scss'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },

    // копируем файлы из папки source в папку build
    copy: {
      img: {
        expand: true,
        cwd: 'source/img/',
        src: ['**'],
        dest: 'build/img/',
      },

      js: {
        expand: true,
        cwd: 'source/js/',
        src: ['**'],
        dest: 'build/js/',
      },

      fonts: {
        expand: true,
        cwd: 'source/fonts/',
        src: ['**'],
        dest: 'build/fonts/',
      },

      video: {
        expand: true,
        cwd: 'source/video/',
        src: ['**'],
        dest: 'build/video/',
      }
    },

    // оптимизируем svg
    svgo: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'source/svg/',
          src: ['**/*.svg'],
          dest: 'source/svg/'
        }]
      }
    },

    // собираем svg-спрайт, используем так:
    // <svg class="svg" width="50px" height="50px">
    //  <use xlink:href="img/sprite.svg#svg-heart"></use>
    // </svg>
    svgstore: {
      options: {
        prefix: 'svg-',
      },
      default: {
        files: {
          'build/img/sprite.svg': ['source/svg/*.svg'],
        }
      }
    },

    // обрабатываем разметку
    // используем так: @@include('includes/header/header.html')
    includereplace: {
      html: {
        expand: true,
        cwd: 'source/',
        src: '*.html',
        dest: 'build/',
      }
    },

    // форматируем разметку после сборки
    prettify: {
      options: {
        config: '.prettifyrc'
      },
      all: {
        expand: true,
        cwd: 'build/',
        ext: '.html',
        src: ['*.html'],
        dest: 'build/'
      },
    },

    // autoprefixer
    autoprefixer: {
      options: {
        browsers: ["last 2 version", "ie 11"]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    // объединяем медиавыражения
    cmq: {
      style: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    // сортируем css
    csscomb: {
      dist: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
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

    //Отслеживаем изменения
    watch: {
      // перезагрузка
      livereload: {
        options: {
          livereload: true
        },
        files: ['build/**/*'],
      },
      // следить за стилями
      style: {
        // за сохранением каких файлов следить
        files: ['source/**/*.scss'],
        // какую задачу при этом запускать
        tasks: ['style'],
        options: {
          spawn: false,
        }
      },
      // следить за картинками
      images: {
        files: ['source/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['img'],
        options: {
          spawn: false
        }
      },
      // следить за файлами разметки
      html: {
        files: ['source/**/*.html'],
        tasks: ['html'],
        options: {
          spawn: false
        }
      },
      // следить за скриптами
      js: {
        files: ['source/**/*.js'],
        tasks: ['js'],
        options: {
          spawn: false
        }
      },
      // следить за шрифтами
      fonts: {
        files: ['source/fonts/**'],
        tasks: ['fonts'],
        options: {
          spawn: false
        }
      },
      // следить за видео
      video: {
        files: ['source/video/**'],
        tasks: ['video'],
        options: {
          spawn: false
        }
      },
      // следить за svg
      svg: {
        files: ['source/svg/**'],
        tasks: ['svg'],
        options: {
          spawn: false
        }
      }
    },

    // локальный сервер, автообновление
    browserSync: {
      dev: {
        bsFiles: {
          // за изменением каких файлов следить для автообновления открытой в браузере страницы с локального сервера
          src: [
            'build/css/*.css',
            'build/js/*.js',
            'build/fonts/**',
            'build/img/*.{png,jpg,gif,svg}',
            'build/svg/*.svg',
            'build/**/*.html',
            'build/video/**/',
          ]
        },
        options: {
          watchTask: true,
          server: {
            // корень сервера
            baseDir: "build/",
          },
          // синхронизация между браузерами и устройствами (если одна и та же страница открыта в нескольких браузерах)
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
          }
        }
      }
    }

  });

  // задача по умолчанию
  grunt.registerTask('default', [
    'clean',
    'sass_compile_imports',
    'sass',
    'copy',
    'svgo',
    'svgstore',
    'includereplace:html',
    'prettify',
    'autoprefixer',
    'cmq',
    'csscomb',
    'imagemin',
    'browserSync',
    'watch'

  ]);

  // только компиляция стилей
  grunt.registerTask('style', [
    'sass_compile_imports',
    'sass',
    'cmq',
    'csscomb'
  ]);

  // только обработка картинок
  grunt.registerTask('img', [
    'copy:img',
    'imagemin'
  ]);

  // только обработка html
  grunt.registerTask('html', [
    'includereplace:html',
    'prettify'
  ]);

  // только обработка js
  grunt.registerTask('js', [
    'copy:js'
  ]);

  // только обработка fonts
  grunt.registerTask('fonts', [
    'copy:fonts'
  ]);

  // только обработка видео
  grunt.registerTask('video', [
    'copy:video'
  ]);

  // сборка svg
  grunt.registerTask('svg', [
    'svgo',
    'svgstore'
  ]);

};