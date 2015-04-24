module.exports = function() {
	"use strict";

	var srcPath  = "<%= asset_path %>/jsTemp/",
		distPath = "<%= asset_path %>/js/";

	return {
		options: {
			name: "main",
			baseUrl: srcPath,
			mainConfigFile: srcPath + "build.js",
			out: distPath + "main.js",
			logLevel: 1
		},
		dev: {
			options: { optimize: 'none' }
		},
		prod: {
			options: { optimize: 'uglify2' }
		}
	};
};
