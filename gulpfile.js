'use strict';

var es = require('event-stream');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var declare = require('gulp-declare');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var pump = require('pump');
var processhtml = require('gulp-processhtml');
var del = require('del');
var concat = require('gulp-concat');

var insert = require('gulp-insert');
var addSrc = require('gulp-add-src');

var connect = require('gulp-connect');
var watch = require('gulp-watch');
var name;

var dependencies = require('./dependencies.json');
var contentDependencies = require('./content_dependencies.json');
var toReplace = require('./.replace.json');

var libName = 'libs';

var excludeReusable = {
    text: '!./dist/reusable/showdown.min.js',
    slider: '!./dist/reusable/lory.js'
};

var reusable = './dist/reusable/*.js';

var replace = function () {
    return es.map(function (file, cb) {
        var fileContent = file.contents.toString();
        fileContent = fileContent.replace(/\{CONTENT_TYPE_BASEPATH\}/g, toReplace.CONTENT_TYPE_BASEPATH);
        file.contents = new Buffer(fileContent);
        // send the updated file down the pipe
        cb(null, file);
    });
}

var replaceVisualization = function () {
    return es.map(function (file, cb) {
        var fileContent = file.contents.toString();
        fileContent = fileContent.replace(/\{VISUALIZATION_BASEPATH\}/g, toReplace.VISUALIZATION_BASEPATH);
        fileContent = fileContent.replace(/\{COMPANY_TAG\}/g, toReplace.COMPANY_TAG);
        file.contents = new Buffer(fileContent);
        cb(null, file);
    });
}

gulp.task('addContentTypes', ['build'], function (cb) {
    for (var module in dependencies) {
        var moduleName = module.toLowerCase();

        gulp.src('./node_modules/dc-accelerators-content-types/' + moduleName + '.json')
            .pipe(replace())
            .pipe(
                gulp.dest('./dist/contentTypes/')
            );

        gulp.src('./src/reusable/slotContentTypes/slot-accelerators.json')
            .pipe(replace())
            .pipe(
                gulp.dest('./dist/contentTypes/')
            );

        if (contentDependencies[module]) {
            contentDependencies[module].forEach(function (dependency) {
                gulp.src('./node_modules/dc-accelerators-content-types/' + dependency + '.json')
                    .pipe(replace())
                    .pipe(
                        gulp.dest('./dist/contentTypes/')
                    )
            });
        }
    }

    setTimeout(function () {
        cb(null);
    }, 500)
});

gulp.task('sfcc-copy', function () {
    return gulp.src('./src/reusable/slotContentTypes/sfcc-slot-accelerators.json')
        .pipe(replace())
        .pipe(
            gulp.dest('./dist/contentTypes/')
        );
});

gulp.task('sfcc-templates-copy', function () {
    return gulp
        .src('src/reusable/sfcc-contentWrapper.html')
        .pipe(
            rename(function (path) {
                path.dirname = '';
            })
        )
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('addPackageStyles', function () {
    return gulp.src([
        './node_modules/dc-accelerators/dist/renders/*/package/*.css',
        './node_modules/dc-accelerators/dist/renders/*/package/*.js'
    ])
        .pipe(gulp.dest('dist/renders'))
});

gulp.task('addMinStyles', ['addPackageStyles'], function () {
    return gulp.src([
        './dist/renders/*/package/*.min.css',
        './dist/renders/*/package/*.js'
    ])
        .pipe(
            rename(function (path) {
                path.dirname = path.dirname.replace(/package.*$/, '');
            })
        )
        .pipe(gulp.dest('dist/renders'))
});


gulp.task('addDependencies', ['build', 'addContentTypes'], function () {
    for (var module in dependencies) {
        var fullReusable = [reusable];
        for (var res in excludeReusable) {
            fullReusable.push(excludeReusable[res]);
        }

        if (excludeReusable[module]) {
            fullReusable.splice(fullReusable.indexOf(excludeReusable[module]), 1);
        }

        dependencies[module].forEach(function (currentDependency) {
            if (excludeReusable[currentDependency]) {
                fullReusable.splice(
                    fullReusable.indexOf(excludeReusable[currentDependency]),
                    1
                );
            }
            gulp
                .src([
                    './dist/renders/' + currentDependency + '/package/**/*'
                ])
                .pipe(
                    gulp.dest(
                        './dist/renders/' +
                        module +
                        '/package/dependencies/' +
                        currentDependency
                    )
                );
        });

        gulp
            .src(fullReusable)
            .pipe(gulp.dest('./dist/renders/' + module + '/package/' + libName));
    }
});

gulp.task('minifyPack', ['build'], function () {
    for (var mod in dependencies) {
        (function () {
            let module = mod;

            let fullReusable = [reusable, './src/renders/' + module + '/js/*.js'];

            for (var res in excludeReusable) {
                fullReusable.push(excludeReusable[res]);
            }

            if (excludeReusable[module]) {
                fullReusable.splice(fullReusable.indexOf(excludeReusable[module]), 1);
            }

            dependencies[module].forEach(function (currentDependency) {

                fullReusable.push('./src/renders/' + currentDependency + '/js/*.js');

                if (excludeReusable[currentDependency]) {
                    fullReusable.splice(
                        fullReusable.indexOf(excludeReusable[currentDependency]),
                        1
                    );
                }
            });

            gulp
                .src(fullReusable)
                .pipe(uglify())
                .pipe(concat('libs.min.js'))
                .pipe(
                    rename(function (path) {
                        path.dirname = 'renders/' + module + '/min';
                    })
                )
                .pipe(gulp.dest('dist'));
        })();
    }
});

gulp.task('concatAll', ['build'], function () {
    gulp
        .src([
            './dist/reusable/*.js',
            './dist/renders/slider/sliderHelper.js',
            '!./dist/reusable/lory.min.js',
            '!./dist/reusable/showdown.min.js'
        ])
        .pipe(uglify())
        .pipe(
            addSrc.append([
                './dist/reusable/lory.min.js',
                './dist/reusable/showdown.min.js'
            ])
        )
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('./dist/renders/all'));
    gulp
        .src(['./dist/renders/*/*.min.css'])
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./dist/renders/all'));
});

gulp.task('del', function () {
    return del.sync(['dist']);
});

gulp.task('renders-html', function () {
    return (
        gulp
            .src([
                'src/renders/**/*.html',
                '!src/renders/*/templates/*.html',
                '!src/renders/**/visualisation.html'
            ])
            .pipe(processhtml())
            //.pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist/renders'))
    );
});

gulp.task('renders-js-copy', function () {
    return gulp
        .src(['src/renders/**/js/*.js'])
        .pipe(
            rename(function (path) {
                name = path.dirname.slice(0, path.dirname.indexOf('js') - 1);
                path.dirname = name + '/package';
            })
        )
        .pipe(gulp.dest('dist/renders'));
});

gulp.task('renders-types-copy', function () {
    return gulp
        .src(['src/renders/**/*.json'])
        .pipe(replace())
        .pipe(
            rename(function (path) {
                var name = path.dirname;
                path.dirname = name + '/package';
            })
        )
        .pipe(gulp.dest('dist/renders'));
});

gulp.task('renders-files-copy', function () {
    return gulp
        .src([
            'src/renders/**/visualisation.html'
        ])
        .pipe(replaceVisualization())
        .pipe(
            rename(function (path) {
                var name = path.dirname.replace('/templates', '');
                path.dirname = name + '/package';
            })
        )
        .pipe(gulp.dest('dist/renders'));
});

gulp.task('templates-copy', function () {
    return gulp
        .src([
            'src/renders/**/templates/*.html',
            'src/reusable/templateChooser.html'
        ])
        .pipe(
            rename(function (path) {
                path.dirname = '';
            })
        )
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('renders-js-min', function (cb) {
    pump(
        [
            gulp.src(['src/renders/**/js/*.js']),
            //uglify(),
            rename(function (path) {
                name = path.dirname.slice(0, path.dirname.indexOf('js') - 1);
                path.dirname = name;
                path.basename = path.basename;
                //+ '.min';
            }),
            gulp.dest('dist/renders')
        ],
        cb
    );
});

gulp.task('reusable-js-min', function (cb) {
    pump(
        [
            gulp.src(['src/**/js/*.js']),
            //uglify(),
            rename(function (path) {
                name = path.dirname.slice(0, path.dirname.indexOf('js') - 1);
                path.dirname = name;
                path.basename = path.basename;
            }),
            gulp.dest('dist')
        ],
        cb
    );
});
gulp.task('copy-node-modules', function () {
    return gulp
        .src([
            'node_modules/cms-javascript-sdk/dist/cms-javascript-sdk.min.js',
            'node_modules/showdown/dist/showdown.min.js',
            'node_modules/lory.js/dist/lory.min.js'
        ])
        .pipe(gulp.dest('dist/reusable'));
});

gulp.task('copy-icons', function () {
    return gulp
        .src([
            'src/icons/**'
        ])
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('addLoryLicense', ['copy-node-modules'], function () {
    return gulp
        .src('node_modules/lory.js/LICENSE')
        .pipe(insert.prepend('/*'))
        .pipe(insert.append('*/'))
        .pipe(addSrc.append('dist/reusable/lory.min.js'))
        .pipe(concat('lory.min.js'))
        .pipe(gulp.dest('dist/reusable'));
});

gulp.task('addShowdownLicense', ['copy-node-modules'], function () {
    return gulp
        .src('node_modules/showdown/license.txt')
        .pipe(insert.prepend('/*'))
        .pipe(insert.append('*/'))
        .pipe(addSrc.append('dist/reusable/showdown.min.js'))
        .pipe(concat('showdown.min.js'))
        .pipe(gulp.dest('dist/reusable'));
});

gulp.task('copy-viewer-kit-modules', function () {
    return gulp
        .src([
            'bower_components/jquery-ui/ui/jquery.ui.core.js',
            'bower_components/jquery-ui/ui/jquery.ui.widget.js',
            'node_modules/amplience-sdk-client/dist/video-js/video.min.js',
            'node_modules/amplience-sdk-client/dist/amplience-sdk-client.js'
        ])
        .pipe(gulp.dest('src/pdp/js'));
});

gulp.task(
    'renders-build',
    [
        'renders-html',
        'renders-js-copy',
        'renders-files-copy',
        'renders-types-copy',
        'renders-js-min',
        'addPackageStyles',
        'addMinStyles'
    ],
    function () {
    }
);

gulp.task(
    'build',
    [
        'del',
        'copy-node-modules',
        'copy-icons',
        'templates-copy',
        'addLoryLicense',
        'addShowdownLicense',
        'reusable-js-min',
        'renders-build'
    ],
    function () {
    }
);

gulp.task('buildAllWithoutReload', ['build', 'addDependencies', 'addContentTypes', 'concatAll']);

gulp.task('buildAll', ['buildAllWithoutReload'], function () {
    return gulp.src('*').pipe(connect.reload());
});

gulp.task('sfcc', ['buildAllWithoutReload', 'sfcc-copy', 'sfcc-templates-copy'], function () {
    return gulp.src('*').pipe(connect.reload());
});

gulp.task(
    'buildAllMin',
    ['build', 'addDependencies', 'addContentTypes', 'minifyPack', 'server'],
    function () {
        return gulp.src('*').pipe(connect.reload());
    }
);

gulp.task('server', function () {
    return connect.server({
        port: 9100,
        hostname: '0.0.0.0',
        livereload: true,
        debug: true
    });
});

gulp.task('watch', ['buildAll'], function () {
    return watch(['./src/**/*'], function () {
        gulp.start('buildAll');
    });
});

gulp.task('default', ['watch', 'server']);
