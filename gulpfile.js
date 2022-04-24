// eslint-disable-next-line object-curly-newline
const { src, dest, series, parallel, watch } = require('gulp');
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
const terser = require('gulp-terser');

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

const images = () => src('dist/img/**/*.{png,jpg,svg,ico}')
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
], {
    base: 'src',
})
    .pipe(dest('dist'));

const clean = () => del('dist');

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
};

const build = series(
    clean,
    copy,
    parallel([
        images,
        webp,
        css,
        sprite,
        compressJs,
    ]),
);

exports.build = build;

exports.dev = series(
    build,
    server,
);
