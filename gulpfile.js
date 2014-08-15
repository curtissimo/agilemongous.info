var bowerFiles, clean, filter, gulp, jslint, rename, sass;

bowerFiles = require('main-bower-files');
clean = require('gulp-rimraf');
filter = require('gulp-filter');
gulp = require('gulp');
jslint = require('gulp-jslint');
rename = require('gulp-rename');
sass = require('gulp-sass');

gulp.task('bower-files', [ 'bower-files-js', 'bower-files-css' ]);

gulp.task('bower-files-js', function () {
  'use strict';
  return gulp.src(bowerFiles(), { base: './bower_components' })
    .pipe(filter('**/*.js'))
    .pipe(rename(function (p) {
      if (p.basename === 'require') {
        p.dirname = '.';
      }
      return p;
    }))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('bower-files-css', function () {
  'use strict';
  return gulp.src(bowerFiles())
    .pipe(filter('*.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build', [ 'jslint', 'bower-files', 'sass', 'html' ]);

gulp.task('clean', function () {
  'use strict';
  return gulp.src('./public')
    .pipe(clean());
});

gulp.task('default', [ 'build', 'watch' ]);

gulp.task('html', function () {
  'use strict';
  return gulp.src('./assets/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('jslint', [ 'jslint-client', 'jslint-server' ]);

gulp.task('jslint-client', [ 'js-move' ], function () {
  'use strict';
  var stream = gulp.src([ './public/js/site.js', './public/js/raf.js' ])
    .pipe(jslint({
      browser: true,
      indent: 2,
      predef: [ 'require', 'define' ]
    }));
  stream.on('error', function (e) {
    console.error(String(e));
  });
  return stream;
});

gulp.task('jslint-server', function () {
  'use strict';
  var stream = gulp.src([ './gulpfile.js' ])
    .pipe(jslint({
      node: true,
      indent: 2
    }));
  stream.on('error', function (e) {
    console.error(String(e));
  });
  return stream;
});

gulp.task('js-move', function () {
  'use strict';
  return gulp.src('./assets/js/*.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function () {
  'use strict';
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  'use strict';
  gulp.watch([ './gulpfile.js', './server.js' ], [ 'jslint-server' ]);
  gulp.watch([ './assets/js/*.js' ], [ 'jslint-client' ]);
  gulp.watch([ './assets/sass/*.scss' ], [ 'sass' ]);
  gulp.watch([ './assets/*.html' ], [ 'html' ]);
});
