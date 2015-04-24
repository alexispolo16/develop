var srcPath = "<%= src_path %>/js";

module.exports = {
	options: {
		jshintrc: srcPath + "/.jshintrc",
		ignores: [ srcPath + "/libs/*.js", srcPath + "/main.js" ]
	},
	gruntfile: {
		src: ["Gruntfile.js", "grunt/*.js"]
	},
	dev: {
		src: [ srcPath + "/**/*.js"]
	}
};
