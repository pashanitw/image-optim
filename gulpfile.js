/**
 * Created by space on 10/4/15.
 */
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var inlineSvg = require("gulp-inline-svg"),
    svgMin = require('gulp-svgmin');



gulp.task('default', function () {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},               // don't remove the viewbox atribute from the SVG
                {removeUselessStrokeAndFill: false},  // don't remove Useless Strokes and Fills
                {removeEmptyAttrs: false}
            ],
            use: [pngquant()],
            multipass: true,
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('dist/images'));
    // console.log("gulping")
});
gulp.task('responsive', function () {
    gulp.src('dist/images/**/*')
        .pipe(responsive({
            'hero.png': [{
                width: 100,
                suffix: '-100'
            }, {
                width: 100 * 2,
                suffix: '-100-2x'
            }],
            '*.png': [{
                width: 600,
                crop: true
            }]
        }))
        .pipe(gulp.dest('dist/responsive'));

});
gulp.task('zip', function() {
    gulp.src('./dist/**/*.css')
        .pipe(gzip())
        .pipe(gulp.dest('dist/zip'));
});
var gulp = require('gulp');
var base64 = require('gulp-base64-inline');

gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(base64('./'))
        .pipe(gulp.dest('css'));
});