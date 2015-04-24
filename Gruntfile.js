module.exports = function(grunt) {
	"use strict";

	var config, pre, post, compile;

	config = require('./config/get-themedir');
	config.pkg = grunt.file.readJSON('package.json');

	// Measures the time each task takes
	require('time-grunt')( grunt );

	// Load grunt config
	require('load-grunt-config')( grunt, { config: config } );

	pre = [ "clean","jshint","copy","webfont","jst","importJS" ];

	post = [ "clean:scss", "clean:jsTemp" ];

	compile = (function() {
		var env = grunt.option("env") || ( config.app_env == "development" ? "dev" : "prod" );

		if ( ["dev","prod"].indexOf( env ) < 0 ) {
			grunt.fail.fatal("Invalid env option " + env.cyan + " for app_env ".red + config.app_env.cyan );
		}

		var processes = [ "compass:" + env , "requirejs:" + env ];

		if ( ["prod"].indexOf( env ) >= 0 ) {
			processes.push("imagemin");
		}

		return processes;

	})();

	grunt.registerTask("build", pre.concat( compile ).concat( post ) );
	grunt.registerTask("default", ["build"] );
};
