var srcIconPath   = "<%= src_path %>/icons/*.svg",
	distFontPath   = "<%= asset_path %>/fonts",
	distCssPath    = "<%= asset_path %>/scss/global";

module.exports = {

	icons: {
		src: srcIconPath,
		dest: distFontPath,
		destCss: distCssPath,
		options: {
			rename: function ( name ) {
				"use strict";
				var iconClassName, removePath;
				iconClassName = name.toLowerCase();
				// name is adding the entire path to the font and not just the filename.
				// finding the last slash and only printing what is after it. There's probably a better way to do this.
				removePath = iconClassName.lastIndexOf("/");
				iconClassName = iconClassName.substr( ( removePath + 1 ) );
				return iconClassName;
			},
			engine: "node",
			font: "icons",
			hashes: false,
			stylesheet: "scss",
			relativeFontPath: "/assets/fonts",
			htmlDemo: false,
			templateOptions: {
				baseClass: "icon",
				classPrefix: "icon-"
			}
		}
	}
};
