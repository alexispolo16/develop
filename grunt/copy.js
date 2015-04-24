module.exports = function( ){
	"use strict";

	var srcPath = "<%= src_path %>",
		distPath = "<%= asset_path %>";

	return {

		libs : {
			expand: true,
			flatten: true,
			cwd: srcPath,
			src: "libs/*",
			dest: distPath + "/libs"
		},

		fonts: {
			expand: true,
			flatten: true,
			cwd: srcPath,
			src: [ "fonts/*", "fonts/**/*"],
			filter: 'isFile',
			dest: distPath + "/fonts"
		},

		images: {
			expand: true,
			flatten: false,
			cwd: srcPath,
			src: ["images/*","images/**/*"],
			dest: distPath
		},

		scss : {
			expand: true,
			flatten: false,
			cwd: srcPath,
			src: ["scss/**"],
			dest: distPath
		},

		js : {
			expand: true,
			flatten: false,
			cwd: srcPath + "/js",
			src: ["**"],
			dest: distPath + "/jsTemp"
		}
	};
};
