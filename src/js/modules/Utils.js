/**
 * Utils
 */
define("modules/Utils",

	["jquery"],

	function ( $ ) {
		"use strict";

		var Utils = ( function () {

			if ( ! window.requestAnimationFrame ) {

				window.requestAnimationFrame = ( function () {

					return window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame ||
						function( callback ) {
							window.setTimeout( callback, 1000 / 60 );
						};

				} ) ();

			}

			function _checkBreakpoint() {

				var old_breakpoint = Utils.breakpoint;

				_setBreakpoint();

				if ( old_breakpoint !== Utils.breakpoint ) {
					$(window).trigger("breakpointChange", Utils.breakpoint );
					Utils.imageSwap();
				}

			}

			function _setBreakpoint() {

				var breakpoint = $("body").css("z-index");

				Utils.breakpoint = parseInt(breakpoint, 10);

			}

			function _getBreakpoints( breakpoint ) {

				var breakpointsToCheck = [];

				for ( var b = 0; b < Utils.breakpoints.length; b++ ) {

					if ( Utils.breakpoints[ b ] <= breakpoint ) {
						breakpointsToCheck.push( Utils.breakpoints[ b ]);
					}

				}

				return breakpointsToCheck;

			}

			return {

				rAF : window.requestAnimationFrame,
				breakpoint: 320,
				breakpoints: [ 1280,980,768,640,480,320 ],
				bps: {
					mobile: 320,
					mobile_w: 480,
					tablet: 640,
					tablet_w: 768,
					desktop: 980,
					desktop_w: 1280
				},

				init: function (){
					
					_setBreakpoint();

					$(window).resize( _checkBreakpoint );

				},

				preventDefault: function( event ) {

					try{
						event.preventDefault();
					}catch(err){}
					
				},

				getString: function ( object, prop ) {

					var result = "";

					if ( object.hasOwnProperty(prop) ){

						result = object[prop] === null ? "" : object[prop].trim();

					}

					return result;

				},

				getObj: function ( object, prop ) {

					var result = false;

					if ( object.hasOwnProperty(prop) ){

						result = object[prop] === null ? false : object[prop];

					}

					return result;

				},

				getUrlParameter: function( paramName, url ) {

					if ( ! url ) {
						url = window.location.search.substring(1);
					} else {
						url = url.slice(url.indexOf('?') + 1);
					}

					var urlVariables = url.split('&');

					for (var i = 0; i < urlVariables.length; i++) {

						var param = urlVariables[i].split('=');

						if ( param[0] == paramName ) {
							return ! param[1] ? true : param[1];
						}

					}

					return;

				},

				getIframe: function(url) {
					
					var embed = "https://www.youtube.com/embed/",
						id = Utils.getUrlParameter( "v", url ),
						iframe = $("<iframe/>",{
							"src" : embed + id,
							"frameborder" : 0,
							"allowfullscreen" : true
						});

					return iframe;

				},

				setDigits: function(myNumber){

					var padding = myNumber.toString().length > 2 ? myNumber.toString().length : 2 ;

					if( myNumber ){
						return ("0" + myNumber ).slice(-Math.abs(padding));
					}
				},

				imageLoader: function ( arr, callback ) {
					var newimages = [],
						loadedimages = 0,
						postaction = function () {};

					postaction = postaction=callback || postaction;

					arr = ( typeof arr !== "object") ? [ arr ] : arr;

					function imageloadpost ( image, loadedImage ) {
						loadedimages++;

						if ( typeof arr === "object" ) {
							image.setAttribute("src", loadedImage );
							$(image).removeClass('load');
						}

						if ( loadedimages == arr.length ) {
							postaction( newimages );
						}
					}

					for ( var i=0; i<arr.length; i++ ) {
						newimages[ i ] = new Image();

						if ( typeof arr === "object" ) {
							newimages[ i ].src = arr[ i ].getAttribute("data-src");
						} else {
							newimages[ i ].src = arr[ i ];
						}

						newimages[ i ].onload = imageloadpost( arr[ i ], newimages[ i ].src );
						newimages[ i ].onerror = imageloadpost( arr[ i ], newimages[ i ].src );
					}
				},

				imageSwap: function ( images ) {

					var swap, newImage;

					if ( ! images ) {
						images = $(".swap");
					}

					if ( images ) {

						images.each( function(){

							var $image = $(this),
								breakpointsToCheck = _getBreakpoints( $image.parent().width() );

							for ( var i = 0; i < breakpointsToCheck.length; i++ ) {

								if ( $image.attr("data-img-" + breakpointsToCheck[ i ] ) ) {
									swap = breakpointsToCheck[ i ];
									break;
								}

							}

							newImage = $image.attr("data-img-" + swap );

							if ( $image.hasClass("load") ) {
								$image.attr("data-src", newImage );
							} else {
								$image.attr("src", newImage );
							}


						});
					}
				}
				
			};

		})();

		window.utils = Utils;

		return Utils;
	}
);
