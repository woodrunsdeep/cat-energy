const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const del = require('del');
const webp = require('gulp-webp');

gulp.task('css', () => gulp.src('src/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('dist/css'))
  .pipe(server.stream()));

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('server', () => {
  server.init({
    server: 'dist/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    browser: 'firefox',
  });
  gulp.watch('src/sass/**/*.scss', gulp.series('css'));
  gulp.watch('src/img/icon-*.svg', gulp.series('sprite', 'refresh'));
  gulp.watch('src/*.html', gulp.series('html', 'refresh'));
});

gulp.task('webp', () => gulp.src('dist/img/**/*.{png,jpg}')
  .pipe(webp())
  .pipe(gulp.dest('dist/img')));

gulp.task('images', () => gulp.src('dist/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.mozjpeg({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest('dist/img')));

gulp.task('sprite', () => gulp.src('src/img/**/*icon-*.svg')
  .pipe(svgstore({
    inlineSvg: true,
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('dist/img')));

gulp.task('copy', () => gulp.src([
  'src/fonts/**/*.{woff,woff2}',
  'src/img/**',
  'src/js/**',
  'src/*.ico',
  'src/*.html',
], {
  base: 'src',
})
  .pipe(gulp.dest('dist')));

gulp.task('clean', () => del('dist'));

gulp.task('html', () => gulp.src('src/*.html')
  .pipe(gulp.dest('dist')));

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'webp',
  'images',
  'sprite',
  'html',
));

gulp.task('start', gulp.series(
  'build',
  'server',
));
