var dir = "<%= asset_path %>/";

module.exports = {
	images: {
		options: {
			pngquant: true
		},
		files: [{
			expand: true,
			cwd: dir,
			src: ['**/*.{png,jpg,gif}'],
			dest: dir
		}]
	}
};
