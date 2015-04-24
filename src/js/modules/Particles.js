/**
 * Particles
 */
define("modules/Particles",

	[ "jquery", "modules/Pixels", "modules/Utils" ],

	function ( $, Pixels, Utils ) {
		"use strict";

		var Particles = ( function () {

			var $canvas,
				$header,
				$headerBg,
				ctx,
				particles = [],
				patriclesNum = 150,
				w = 2000,
				h = 250,
				colors = ['#FFFFFF','#1d5174','#333333','#b54719','#df8b26'],
				rAF = Utils.rAF;

			function _setCanvasSize () {

				var width = $header.width(),
					height = $header.height();

				$canvas.attr("width", width );
				$canvas.attr("height", height );

			}

			function _makeParticle () {

				var particle = {};

				particle.x =  Math.round( Math.random() * w );
				particle.y =  Math.round( Math.random() * h );
				particle.rad = Math.round( Math.random() * 1) + 1;
				particle.rgba = colors[ Math.round( Math.random() * 3) ];
				particle.vx = Math.round( Math.random() * 3) - 1.5;
				particle.vy = Math.round( Math.random() * 3) - 1.5;

				return particle;

			}

			function _render () {

				ctx.clearRect(0, 0, w, h);
				ctx.globalCompositeOperation = 'lighter';

				for ( var i = 0; i < patriclesNum; i++ ) {

					var temp = particles[i];
					var factor = 1;

					factor = _renderParticle( temp );

					_drawParticle( temp, factor );
					
					_resetPos( temp );

				}

			}

			function _renderParticle ( temp ) {

				var factor = 1;

				for ( var j = 0; j < patriclesNum; j++ ) {

					var temp2 = particles[j];
					ctx.linewidth = 0.5;

					if ( temp.rgba == temp2.rgba && _findDistance(temp, temp2) < 50 ) {

						ctx.strokeStyle = temp.rgba;
						ctx.beginPath();
						ctx.moveTo(temp.x, temp.y);
						ctx.lineTo(temp2.x, temp2.y);
						ctx.stroke();
						factor++;
					}
				}

				return factor;

			}

			function _drawParticle ( temp, factor ) {

				// Get colors
				ctx.fillStyle = temp.rgba;
				ctx.strokeStyle = temp.rgba;
				
				// Draw inner circle
				ctx.beginPath();
				ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
				ctx.fill();
				ctx.closePath();

				// Draw outer circle
				ctx.beginPath();
				ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
				ctx.stroke();
				ctx.closePath();

			}

			function _resetPos ( temp ) {

				temp.x += temp.vx;
				temp.y += temp.vy;
				
				if ( temp.x > w ) { 
					temp.x = 0;
				}

				if ( temp.x < 0 ) {
					temp.x = w;
				}

				if ( temp.y > h ) {
					temp.y = 0;
				}

				if ( temp.y < 0) {
					temp.y = h;
				}

			}

			function _findDistance ( p1, p2 ) {

				return Math.sqrt( Math.pow( p2.x - p1.x, 2 ) + Math.pow( p2.y - p1.y, 2 ) );

			}

			function _animate () {
				_render();
				rAF( _animate );
			}

			return {

				init: function () {

					$canvas = $(".site--header_particles");
					$header = $(".site--header");
					$headerBg = $(".site--header_bg");
					ctx = $canvas.length > 0 ? $canvas[0].getContext('2d') : false;

					if ( $headerBg.length ) {
						Pixels.init( $headerBg, w, h );
					}

					if ( ! ctx ) {
						return;
					}

					_setCanvasSize();

					for ( var i = 0; i < patriclesNum; i++ ) {
						particles.push( _makeParticle() );
					}

					$( window ).on("resize", _setCanvasSize );
					_render();
					rAF( _animate );

				}

			};

		})();

		return Particles;
	}
);
