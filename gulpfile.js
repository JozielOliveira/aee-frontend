const dotenv = require('gulp-dotenv');
const gulp = require('gulp')
const gap = require('gulp-append-prepend')

gulp.task('licenses', async function () {
	await gulp
		.src('build/static/js/*chunk.js', {
			base: './'
		})
		.pipe(
			gap.prependText()
		)
		.pipe(gulp.dest('./', {
			overwrite: true
		}))

	await gulp
		.src('build/index.html', {
			base: './'
		})
		.pipe(
			gap.prependText()
		)
		.pipe(gulp.dest('./', {
			overwrite: true
		}))

	await gulp
		.src('build/static/css/*chunk.css', {
			base: './'
		})
		.pipe(
			gap.prependText()
		)
		.pipe(gulp.dest('./', {
			overwrite: true
		}))
	return
})

gulp.task('dotenv', function () {
	return gulp.src('.env')
		.pipe(dotenv())
		.pipe(rename('env.json'))
		.pipe(gulp.dest('dist'));
})
