module.exports = function() {
	"use strict";
	
	var cssPath  = "<%= src_path %>/scss/**/*.scss",
		jsPath   = "<%= src_path %>/js/**/*.js";

	return {
		css: {
			files: cssPath,
			options: {
				livereload: true,
				livereloadOnError: false
			},
			tasks: [
				"clean:css",
				"copy:scss",
				"webfont",
				"compass:dev",
				"clean:scss"
			]
		},
		js: {
			files: jsPath,
			options: {
				livereload: true,
				livereloadOnError: false
			},
			tasks: [
				"newer:jshint",
				"clean:js",
				"copy:js",
				"jst",
				"importJS",
				"requirejs:dev",
				"clean:jsTemp"
			]
		}
	};
};
