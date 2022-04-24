// eslint-disable-next-line object-curly-newline
const { src, dest, series, watch } = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const bsync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const del = require('del');
const gwebp = require('gulp-webp');
const postHTML = require('gulp-posthtml');
const postHTMLNoRef = require('posthtml-link-noreferrer');
const terser = require('gulp-terser');

const config = () => ({
  plugins: [
    postHTMLNoRef({
      attr: ['noopener', 'noreferrer'],
    }),
  ],
});

const css = () => src('src/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(dest('dist/css'))
  .pipe(bsync.stream());

const refresh = (done) => {
  bsync.reload();
  done();
};

const webp = () => src('dist/img/**/*.{png,jpg}')
  .pipe(gwebp())
  .pipe(dest('dist/img'));

const images = () => src('dist/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.mozjpeg({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(dest('dist/img'));

const sprite = () => src('src/img/**/*icon-*.svg')
  .pipe(svgstore({
    inlineSvg: true,
  }))
  .pipe(rename('sprite.svg'))
  .pipe(dest('dist/img'));

const copy = () => src([
  'src/fonts/**/*.{woff,woff2}',
  'src/img/**',
  'src/js/**',
  'src/*.ico',
], {
  base: 'src',
})
  .pipe(dest('dist'));

const clean = () => del('dist');

const html = () => src('src/*.html')
  .pipe(postHTML(config))
  .pipe(dest('dist'));

const compressJs = () => src('src/js/**/*.js')
  .pipe(terser())
  .pipe(dest('dist/js'));

const server = () => {
  bsync.init({
    server: 'dist/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    browser: 'firefox',
  });
  watch('src/sass/**/*.scss', series(css, refresh));
  watch('src/img/icon-*.svg', series(sprite, refresh));
  watch('src/*.html', series(html, refresh));
};

const build = series(
  clean,
  copy,
  css,
  webp,
  images,
  sprite,
  html,
);

exports.build = build;

exports.dev = series(
  build,
  server,
);
