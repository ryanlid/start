const { src, dest, task, series } = require("gulp");
const fileinclude = require("gulp-file-include");
const clean = require("gulp-clean");

const destination = "dist/";

task("clean", function() {
  return src(destination, { read: false, allowEmpty: true }).pipe(clean());
});

task(
  "default",
  series("clean", function(done) {
    src(["src/asset/**"]).pipe(dest(destination + "/asset/"));

    src(["src/*.css"]).pipe(dest(destination));

    src(["src/**/**.html"], { ignore: "src/components/*", nodir: true })
      .pipe(
        fileinclude({
          prefix: "@@",
          basepath: "@file",
          indent: true
        })
      )
      .pipe(dest(destination));
    done();
  })
);
