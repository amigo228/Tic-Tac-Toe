const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const ts = require('gulp-typescript');
const fileInclude = require('gulp-file-include');
const htmlMin = require('gulp-htmlmin');

function html() {
    return gulp.src('src/**/*.html')
        .pipe(fileInclude({
            prefix: '@@'
        }))
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'));
}

function compileSass() {
    return gulp.src('src/style/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/style/css'));
}

function compileTypeScript() {
    return gulp.src('src/ts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            module: 'es6',
            target: 'es5'
        }))
        .pipe(gulp.dest('dist/js'));
}

function watchFiles() {
    gulp.watch('src/style/scss/**/*.scss', compileSass);
    gulp.watch('src/ts/**/*.ts', compileTypeScript);
    gulp.watch('src/**/*.html', html);
}

module.exports.default = gulp.series(html, compileSass, compileTypeScript, watchFiles);