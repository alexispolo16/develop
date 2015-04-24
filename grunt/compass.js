module.exports = function( ){
	"use strict";

	var srcPath = "<%= asset_path %>/scss/",
		distPath = "<%= asset_path %>/css/";

	return {
		// Global Compass options
		options: {
			noLineComments: true,
			debugInfo: false,
			raw: "preferred_syntax = :scss\n",
			force: true
		},
		//Compass:dev build.. single file / expanded output
		dev: {
			options: {
				sassDir: srcPath,
				cssDir: distPath,
				outputStyle: "expanded"
			}
		},
		//Compass:prod build.. single file / compressed output
		prod: {
			options: {
				sassDir: srcPath,
				cssDir: distPath,
				outputStyle: "compressed"
			}
		}
	};
};
