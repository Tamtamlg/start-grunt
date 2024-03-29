# Стартовый проект с grunt

<table>
  <thead>
    <tr>
      <th>Команда</th>
      <th>Результат</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%"><code>npm i</code></td>
      <td>Установить зависимости</td>
    </tr>
    <tr>
      <td><code>grunt</code></td>
      <td>Запустить сборку, сервер и слежение за файлами</td>
    </tr>
    <tr>
      <td><code>grunt ЗАДАЧА</code></td>
      <td>Запустить задачу с названием ЗАДАЧА (список задач в <code>Gruntfile.js</code>)</td>
    </tr>
  </tbody>
</table>



## Как начать новый проект

1. Клонировать этот репозиторий в новую папку (`git clone https://github.com/Tamtamlg/start new-project`) и зайти в неё (`cd new-project`).
2. Стереть историю разработки этого репозитория (`rm -rf .git`), инициировать новый (`git init`), создать удалённый репозиторий и привязать его (`git remote add origin АДРЕС`).
3. Отредактировать `README.md`, `package.json` (название проекта, автор, лицензия, сторонние пакеты и пр.)
4. Установить зависимости (`npm i`).
5. Запустить сервер разработки (команда `grunt`).

*Если репозиторий уже создан, вместо пунктов 1 и 2 просто копируем в него файлы из `https://github.com/Tamtamlg/start`



## Назначение папок

```bash
build/          # Папка сборки, здесь работает сервер автообновлений.
source/         # Исходные файлы.
  fonts/        # - шрифты проекта.
  img/          # - картинки (может содержать подпапки, например, картинки для главного слайдера и т.д.).
  includes/     # - блоки проекта.
  js/           # - js-файлы.
  scss/         # - стили scss.
  svg/          # - файлы для svg-спрайта.
  index.html    # - главная страница проекта.
```


## Разметка

HTML обрабатывается "grunt-include-replace".
Блок вставляется в разметку так: `@@include('includes/header/header.html')`, можно использовать json для передачи параметров ` @@include('tabs-slider-item/tabs-slider-item.html', {"img": "img/tabs-slider-2.jpg"})`. Параметры из json всавляются в html-файл блока так: `<img src="@@img" alt="">`.



## Стили

Используется SCSS.
`source/scss/style.scss` - Главный файл стилей.
`source/scss/_includes.scss` - Файл-диспетчер подключений стилей из папки `source/includes`.
`source/scss/_variables.scss` - Файл с переменными.



## Модульная сетка (flexbox)

По умолчанию используется Bootstrap v.4.1.1



## Блоки

Каждый блок лежит в `source/includes/` в своей папке. Каждый блок — папка и одноимённые scss- и html-файл.
Содержимое блока:

```bash
demo-block/               # Папка блока.
  demo-block.html         # Разметка.
  demo-block.scss         # Стилевой файл блока.
```


## Подключение блоков

Html вставляется в разметку вручную, scss импортируется в файл `source/scss/_includes.scss` автоматически.

