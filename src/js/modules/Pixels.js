/**
 * Pixels
 */
define("modules/Pixels",

	[ "jquery", "three", "modules/Utils" ],

	function ( $, THREE, Utils ) {
		"use strict";

		var Pixels = ( function () {

			var $elem,
				w = 0, 
				h = 0,
				rAF = Utils.rAF,
				camera, scene, renderer,
				geometry, material, mesh;

			function _build () {

				// Scene
				scene = new THREE.Scene();

				// Camera
				_createCamera();

				// Geometry
				_createGeometry();

				// Lights
				_addLights();

				// Materials
				_addMaterials();
				
				// Mesh
				_addMesh();
				
				// render
				_addBg();

			}

			function _createCamera () {

				camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 100009);
				camera.position.z = 1000;
				camera.lookAt(new THREE.Vector3(0, 0, 0));

			}

			function _createGeometry () {

				geometry = new THREE.PlaneGeometry(2000, 2000, 20, 20);

				for ( var i = 0, v = geometry.vertices.length; i < v; i++ ) {
					geometry.vertices[i].z = -(25) + Math.random() * 50;
				}

				geometry.computeFaceNormals();

				_generateMorphTargets(geometry);

			}

			function _generateMorphTargets ( geometry ) {

				var vertices = [];

				for ( var i = 0, v = geometry.vertices.length; i < v; i++ ) {

					vertices.push(geometry.vertices[i].clone());
					vertices[vertices.length - 1].z = -25 + Math.random() * 50;

				}

				geometry.morphTargets.push({
					name: 'target1',
					vertices: vertices
				});

			}

			function _addLights () {

				var ambientLight = new THREE.AmbientLight(0x333333),
					directionalLight = new THREE.DirectionalLight(0xffffff);

				scene.add(ambientLight);

				directionalLight.position.set(-10, -10, 5).normalize();

				scene.add(directionalLight);

			}

			function _addMaterials () {

				material = new THREE.MeshBasicMaterial({
					color: 0xff0000,
				});
				
				material = new THREE.MeshPhongMaterial({
					color: '#1295AB',
					morphTargets: true,
					morphNormals: true,
					specular: '#7BAEBD',
					shading: THREE.FlatShading,
					emissive: '#006063',
					shininess: 100
				});

			}

			function _addMesh () {

				mesh = new THREE.Mesh(geometry, material);

				mesh.rotation.x = 60 * (Math.PI / 180);
				mesh.rotation.z = 45 * (Math.PI / 180);
				mesh.position.z = 100;

				scene.add(mesh);

			}

			function _addBg () {

				renderer = new THREE.WebGLRenderer({
					antialiasing: true
				});

				renderer.setSize( w, h );

				$(".site--header_bg").append(renderer.domElement);

			}

			function _render () {

				var time = Date.now() * 0.001;

				mesh.morphTargetInfluences[0] = (1 + Math.sin(4 * time)) / 2;
				 
				geometry.computeMorphNormals();

				mesh.rotation.z += 0.0002;
				renderer.render(scene, camera);

			}

			function _animate () {
				_render();
				rAF( _animate );
			}

			return {

				init: function ( $element, width, height ) {

					if ( ! $element || ! width || ! height ) { return; }

					$elem = $element;
					w = parseInt(width,10);
					h = parseInt(height,10);

					if ( ! $elem.length ) {
						return;
					}

					_build();
					_render();
					rAF( _animate );

				}

			};

		})();

		return Pixels;
	}
);
