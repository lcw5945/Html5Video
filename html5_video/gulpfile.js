var gulp = require('gulp'),
    jshint = require('gulp-jshint'), //npm i -D jshint gulp-jshint
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    imagemin = require('gulp-imagemin'),
    hoganComplier = require('gulp-hogan-compile'),
    run = require('run-sequence'),
    del = require('del'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    babel = require('gulp-babel'),
    fs = require('fs'),
    path = require('path');

var root = __dirname,
    paths = {
        src: {
            html: path.join(root, 'src/html/*.html'),
            template: path.join(root, 'src/template/*.html'),
            css: path.join(root, 'src/less/*.css'),
            js: path.join(root, 'src/js/**/*.js'),
            sprite: path.join(root, 'src/assets/sprite/*.svg'),
            image: path.join(root, 'src/assets/images/*')
        },
        output_build: path.join(root, 'build/'),
        output_release: path.join(root, 'release/')
    };

var packageFile = loadJSON(path.join(root, 'package.json'));
var config = loadJSON(path.join(root, 'config.json'));
/**
 * 文件下载
 * @param url
 * @returns {{}}
 */
function loadJSON(url) {
    try {
        return JSON.parse(fs.readFileSync(url));
    }
    catch (err) {
        return {};
    }
}
/**
 * 清空build
 * @param name
 * @param path
 */
function clean(name, path) {
    gulp.task(name, function () {
        return del(path);
    });
}
/**
 * 代码验证
 * @param name
 * @param path
 */
function lint(name, path) {
    gulp.task(name, function () {
        return gulp.src(path)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
}

var tasks_build = {
    css: [],
    js: [],
    sprite: [],
    image: [],
    html: [],
    template: []
};

var build = {
    js: function (source) {
        var name = 'build-js';
        tasks_build.js.push(name);

        gulp.task(name, function () {
            return gulp
                .src(source)
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(rename(function (path) {
                    var filename = String(path.basename);
                    filename = filename.replace('-compiled', '');
                    path.basename = filename;
                    //prefix: '', suffix: '',extname: '.md'
                }))
                .pipe(size({showFiles: true, showTotal: false}))
                .pipe(gulp.dest(paths.output_build + 'js/'));
        });
    },
    css: function () {
        var name = 'build-css';
        tasks_build.css.push(name);

        gulp.task(name, function () {
            return gulp
                .src(paths.src.css)
                .pipe(concat('player.css'))
                .pipe(autoprefixer(['last 2 versions'], {cascade: true}))
                .pipe(minifycss())
                .pipe(rename(function (path) {
                    path.dirname += '/assets';
                }))
                .pipe(gulp.dest(paths.output_build));
        });
    },
    sprite: function () {
        var name = 'build-sprite';
        tasks_build.sprite.push(name);

        gulp.task(name, function () {
            return gulp
                .src(paths.src.sprite)
                .pipe(svgmin({
                    plugins: [{
                        removeDesc: true
                    }]
                }))
                .pipe(svgstore())
                .pipe(rename(function (path) {
                    path.dirname += '/assets';
                }))
                .pipe(gulp.dest(paths.output_build));
        });
    },
    image: function () {
        var name = 'build-image';
        tasks_build.image.push(name);

        gulp.task(name, function () {
            return gulp
                .src(paths.src.image)
                .pipe(imagemin())
                .pipe(rename(function (path) {
                    path.dirname += '/assets';
                }))
                .pipe(gulp.dest(paths.output_build));
        });
    },
    html: function () {
        var name = 'build-html';
        tasks_build.html.push(name);

        gulp.task(name, function () {
            return gulp
                .src(paths.src.html)
                .pipe(gulp.dest(paths.output_build));
        });
    },
    template: function () {
        var name = 'build-template';
        tasks_build.template.push(name);

        gulp.task(name, function () {
            return gulp
                .src(paths.src.template)
                .pipe(hoganComplier('templates.js'), {
                    wrapper: false
                })
                .pipe(uglify({compress: false}))
                .pipe(rename(function (path) {
                    path.dirname += '/js/template';
                }))
                .pipe(size())
                .pipe(gulp.dest(paths.output_build));
        });
    }
};

build.js(config.build.js);
build.css();
build.sprite();
build.image();
build.html();
build.template();
//clean build dir
clean('build-clean', paths.output_build);
//code check
lint('build-lint', paths.output_build);
//watch for file change
gulp.task('build-watch', function () {
    gulp.watch(paths.src.js, tasks_build.js);
    gulp.watch(paths.src.css, tasks_build.css);
    gulp.watch(paths.src.sprite, tasks_build.sprite);
    gulp.watch(paths.src.image, tasks_build.image);
    gulp.watch(paths.src.templates, tasks_build.template);
    gulp.watch(paths.src.html, tasks_build.html);
});
//default build project
gulp.task('build', function () {
    run('build-clean', tasks_build.js, tasks_build.css, tasks_build.html, tasks_build.sprite, tasks_build.image, tasks_build.template, 'build-lint');
});

var tasks_release = {
    js: []
};

var release = {
    js: function (source, filename, taskname) {
        tasks_release.js.push(taskname);

        gulp.task(taskname, function () {
            return gulp
                .src(source)
                .pipe(concat(filename))
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(uglify({compress: false}))
                .pipe(size())
                .pipe(gulp.dest(paths.output_release));
        });
    }
};

release.js(config.release.js, 'main.js', 'release-js');
release.js(config.release.jsFlex, 'flex.js', 'release-jsFlex');

//clean build dir
clean('release-clean', paths.output_release);
//code check
lint('release-lint', paths.output_release);
//compress js

//concat main and template file
gulp.task('concat-js', function(){
    return gulp
        .src([paths.output_build + 'js/template/templates.js', paths.output_release + 'main.js'])
        .pipe(concat('main.js'))
        .pipe(size())
        .pipe(gulp.dest(paths.output_release));
});

gulp.task('release', function () {
    run('release-clean', tasks_release.js, 'concat-js', 'release-lint');
});
//compress lib
gulp.task('min-lib', function () {
    gulp.src(config.lib.js)
        .pipe(uglify())
        .pipe(gulp.dest(paths.output_release));
});
