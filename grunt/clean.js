
var cssPath = "<%= asset_path %>/css/",
	scssPath = "<%= asset_path %>/scss/",
	jsPath = "<%= asset_path %>/js/",
	jsTemp = "<%= asset_path %>/jsTemp/",
	imgPath = "<%= asset_path %>/images/",
	fontPath = "<%= asset_path %>/fonts/";

module.exports = {

	css : {
		src: [ cssPath ]
	},

	scss : {
		src: [ scssPath ]
	},

	js : {
		src: [ jsPath ]
	},

	jsTemp : {
		src: [ jsTemp ]
	},

	fonts : {
		src: [ fontPath ]
	},

	images : {
		src: [ imgPath ]
	},

};
