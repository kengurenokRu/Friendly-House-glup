import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpCssimport from 'gulp-cssimport'
import { deleteAsync } from 'del';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass'
import htmlmin from 'gulp-htmlmin'
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import sourcesmap from 'gulp-sourcemaps';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp';
import gulpAvif from 'gulp-avif';
//import { stream as critical } from 'critical';
import gulpIf from 'gulp-if'


const prepros = true;

const sass = gulpSass(sassPkg);

const allJS = [
    "src/libs/jquery-3.7.1.min.js",
    "src/libs/inert.js",
    "src/libs/swiper-bundle.min.js",
    "src/libs/jquery-ui.min.js"
];

let dev = false;

export const html = () => gulp
    .src('src/*.html')
    .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

export const js = () => gulp
    .src([...allJS, 'src/js/**/*.js'])
    .pipe(gulpIf(dev, sourcesmap.init()))
    .pipe(terser())
    .pipe(concat('index.min.js'))
    .pipe(gulpIf(dev, sourcesmap.write('dist-maps')))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());

export const img = () => gulp.src('src/img/**/*.{jpg,jpeg,jfif,png,svg,gif}', { encoding: false })
    .pipe(gulpIf(!dev, gulpImg({
        optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
        pngquant: ['--speed=1', '--force', 256],
        zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
        jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
        mozjpeg: ['-optimize', '-progressive'],
        gifsicle: ['--optimize'],
        svgo: true
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
/*
export const critCSS = () => gulp.src('dist/*.html')
    .pipe(critical({
        base: 'dist/',
        inline: true,
        css: ['dist/styles/style.css']
    }))
    .on('error', err => { console.log(err.message) })
    .pipe(gulp.dest('dist'))*/

export const copy = () => gulp
    .src('src/fonts/**/*',
        {
            base: 'src',
            encoding: false
        }
    )
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({
        once: true
    }));

// export const style = () => {
//     if (prepros) {
//         return gulp
//             .src('src/styles/scss/**/*.scss')
//.pipe(gulpIf(dev, sourcesmap.init()))
//             .pipe(sass().on('error', sass.logError))
//.pipe(gulpIf(dev,sourcesmap.write('../maps'))
//             .pipe(gulp.dest('dist/styles'))
//             .pipe(browserSync.stream());
//     }
//     return gulp
//         .src('src/styles/style.css')
//.pipe(gulpIf(dev, sourcesmap.init())
//         .pipe(gulpCssimport({
//             extensions: ['css']
//         }))
//.pipe(gulpIf(dev,sourcesmap.write('../maps'))
//         .pipe(gulp.dest('dist/styles'))
//         .pipe(browserSync.stream());
// }


export const style = () => gulp
    .src('src/styles/scss/**/*.scss')
    .pipe(gulpIf(dev, sourcesmap.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
        2: {
            specialComments: 0
        }
    }))
    .pipe(gulpIf(dev, sourcesmap.write('../maps')))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());

export const css = () => gulp
    .src('src/styles/style.css')
    .pipe(gulpIf(dev, sourcesmap.init()))
    .pipe(gulpCssimport({
        extensions: ['css']
    }))
    .pipe(cleanCSS({
        2: {
            specialComments: 0
        }
    }))
    .pipe(gulpIf(dev, sourcesmap.write('../maps')))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());

export const webp = () => gulp.src('src/img/**/*.{jpg,jpeg,jfif,png}', { encoding: false })
    .pipe(gulpWebp({
        quality: 60
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());

export const avif = () => gulp.src('src/img/**/*.{jpg,jpeg,jfif,png}', { encoding: false })
    .pipe(gulpAvif({
        quality: 50
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());

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
    gulp.watch('src/fonts/**/*', copy);
    gulp.watch('src/img/**/*.{jpg,jpeg,jfif,png,svg,gif}', img);
    gulp.watch('src/img/**/*.{jpg,jpeg,jfif,png}', gulpWebp);
    gulp.watch('src/img/**/*.{jpg,jpeg,jfif,png}', gulpAvif);
    //  gulp.watch(prepros ? 'src/styles/**/*.scss' : './src/styles/**/*.css', style)

    gulp.watch('src/styles/**/*.scss', style);
    gulp.watch('./src/styles/**/*.css', css)
};

export const develop = async() =>{
    dev = true;
}

export const base = gulp.parallel(html, style, css, js, img, avif, webp, copy);

export const build = gulp.series(clear, base/*, critCSS*/);

export default gulp.series(develop, base, server);
