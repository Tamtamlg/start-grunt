module.exports = function (grunt) {

  // подключаем плагин load-grunt-tasks, чтобы не перечислять все прочие плагины
  require('load-grunt-tasks')(grunt);

  // описываем задачи, которые планируем использовать (их запуск - см. низ этого файла)
  grunt.initConfig({

    // очищаем папку build перед новой записью
    clean: {
      build: ['build']
    },

    // компилируем scss
    sass: {
      source: {
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
        // откуда
        cwd: 'source/img/',
        // какие файлы
        src: ['**'],
        // куда
        dest: 'build/img/',
      },

      js: {
        expand: true,
        // откуда
        cwd: 'source/js/',
        // какие файлы
        src: ['**'],
        // куда
        dest: 'build/js/',
      },

      fonts: {
        expand: true,
        // откуда
        cwd: 'source/fonts/',
        // какие файлы
        src: ['**'],
        // куда
        dest: 'build/fonts/',
      },

      video: {
        expand: true,
        // откуда
        cwd: 'source/video/',
        // какие файлы
        src: ['**'],
        // куда
        dest: 'build/video/',
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

    // форматируем разметку после сборки
    prettify: {
      options: {
        config: '.prettifyrc'
      },
      all: {
        expand: true,
        // в какую папку, из какой папки (тут это одина и та же папка)
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
          // в какой файл, из какого файла (тут это один и тот же файл)
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    // сортируем css
    csscomb: {
      dist: {
        options: {
          // путь к конфигурационному файлу
          config: 'csscomb.json'
        },
        files: {
          // в какой файл, из какого файла (тут это один и тот же файл)
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
        files: ['source/scss/**/*.scss'],
        // какую задачу при этом запускать
        tasks: ['style'],
        options: {
          spawn: false,
        }
      },
      // следить за картинками
      images: {
        // за сохранением каких файлов следить
        files: ['source/img/**/*.{png,jpg,gif,svg}'],
        // какую задачу при этом запускать
        tasks: ['img'],
        options: {
          spawn: false
        }
      },
      // следить за файлами разметки
      html: {
        // за сохранением каких файлов следить
        files: ['source/**/*.html'],
        // какую задачу при этом запускать
        tasks: ['html'],
        options: {
          spawn: false
        }
      },
      // следить за скриптами
      js: {
        // за сохранением каких файлов следить
        files: ['source/**/*.js'],
        // какую задачу при этом запускать
        tasks: ['js'],
        options: {
          spawn: false
        }
      },
      // следить за шрифтами
      fonts: {
        // за сохранением каких файлов следить
        files: ['source/fonts/**'],
        // какую задачу при этом запускать
        tasks: ['fonts'],
        options: {
          spawn: false
        }
      },
      // следить за видео
      video: {
        // за сохранением каких файлов следить
        files: ['source/video/**'],
        // какую задачу при этом запускать
        tasks: ['video'],
        options: {
          spawn: false
        }
      },
      // следить svg
      svg: {
        // за сохранением каких файлов следить
        files: ['source/svg/**'],
        // какую задачу при этом запускать
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
    'sass',
    'copy',
    'svgstore',
    'includereplace:html',
    'prettify',
    'autoprefixer',
    'cmq',
    'csscomb',
    // 'imagemin',
    'browserSync',
    'watch'

  ]);

  // только компиляция стилей
  grunt.registerTask('style', [
    'sass',
    'cmq',
    'csscomb'
  ]);

  // только обработка картинок
  grunt.registerTask('img', [
    'copy:img',
    // 'imagemin'
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
    'svgstore'
  ]);

};