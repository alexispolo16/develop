module.exports = function( ){
	"use strict";

	var rootPath = "<%= root_path %>";

	return {

		compile : {
			options: {
				namespace: "Templates",
				amd : true,
				prettify: true,
				processName: function(filePath) {
					var pieces = filePath.split("/"),
						name = pieces[pieces.length - 1].replace('.html','');
					return name;
				}
			},
			files : {
				"assets/jsTemp/modules/_Templates.js" : [ rootPath + "/blocks/*.html", rootPath + "/blocks/**/*.html" ]
			}
		}

	};
};
