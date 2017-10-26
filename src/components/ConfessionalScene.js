import React, { Component } from 'react';
import * as THREE from 'three';

var objLoader = require('three-obj-loader');

/*

This visualization is based (almost entirely) off of
https://threejs.org/examples/#webgl_postprocessing_godrays. Most of the code
here is copied wholesale from there.

*/

export default class ConfessionalScene extends Component {

  componentWillMount() {
    objLoader(THREE);
  }

  componentDidMount() {

      this.initConfessionalGodRays();

			var container;
			var camera, scene, renderer, materialDepth;

			var sphereMesh;

			var sunPosition = new THREE.Vector3( 0, 1000, -1000 );
			var screenSpacePosition = new THREE.Vector3();

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var postprocessing = { enabled : true };

			var orbitRadius = 200;

			var bgColor = 0x000;
			var sunColor = 0xfffcd3;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				//

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 3000 );
				camera.position.z = 350;

				scene = new THREE.Scene();

				//

				materialDepth = new THREE.MeshDepthMaterial();

				var materialScene = new THREE.MeshBasicMaterial( { color: 0x000000, shading: THREE.FlatShading } );

				// tree

				var loader = new THREE.OBJLoader();
				loader.load( "/models/grate.obj", function ( object ) {

					object.material = materialScene;
					object.position.set(0, 150, -150 );
					object.rotateX(90);
					object.scale.multiplyScalar( 3 );
					scene.add( object );

				} );

				renderer = new THREE.WebGLRenderer( { antialias: false } );
				renderer.setClearColor( bgColor );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				renderer.autoClear = false;
				renderer.sortObjects = false;

				//

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				//

				initPostprocessing();

			}

			//

			function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			//

			function initPostprocessing() {

				postprocessing.scene = new THREE.Scene();

				postprocessing.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
				postprocessing.camera.position.z = 100;

				postprocessing.scene.add( postprocessing.camera );

				var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
				postprocessing.rtTextureColors = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );

				// Switching the depth formats to luminance from rgb doesn't seem to work. I didn't
				// investigate further for now.
				// pars.format = THREE.LuminanceFormat;

				// I would have this quarter size and use it as one of the ping-pong render
				// targets but the aliasing causes some temporal flickering

				postprocessing.rtTextureDepth = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );

				// Aggressive downsize god-ray ping-pong render targets to minimize cost

				var w = window.innerWidth / 4.0;
				var h = window.innerHeight / 4.0;
				postprocessing.rtTextureGodRays1 = new THREE.WebGLRenderTarget( w, h, pars );
				postprocessing.rtTextureGodRays2 = new THREE.WebGLRenderTarget( w, h, pars );

				// god-ray shaders

				var godraysGenShader = THREE.ShaderGodRays[ "godrays_generate" ];
				postprocessing.godrayGenUniforms = THREE.UniformsUtils.clone( godraysGenShader.uniforms );
				postprocessing.materialGodraysGenerate = new THREE.ShaderMaterial( {

					uniforms: postprocessing.godrayGenUniforms,
					vertexShader: godraysGenShader.vertexShader,
					fragmentShader: godraysGenShader.fragmentShader

				} );

				var godraysCombineShader = THREE.ShaderGodRays[ "godrays_combine" ];
				postprocessing.godrayCombineUniforms = THREE.UniformsUtils.clone( godraysCombineShader.uniforms );
				postprocessing.materialGodraysCombine = new THREE.ShaderMaterial( {

					uniforms: postprocessing.godrayCombineUniforms,
					vertexShader: godraysCombineShader.vertexShader,
					fragmentShader: godraysCombineShader.fragmentShader

				} );

				var godraysFakeSunShader = THREE.ShaderGodRays[ "godrays_fake_sun" ];
				postprocessing.godraysFakeSunUniforms = THREE.UniformsUtils.clone( godraysFakeSunShader.uniforms );
				postprocessing.materialGodraysFakeSun = new THREE.ShaderMaterial( {

					uniforms: postprocessing.godraysFakeSunUniforms,
					vertexShader: godraysFakeSunShader.vertexShader,
					fragmentShader: godraysFakeSunShader.fragmentShader

				} );

				postprocessing.godraysFakeSunUniforms.bgColor.value.setHex( bgColor );
				postprocessing.godraysFakeSunUniforms.sunColor.value.setHex( sunColor );

				postprocessing.godrayCombineUniforms.fGodRayIntensity.value = 0.1;

				postprocessing.quad = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight ),
					postprocessing.materialGodraysGenerate
				);
				postprocessing.quad.position.z = -9900;
				postprocessing.scene.add( postprocessing.quad );

			}

			function animate() {

				requestAnimationFrame( animate, renderer.domElement );

				render();

			}

			function render() {

				var time = Date.now() / 4000;

				// sphereMesh.position.x = orbitRadius * Math.cos( time );
				// sphereMesh.position.z = orbitRadius * Math.sin( time ) - 100;


				camera.position.x += ( mouseX - camera.position.x ) * 0.0036;
				camera.position.y += ( - ( mouseY ) - camera.position.y ) * 0.0036;

				camera.lookAt( scene.position );

				if ( postprocessing.enabled ) {

					// Find the screenspace position of the sun

					screenSpacePosition.copy( sunPosition ).project( camera );

					screenSpacePosition.x = ( screenSpacePosition.x + 1 ) / 2;
					screenSpacePosition.y = ( screenSpacePosition.y + 1 ) / 3;

					// Give it to the god-ray and sun shaders

					postprocessing.godrayGenUniforms[ "vSunPositionScreenSpace" ].value.x = screenSpacePosition.x;
					postprocessing.godrayGenUniforms[ "vSunPositionScreenSpace" ].value.y = screenSpacePosition.y;

					postprocessing.godraysFakeSunUniforms[ "vSunPositionScreenSpace" ].value.x = screenSpacePosition.x;
					postprocessing.godraysFakeSunUniforms[ "vSunPositionScreenSpace" ].value.y = screenSpacePosition.y;

					// -- Draw sky and sun --

					// Clear colors and depths, will clear to sky color

					renderer.clearTarget( postprocessing.rtTextureColors, true, true, false );

					// Sun render. Runs a shader that gives a brightness based on the screen
					// space distance to the sun. Not very efficient, so i make a scissor
					// rectangle around the suns position to avoid rendering surrounding pixels.

					var sunsqH = 0.74 * window.innerHeight; // 0.74 depends on extent of sun from shader
					var sunsqW = 0.74 * window.innerHeight; // both depend on height because sun is aspect-corrected

					screenSpacePosition.x *= window.innerWidth;
					screenSpacePosition.y *= window.innerHeight;

					renderer.setScissor( screenSpacePosition.x - sunsqW / 2, screenSpacePosition.y - sunsqH / 2, sunsqW, sunsqH );
					renderer.setScissorTest( true );

					postprocessing.godraysFakeSunUniforms[ "fAspect" ].value = window.innerWidth / window.innerHeight;

					postprocessing.scene.overrideMaterial = postprocessing.materialGodraysFakeSun;
					renderer.render( postprocessing.scene, postprocessing.camera, postprocessing.rtTextureColors );

					renderer.setScissorTest( false );

					// -- Draw scene objects --

					// Colors

					scene.overrideMaterial = null;
					renderer.render( scene, camera, postprocessing.rtTextureColors );

					// Depth

					scene.overrideMaterial = materialDepth;
					renderer.render( scene, camera, postprocessing.rtTextureDepth, true );

					// -- Render god-rays --

					// Maximum length of god-rays (in texture space [0,1]X[0,1])

					var filterLen = 1.0;

					// Samples taken by filter

					var TAPS_PER_PASS = 6.0;

					// Pass order could equivalently be 3,2,1 (instead of 1,2,3), which
					// would start with a small filter support and grow to large. however
					// the large-to-small order produces less objectionable aliasing artifacts that
					// appear as a glimmer along the length of the beams

					// pass 1 - render into first ping-pong target

					var pass = 1.0;
					var stepLen = filterLen * Math.pow( TAPS_PER_PASS, -pass );

					postprocessing.godrayGenUniforms[ "fStepSize" ].value = stepLen;
					postprocessing.godrayGenUniforms[ "tInput" ].value = postprocessing.rtTextureDepth.texture;

					postprocessing.scene.overrideMaterial = postprocessing.materialGodraysGenerate;

					renderer.render( postprocessing.scene, postprocessing.camera, postprocessing.rtTextureGodRays2 );

					// pass 2 - render into second ping-pong target

					pass = 2.0;
					stepLen = filterLen * Math.pow( TAPS_PER_PASS, -pass );

					postprocessing.godrayGenUniforms[ "fStepSize" ].value = stepLen;
					postprocessing.godrayGenUniforms[ "tInput" ].value = postprocessing.rtTextureGodRays2.texture;

					renderer.render( postprocessing.scene, postprocessing.camera, postprocessing.rtTextureGodRays1  );

					// pass 3 - 1st RT

					pass = 3.0;
					stepLen = filterLen * Math.pow( TAPS_PER_PASS, -pass );

					postprocessing.godrayGenUniforms[ "fStepSize" ].value = stepLen;
					postprocessing.godrayGenUniforms[ "tInput" ].value = postprocessing.rtTextureGodRays1.texture;

					renderer.render( postprocessing.scene, postprocessing.camera , postprocessing.rtTextureGodRays2  );

					// final pass - composite god-rays onto colors

					postprocessing.godrayCombineUniforms["tColors"].value = postprocessing.rtTextureColors.texture;
					postprocessing.godrayCombineUniforms["tGodRays"].value = postprocessing.rtTextureGodRays2.texture;

					postprocessing.scene.overrideMaterial = postprocessing.materialGodraysCombine;

					renderer.render( postprocessing.scene, postprocessing.camera );
					postprocessing.scene.overrideMaterial = null;

				} else {

					renderer.clear();
					renderer.render( scene, camera );

				}

			}

  }

  initConfessionalGodRays() {

    THREE.ShaderGodRays = {

      /**
       * The god-ray generation shader.
       *
       * First pass:
       *
       * The input is the depth map. I found that the output from the
       * THREE.MeshDepthMaterial material was directly suitable without
       * requiring any treatment whatsoever.
       *
       * The depth map is blurred along radial lines towards the "sun". The
       * output is written to a temporary render target (I used a 1/4 sized
       * target).
       *
       * Pass two & three:
       *
       * The results of the previous pass are re-blurred, each time with a
       * decreased distance between samples.
       */

      'godrays_generate': {

        uniforms: {

          tInput: {
            value: null
          },
          fStepSize: {
            value: 1.0
          },
          vSunPositionScreenSpace: {
            value: new THREE.Vector2( 0.5, 0.5 )
          }

        },

        vertexShader: [

          "varying vec2 vUv;",

          "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

          "}"

        ].join( "\n" ),

        fragmentShader: [

          "#define TAPS_PER_PASS 6.0",

          "varying vec2 vUv;",

          "uniform sampler2D tInput;",

          "uniform vec2 vSunPositionScreenSpace;",
          "uniform float fStepSize;", // filter step size

          "void main() {",

            // delta from current pixel to "sun" position

            "vec2 delta = vSunPositionScreenSpace - vUv;",
            "float dist = length( delta );",

            // Step vector (uv space)

            "vec2 stepv = fStepSize * delta / dist;",

            // Number of iterations between pixel and sun

            "float iters = dist/fStepSize;",

            "vec2 uv = vUv.xy;",
            "float col = 0.0;",

            // This breaks ANGLE in Chrome 22
            //	- see http://code.google.com/p/chromium/issues/detail?id=153105

            /*
            // Unrolling didnt do much on my hardware (ATI Mobility Radeon 3450),
            // so i've just left the loop

            "for ( float i = 0.0; i < TAPS_PER_PASS; i += 1.0 ) {",

              // Accumulate samples, making sure we dont walk past the light source.

              // The check for uv.y < 1 would not be necessary with "border" UV wrap
              // mode, with a black border colour. I don't think this is currently
              // exposed by three.js. As a result there might be artifacts when the
              // sun is to the left, right or bottom of screen as these cases are
              // not specifically handled.

              "col += ( i <= iters && uv.y < 1.0 ? texture2D( tInput, uv ).r : 0.0 );",
              "uv += stepv;",

            "}",
            */

            // Unrolling loop manually makes it work in ANGLE

            "if ( 0.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
            "uv += stepv;",

            "if ( 1.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
            "uv += stepv;",

            "if ( 2.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
            "uv += stepv;",

            "if ( 3.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
            "uv += stepv;",

            "if ( 4.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
            "uv += stepv;",

            "if ( 5.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r;",
            "uv += stepv;",

            // Should technically be dividing by 'iters', but 'TAPS_PER_PASS' smooths out
            // objectionable artifacts, in particular near the sun position. The side
            // effect is that the result is darker than it should be around the sun, as
            // TAPS_PER_PASS is greater than the number of samples actually accumulated.
            // When the result is inverted (in the shader 'godrays_combine', this produces
            // a slight bright spot at the position of the sun, even when it is occluded.

            "gl_FragColor = vec4( col/TAPS_PER_PASS );",
            "gl_FragColor.a = 1.0;",

          "}"

        ].join( "\n" )

      },

      /**
       * Additively applies god rays from texture tGodRays to a background (tColors).
       * fGodRayIntensity attenuates the god rays.
       */

      'godrays_combine': {

        uniforms: {

          tColors: {
            value: null
          },

          tGodRays: {
            value: null
          },

          fGodRayIntensity: {
            value: 0.3
          },

          vSunPositionScreenSpace: {
            value: new THREE.Vector2( 0.5, 0.5 )
          }

        },

        vertexShader: [

          "varying vec2 vUv;",

          "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

          "}"

          ].join( "\n" ),

        fragmentShader: [

          "varying vec2 vUv;",

          "uniform sampler2D tColors;",
          "uniform sampler2D tGodRays;",

          "uniform vec2 vSunPositionScreenSpace;",
          "uniform float fGodRayIntensity;",

          "void main() {",

            // Since THREE.MeshDepthMaterial renders foreground objects white and background
            // objects black, the god-rays will be white streaks. Therefore value is inverted
            // before being combined with tColors

            "gl_FragColor = texture2D( tColors, vUv ) + fGodRayIntensity * vec4( 1.0 - texture2D( tGodRays, vUv ).r );",
            "gl_FragColor.a = 1.0;",

          "}"

        ].join( "\n" )

      },


      /**
       * A dodgy sun/sky shader. Makes a bright spot at the sun location. Would be
       * cheaper/faster/simpler to implement this as a simple sun sprite.
       */

      'godrays_fake_sun': {

        uniforms: {

          vSunPositionScreenSpace: {
            value: new THREE.Vector2( 0.5, 0.5 )
          },

          fAspect: {
            value: 1.0
          },

          sunColor: {
            value: new THREE.Color( 0xffee00 )
          },

          bgColor: {
            value: new THREE.Color( 0x000000 )
          }

        },

        vertexShader: [

          "varying vec2 vUv;",

          "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

          "}"

        ].join( "\n" ),

        fragmentShader: [

          "varying vec2 vUv;",

          "uniform vec2 vSunPositionScreenSpace;",
          "uniform float fAspect;",

          "uniform vec3 sunColor;",
          "uniform vec3 bgColor;",

          "void main() {",

            "vec2 diff = vUv - vSunPositionScreenSpace;",

            // Correct for aspect ratio

            "diff.x *= fAspect;",

            "float prop = clamp( length( diff ) / 0.5, 0.0, 1.0 );",
            "prop = 0.35 * pow( 1.0 - prop, 3.0 );",

            "gl_FragColor.xyz = mix( sunColor, bgColor, 1.0 - prop );",
            "gl_FragColor.w = 1.0;",

          "}"

        ].join( "\n" )

      }

    };
  }

  render() {
    return(
      <div />
    );
  }

}
