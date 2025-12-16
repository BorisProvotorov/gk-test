import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import posthtml from 'gulp-posthtml';
import include from 'posthtml-include';
import { deleteAsync as del } from 'del';
import purgecss from 'gulp-purgecss'; // ← Новый импорт


const server = browserSync.create();

// Пути
const paths = {
  src: {
    scss: 'src/scss/**/*.scss',
    js: 'src/scripts/**/*.js',
    html: 'src/**/*.html',
    images: 'src/img/**/*.{jpg,jpeg,png,gif,svg,webp}',
    svgIcons: 'src/img/icons/*.svg',
    fonts: 'src/fonts/**/*',
  },
  build: {
    css: 'dist/css/',
    js: 'dist/scripts/',
    html: 'dist/',
    images: 'dist/img/',
    sprites: 'dist/img/sprites/',
    fonts: 'dist/fonts/',
  },
  watch: {
    scss: 'src/scss/**/*.scss',
    js: 'src/scripts/**/*.js',
    html: 'src/**/*.html',
    images: 'src/img/**/*.{jpg,jpeg,png,gif,svg,webp}',
    fonts: 'src/fonts/**/*',
  },
};

// Очистка dist
const clean = () => del('dist');

const isProduction = process.env.NODE_ENV === 'production';

// Обработка SCSS → CSS
const styles = () => {
  return gulp.src(paths.src.scss, { sourcemaps: !isProduction })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(paths.build.css, { sourcemaps: !isProduction ? '.' : false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(gulp.dest(paths.build.css, { sourcemaps: !isProduction ? '.' : false }));
};

// Очистка CSS от неиспользуемых селекторов
const purge = () => {
  if (!isProduction) {
    // В dev-режиме просто копируем CSS без очистки
    return gulp.src(paths.build.css + '**/*.css')
      .pipe(gulp.dest(paths.build.css));
  }

  return gulp.src(paths.build.css + '**/*.css')
    .pipe(plumber())
    .pipe(purgecss({
      content: [
        paths.src.html,
        paths.src.js,
        'src/**/*.php' // если есть PHP-шаблоны
      ],
      safelist: [
        // Базовые селекторы
        'body', 'html', 'root',

        // Фреймворки (пример для Bootstrap/Tailwind)
        /^btn-/, /^card-/, /^modal-/,
        /^flex-/, /^grid-/, /^text-/,

        // Анимации и состояния
        /^animate-/, /^transition-/,
        ':hover', ':focus', ':active',

        // Динамические классы
        /^js-/, /^is-/, /^has-/,

        // Ваши кастомные классы
        '.no-js', '.loading', '.active', '.open',
        '.visible', '.hidden'
      ],
      fontFace: false,    // не удалять @font-face
      keyframes: true,     // сохранять анимации
      variables: true       // сохранять CSS-переменные
    }))
    .pipe(gulp.dest(paths.build.css));
};

// Минификация JS
const scripts = () => {
  return gulp.src(paths.src.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename((filePath) => {
      if (filePath.extname === '.js') {
        const nameWithoutMin = filePath.basename.replace(/\.min$/, '');
        filePath.basename = `${nameWithoutMin}.min`;
      }
    }))
    .pipe(gulp.dest(paths.build.js));
};

// Копирование скриптов (все файлы кроме script.js)
const copyScripts = () => {
  return gulp.src([
    'src/scripts/**/*',
    '!src/scripts/script.min.js',
    '!src/scripts/**/script.js'
  ], {
    encoding: false,
    nodir: true
  })
  .pipe(gulp.dest(paths.build.js));
};

// Обработка HTML с include
const html = () => {
  return gulp.src(paths.src.html)
    .pipe(posthtml([include()]))
    .pipe(gulp.dest(paths.build.html));
};

// Копирование изображений (dev)
const copyImages = () => {
  return gulp.src(paths.src.images, { encoding: false })
    .pipe(gulp.dest(paths.build.images));
};

// Оптимизация изображений (production)
const optimizeImages = () => {
  return gulp.src(paths.src.images, { encoding: false })
    .pipe(plumber())
    .pipe(imagemin([
      imageminMozjpeg({ quality: 75, progressive: true }),
      imageminPngquant({ quality: [0.65, 0.8], speed: 1 }),
      imageminSvgo({
        multipass: true,
        js2svg: { indent: 0, pretty: false },
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                removeDimensions: true,
                cleanupIDs: { minify: true, remove: true },
                removeComments: true,
                removeUselessDefs: true,
                removeEditorsNSData: true,
                removeEmptyAttrs: true,
                convertPathData: true,
                mergePaths: true,
              }
            }
          }
        ]
      }),
      imageminWebp({ quality: 75 })
    ], { verbose: true }))
    .pipe(gulp.dest(paths.build.images));
};

// Копирование шрифтов
const copyFonts = () => {
  return gulp.src(paths.src.fonts, { encoding: false })
    .pipe(gulp.dest(paths.build.fonts));
};

// Сервер
const serve = (done) => {
  server.init({
    server: 'dist',
    notify: false,
    open: true,
    cors: true,
  });
  done();
};

// Наблюдатель
const watch = () => {
  gulp.watch(paths.watch.scss, gulp.series(styles, purge, reload));
  gulp.watch(paths.watch.js, gulp.series(scripts, copyScripts, reload));
  gulp.watch(paths.watch.html, gulp.series(html, reload));
  gulp.watch(paths.watch.images, gulp.series(isProduction ? optimizeImages : copyImages, reload));
  gulp.watch(paths.watch.fonts, gulp.series(copyFonts, reload));
};

// Перезагрузка
const reload = (done) => {
  server.reload();
  done();
};


// Сборка: последовательное выполнение (важно для первого запуска)
const build = gulp.series(
  clean,
  styles,           // 1. Сначала компилируем SCSS → CSS
  purge,            // 2. Затем очищаем CSS
  gulp.parallel(    // 3. Параллельно остальные задачи
    scripts,
    html,
    isProduction ? optimizeImages : copyImages,
    copyScripts,
    copyFonts
  )
);

// Дефолтная задача (разработка)
export default gulp.series(
  clean,
  styles,           // 1. Компилируем SCSS
  purge,            // 2. Очищаем CSS
  gulp.parallel(    // 3. Параллельно остальное
    scripts,
    html,
    copyImages,
    copyScripts,
    copyFonts
  ),
  gulp.parallel(serve, watch)
);

// Экспорт отдельных задач
export {
  clean,
  styles,
  purge,
  scripts,
  html,
  copyImages,
  optimizeImages,
  serve,
  watch,
  build,
  copyScripts,
  copyFonts
};
// // Экспорт отдельных задач
// export { clean, styles, scripts, html, copyImages, optimizeImages, serve, watch, build, copyScripts, copyFonts }; // <-- Экспортируем новую задачу
