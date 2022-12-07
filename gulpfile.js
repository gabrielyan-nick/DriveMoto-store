const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");

function cleanDist() {
  return del("dist");
}

function images() {
  return src("app/img/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/img"));
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function scripts() {
  return src([
    "node_modules/@glidejs/glide/dist/glide.js",
    "node_modules/nouislider/dist/nouislider.js",
    "app/js/modules/wNumb.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src([
    "node_modules/nouislider/dist/nouislider.css",
    "node_modules/@glidejs/glide/dist/css/glide.core.css",
    "node_modules/@glidejs/glide/dist/css/glide.theme.css",
    "app/css/normalize.css",
    "app/scss/style.scss",
  ])
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

function build() {
  return src(
    [
      "app/css/style.min.css",
      "app/fonts/**/*",
      "app/js/modules/**/*.js",
      "app/js/services/*.js",
      "app/js/main.min.js",
      "app/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.autoprefixer = autoprefixer;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
exports.default = parallel(browsersync, watching, scripts);
