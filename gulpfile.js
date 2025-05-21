import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpCssimport from 'gulp-cssimport'
import { deleteAsync } from 'del';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass'

const prepros = false;

const sass = gulpSass(sassPkg);

export const html = () => gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

export const js = () => gulp
    .src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());

    export const copy = () => gulp
        .src(['src/fonts/**/*',
            'src/img/**/*'],
            {
                base: 'src',
                encoding: false
            }
        )
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream({
            once: true
        }));

    export const style = () => {
        if (prepros) {
            return gulp
                .src('src/scss/**/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('dist/style'))
                .pipe(browserSync.stream());
        }
        return gulp
            .src('src/styles/style.css')
            .pipe(gulpCssimport({
                extensions: ['css']
            }))
            .pipe(gulp.dest('dist/styles'))
            .pipe(browserSync.stream());
    }

    export const clear = (done) => {
        deleteSync([path.dist.base], {
            force: true,
        });
        done();
    };

    export const server = () => {
        browserSync.init({
            ui: false,
            notify: false,
            // tunnel: true,
            server: {
                baseDir: 'dist'
            }
        });

        gulp.watch('./src/**/*.html', html);        
        gulp.watch('./src/js/**/*.js', js);
        gulp.watch(['src/fonts/**/*', 'src/img/**/*'], copy);
        gulp.watch(prepros ? 'src/style/**/*.scss' : './src/styles/**/*.css', style)
    };

    export const base = gulp.parallel(html, style, js, copy);

    export const build = gulp.series(clear, base);

    export default gulp.series(base, server);
