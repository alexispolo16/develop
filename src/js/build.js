require.config({

	paths:{
		underscore : "libs/underscore-min",
		hammer : "libs/hammer.min",
		three : "libs/three.min",
		"jquery" : "libs/jquery-1.11.0.min",
		"jquery.hammer" : "libs/jquery.hammer",
		"jquery.history" : "libs/jquery.history.min",
		"jquery.hotkeys" : "libs/jquery.hotkeys"
	},

	shim: {
		underscore : { exports: "_" },
		three : { exports: "THREE" },
		"jquery.hammer": ["jquery"],
		"jquery.history": ["jquery"],
		"jquery.hotkeys": ["jquery"]
	}

});
