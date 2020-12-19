const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const del = require('del');
const webp = require('gulp-webp');

gulp.task('css', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream()));

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    browser: 'firefox',
  });
  gulp.watch('source/sass/**/*.scss', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('webp', () => gulp.src('build/img/**/*.{png,jpg}')
  .pipe(webp())
  .pipe(gulp.dest('build/img')));

gulp.task('images', () => gulp.src('build/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.mozjpeg({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest('build/img')));

gulp.task('sprite', () => gulp.src('source/img/**/*icon-*.svg')
  .pipe(svgstore({
    inlineSvg: true,
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img')));

gulp.task('copy', () => gulp.src([
  'source/fonts/**/*.{woff,woff2}',
  'source/img/**',
  'source/js/**',
  'source/*.ico',
  'source/*.html',
], {
  base: 'source',
})
  .pipe(gulp.dest('build')));

gulp.task('clean', () => del('build'));

gulp.task('html', () => gulp.src('source/*.html')
  .pipe(gulp.dest('build')));

gulp.task('picturefill', () => gulp.src('./node_modules/picturefill/dist/picturefill.min.js')
  .pipe(gulp.dest('build/js')));

gulp.task('svg4everybody', () => gulp.src('./node_modules/svg4everybody/dist/svg4everybody.min.js')
  .pipe(gulp.dest('build/js')));

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'webp',
  'images',
  'picturefill',
  'svg4everybody',
  'sprite',
  'html',
));

gulp.task('start', gulp.series(
  'build',
  'server',
));
