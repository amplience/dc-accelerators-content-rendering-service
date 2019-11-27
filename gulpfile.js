'use strict';

var es = require('event-stream');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var del = require('del');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var addSrc = require('gulp-add-src');
var connect = require('gulp-connect');
var flatten = require('gulp-flatten');
var cleanCSS = require('gulp-clean-css');

var toReplace = require('./.replace.json');

var replace = function () {
    return es.map(function (file, cb) {
        var fileContent = file.contents.toString();
        fileContent = fileContent.replace(/\{CONTENT_TYPE_BASEPATH\}/g, toReplace.CONTENT_TYPE_BASEPATH);
        file.contents = new Buffer.from(fileContent);
        // send the updated file down the pipe
        cb(null, file);
    });
}

var replaceCompany = function () {
    return es.map(function (file, cb) {
        var fileContent = file.contents.toString();
        fileContent = fileContent.replace(/\{COMPANY_TAG\}/g, toReplace.COMPANY_TAG);
        file.contents = new Buffer.from(fileContent);
        // send the updated file down the pipe
        cb(null, file);
    });
};

gulp.task('del', function () {
    return del('dist');
});

gulp.task('copy-icons', function () {
    return gulp
        .src([
            'src/**/*.icon.png'
        ])
        .pipe(flatten())
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('copy-templates', function () {
    return gulp
        .src([
            'src/*/templates/*.html'
        ])
        .pipe(flatten())
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('copy-local-content-types', function () {
    return gulp
        .src([
            'src/*/contentTypes/*.json'
        ])
        .pipe(replace())
        .pipe(flatten())
        .pipe(gulp.dest('dist/contentTypes'));
});

gulp.task('copy-node-modules', function () {
    return gulp
        .src([
            'node_modules/lory.js/dist/lory.min.js'
        ])
        .pipe(gulp.dest('dist'));
});


gulp.task('addLoryLicense', function () {
    return gulp
        .src('node_modules/lory.js/LICENSE')
        .pipe(insert.prepend('/*'))
        .pipe(insert.append('*/'))
        .pipe(addSrc.append('dist/lory.min.js'))
        .pipe(concat('lory.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-js', function () {
    return gulp.src([
            'src/**/*.js',
            'node_modules/poi-js-lib/dist/poi-lib.min.js',
            '!**/*.stories.js'
        ])
        .pipe(concat('utils.js'))
        .pipe(replaceCompany())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', function () {
    return gulp.src(['dist/utils.js'])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function () {
    return gulp.src([
            'src/**/*.scss',
            '!src/cardsPreview/cardsPreview.scss',
            '!src/cardsPreview/localCardsStyles.scss'
        ])
        .pipe(
            sass({
                outputStyle: 'expanded'
            }).on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        )
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-cards-css', function () {
    return gulp.src([
            'src/cardsPreview/cardsPreview.scss'
        ])
        .pipe(
            sass({
                outputStyle: 'expanded'
            }).on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        )
        .pipe(concat('cardsStyles.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    return gulp.src([
          'dist/styles.css',
          'dist/cardsStyles.css'
        ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task(
    'build',
    gulp.series(
        'del',
        'copy-node-modules',
        'copy-icons',
        'copy-templates',
        'copy-local-content-types',
        'addLoryLicense',
        'build-js',
        'minify-js',
        'build-cards-css',
        'build-css',
        'minify-css'
    ),
    function () {}
);

gulp.task('buildAllWithoutReload', gulp.series('build'));

gulp.task('buildAll', gulp.series('buildAllWithoutReload'), function () {
    return gulp.src('*').pipe(connect.reload());
});

gulp.task('server', function (done) {
    connect.server({
        port: 9100,
        hostname: '0.0.0.0',
        livereload: true,
        debug: true
    });

    done();
});

gulp.task(
    'buildAllMin',
    gulp.series('build', 'server'),
    function () {
        return gulp.src('*').pipe(connect.reload());
    }
);

gulp.task('watch', function (done) {
    gulp.watch('src/**/*', gulp.series(['buildAll']));
    done();
});

gulp.task('default', gulp.series('buildAll', gulp.parallel('watch', 'server')));