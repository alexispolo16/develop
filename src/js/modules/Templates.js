/**
 * Templates
 */

define("modules/Templates",

	[ "jquery", "underscore", "modules/_Templates" ],

	function ( $, _, _Templates ) {
		"use strict";

		var Templates = ( function () {

			var templates = {
				"header" : {
					"logo" : "/assets/images/logo.png"
				}
			};

			function _renderTemplates( obj, deep ) {

				var placeholders =  $("[data-template]");

				if ( placeholders.length === 0 ) {
					return;
				}

				$.each( placeholders , function( index ) {
					
					var placeholder = $( placeholders[ index ] ),
						name = placeholder.attr("data-template");

					_renderTemplate( name , obj );

				});

				if ( deep ) {
					_renderTemplates( false, deep );
				}
				
			}

			function _renderTemplate( name , obj ) {

				if ( ! name ) {
					return;
				}

				var data = obj && typeof obj === "object" ? obj : false, 
					placeholder = $("[data-template=" + name + "]"),
					template;

				if ( ! data ) {
					data = templates.hasOwnProperty( name ) ? templates[ name ] : {}; 
				}

				template = _Templates[ name ]( data );

				if ( template ) {
					placeholder.html( $( template ).html() );
					placeholder.removeAttr("data-template");
				}

			}

			return {

				init: function () {

					_renderTemplates( false, true );

				},

				renderTemplate: _renderTemplate

			};

		})();

		return Templates;
	}
);
