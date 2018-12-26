const gulp = require('gulp');

const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// concatate css or js files
const useref = require('gulp-useref');

const uglify = require('gulp-uglify');

const cssnano = require('gulp-cssnano');

const imagemin = require('gulp-imagemin');

const cache = require('gulp-cache');

// deleted files that are no longer useed
const del = require('del');

// help run gulp tasks in sequence
const runSequence = require('run-sequence');

const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

const concat = require('gulp-concat');

const purgecss = require('gulp-purgecss');
// const svgSprite = require('gulp-svg-sprite');
const critical = require('critical');

gulp.task('critical', ['build'], () => {
  critical.generate({
    inline: true,
    base: 'dist/',
    src: 'index.html',
    dest: 'dist.index-critical.html',
    minify: true,
  });
});

gulp.task('toES6', () => {
  gulp
    .src('js/es6/index.js')
    .pipe(
      babel({
        presets: ['env'],
      }),
    )
    .pipe(gulp.dest('js'))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task('prefix', () => {
  gulp
    .src('style.css')
    .pipe(
      autoprefixer({
        browsers: ['last 10 version'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest(''));
});

gulp.task('clean:dist', () => {
  return del.sync('dist');
});

gulp.task('fonts', () => {
  return gulp.task('fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', () => {
  return gulp
    .src('images/**/*.+(png|jpg|gif|svg)')
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        }),
      ),
    )
    .pipe(gulp.dest('dist/images'));
});

gulp.task('useref', () => {
  return (
    gulp
      .src('*.html')
      .pipe(useref())
      // .pipe(gulpIf('js/*.js', uglify()))
      // .pipe(gulpIf('style.css', cssnano()))
      .pipe(gulp.dest('dist'))
  );
});

gulp.task('html', () => {
  return gulp.src('index.html').pipe(gulp.dest('dist'));
});

gulp.task('uglify', () => {
  return gulp
    .src('js/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('concat', () => {
  return gulp
    .src(['js/index.js'])
    .pipe(concat('js/all.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('minifycss', () => {
  return gulp
    .src('style.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
});

gulp.task('purgecss', () => {
  return gulp
    .src('dist/style.css')
    .pipe(
      purgecss({
        content: ['*.html'],
      }),
    )
    .pipe(gulp.dest('dist/'));
});

// gulp.task('svgsprite', () => {
//   return gulp
//     .src('images/*.svg')
//     .pipe(
//       svgSprite(
//         (config = {
//           mode: {
//             css: {
//               // Activate the «css» mode
//               render: {
//                 css: true, // Activate CSS output (with default options)
//               },
//             },
//           },
//         }),
//       ),
//     )
//     .pipe(gulp.dest('dist'));
// });

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: '../sketchbook/',
    },
  });
});

gulp.task('sass', () => {
  return gulp
    .src('sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task('watch', ['browserSync', 'sass', 'toES6'], () => {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['toES6']);
  gulp.watch('*.html', browserSync.reload);
});

gulp.task('build', callback => {
  runSequence(
    'clean:dist',
    ['sass', 'prefix', 'minifycss', 'concat', 'uglify', 'images', 'html'],
    callback,
  );
});

gulp.task('default', callback => {
  runSequence(['sass', 'toES6', 'browserSync', 'watch'], callback);
});
