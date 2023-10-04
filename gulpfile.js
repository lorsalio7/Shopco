const { src, dest } = require("gulp");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const del = require('del');
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const pug = require("gulp-pug");
const babel = require("gulp-babel");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const fs = require("fs");
const fileinclude = require("gulp-file-include");
const gulpAvif = require("gulp-avif");
const webp = require("gulp-webp");

// ================================== Functions ===================================================

function fonts() {
  return src("app/fonts/**")
  .pipe(dest("dist/fonts/"))
  .pipe(browsersync.stream())
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000,
    notify: false
  })
}

function gulpPug() {
  return src("app/pug/pages/**/*.pug")
  .pipe(pug({
    pretty: true,
    locals: {
      pugData: JSON.parse(fs.readFileSync("app/pug/pug-data.json", "utf-8"))
    }
  }))
  .pipe(dest("./dist/"))
  .pipe(browsersync.stream())
}

function cssLibs() {
  let filesCssLibs = fs.readdirSync("app/css_libs/");
  if(filesCssLibs.length > 0) {
    return src("app/css_libs/**")
    .pipe(dest("dist/libs/css"))
    .pipe(browsersync.stream())
  } else {
    return
  }
}

function jsLibs() {
  let filesJsLibs = fs.readdirSync("app/js_libs/");
  if(filesJsLibs.length > 0) {
    return src("app/js_libs/**")
    .pipe(dest("dist/libs/js"))
    .pipe(browsersync.stream())
  } else {
    return
  }
}

function css() {
  return src("app/scss/styles.scss")
  .pipe(
    scss({
      outputStyle: "expanded"
    })
  )
  .pipe(
    group_media()
  )
  .pipe(
    autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 5 versions"],
      cascade: true
    })
  )
  .pipe(dest("dist/css/"))
  .pipe(clean_css())
  .pipe(
    rename({
      extname: ".min.css"
    })
  )
  .pipe(dest("dist/css/"))
  .pipe(browsersync.stream())
}

function js() {
  return src("app/js/script.js")
  .pipe(fileinclude({
    prefix: "@@",
    basepath: "@file"
  }))
  .pipe(babel({
    presets: ["@babel/preset-env"]
  }))
  .pipe(dest("dist/js/"))
  .pipe(
    uglify()
  )
  .pipe(
    rename({
      extname: ".min.js"
    })
  )
  .pipe(dest("dist/js/"))
  .pipe(browsersync.stream())
}

// function avifWebp() {
//   return src("app/img/*.{jpg,png,jpeg}")
//   .pipe(newer("dist/img/"))
//   .pipe(gulpAvif({
//     quality: 50
//   }))
//   .pipe(src("app/img/*.{jpg,png,jpeg}"))
//   .pipe(webp({quality: 90}))
//   .pipe(dest("dist/img/"))
// }

function images() {
  return src("app/img/**")
  .pipe(newer("dist/img/"))
  .pipe(
    imagemin([
      imagemin.gifsicle({interlaced: true}),
      pngquant({quality: [0.7, 0.9]}),
      imagemin.mozjpeg({quality: 85, progressive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ])
  )
  .pipe(dest("dist/img"))
  .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch(["app/pug/**/*.pug"], gulpPug);
  gulp.watch(["app/pug/pug-data.json"], gulpPug);
  gulp.watch(["app/scss/**/*.scss"], css);
  gulp.watch(["app/js/**/*.js"], js);
  gulp.watch(["app/img/**"], images);
  // gulp.watch(["app/img/*.{png,jpg,jpeg}"], avifWebp);
  gulp.watch(["app/css_libs/**"], cssLibs);
  gulp.watch(["app/js_libs/**"], jsLibs);
}

function clean() {
  return del(
    "dist/*.html",
    "dist/css/",
    "dist/js/",
    "dist/img/"
  )
}

let build = gulp.series(clean, gulp.parallel(gulpPug, css, images, js, cssLibs, jsLibs));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.pug = gulpPug;
exports.fonts = fonts;
exports.images = images;
// exports.gulpAvif = avifWebp;
// exports.webp = avifWebp;
exports.js = js;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;
