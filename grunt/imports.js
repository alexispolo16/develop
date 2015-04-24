require('colors');

module.exports = function(grunt) {
	'use strict';

	grunt.registerTask('importJS', 'Generate JS imports automatically', function() {
		// Common variables
		var src  = grunt.config.get('src_path') + '/js',
			dest = grunt.config.get('asset_path') + '/jsTemp';

		if (!grunt.file.exists(src + '/imports.json')) {
			grunt.fail.fatal("Javascript imports JSON file not found: '" + src + '/imports.json' + "'");
		}

		// Read 'imports.json' file and generate a list of valid, existing imports.
		var paths = [];
		var callbacks = {'_all': [], 'before': [], 'after': []};
		var data = grunt.file.readJSON(src + '/imports.json');
		for (var i = 0; i < data.length; i++) {
			var t = data[i];

			if (grunt.file.exists(src + '/' + t.path + '.js')) {
				paths.push(t.path);
				callbacks._all.push(t.name);

				if (t.load.length > 0) {
					callbacks[t.load].push(t.name + '.init();');
				}
			}
		}

		var tpl = 'define("main",["' + paths.join('","') + '"],function(' + callbacks._all.join(',') + '){' +
			'var a=function(){' + callbacks.after.join('') + '};$(function(){' + callbacks.before.join('') + '});' +
			'if(document.readyState==="complete"){a();}else{$(window).on("load",a);}});require(["main"]);';
		
		var filename = dest + '/main.js';

		try {
			grunt.file.write( filename, tpl );
			grunt.log.ok('Created ' + filename.cyan );
		} catch ( e ) {
			grunt.fail.fatal( ('Could not write ' + filename ).error );
		}
		
	});

};