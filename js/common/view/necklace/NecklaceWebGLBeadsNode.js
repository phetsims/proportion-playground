// Copyright 2014-2015, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var ShaderProgram = require( 'SCENERY/util/ShaderProgram' );
  var Util = require( 'SCENERY/util/Util' );
  var WebGLNode = require( 'SCENERY/nodes/WebGLNode' );
  var ContextLossFailureDialog = require( 'SCENERY_PHET/ContextLossFailureDialog' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );

  /**
   * @constructor
   * TODO: doc
   */
  function NecklaceWebGLBeadsNode( layoutProperty, options ) {
    WebGLNode.call( this, NecklaceBeadsPainter, {
      layerSplit: true // ensure we're on our own layer
    } );

    // @private {Property.<NecklaceLayout>} TODO check doc after refactor
    this.layoutProperty = layoutProperty;

    var invalidateListener = this.invalidatePaint.bind( this );
    layoutProperty.link( invalidateListener ); // TODO: disposal of this?

    var colorProperty = ProportionPlaygroundColorProfile.necklaceRoundBeadProperty;

    this.roundMainColorProperty = new DerivedProperty( [ colorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.1 );
    } );
    this.roundShadowColorProperty = new DerivedProperty( [ colorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.5 );
    } );
    this.roundHighlightColorProperty = new DerivedProperty( [ colorProperty ], function( color ) {
      return color.colorUtilsBrighter( 0.5 );
    } );
    this.roundBackgroundColorProperty = new DerivedProperty( [ colorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.6 );
    } );

    // TODO: invalidatePaint on color changes

    this.mutate( options );
  }

  proportionPlayground.register( 'NecklaceWebGLBeadsNode', NecklaceWebGLBeadsNode );

  inherit( WebGLNode, NecklaceWebGLBeadsNode, {}, {
    dispose: function() {
      // TODO?
    }
  } );

  /**
   * @constructor
   *
   * @param {WebGLRenderingContext} gl
   * @param {NecklaceWebGLBeadsNode} node
   */
  function NecklaceBeadsPainter( gl, node ) {
    this.gl = gl;
    this.node = node;

    // TODO: add varyings
    var vertexShaderSource = [
      'attribute vec2 aPosition;',
      'uniform mat3 uModelViewMatrix;',
      'uniform mat3 uProjectionMatrix;',
      'varying vec2 vView;',
      '',
      'void main( void ) {',
      // homogeneous model-view transformation
      '  vec3 view = uModelViewMatrix * vec3( aPosition.xy, 1 );',
      // homogeneous map to to normalized device coordinates
      '  vec3 ndc = uProjectionMatrix * vec3( view.xy, 1 );',
      // Set the varying correctly
      '  vView = aPosition.xy;',
      // ?
      '  gl_Position = vec4( ndc.xy, 1.0, 1.0 );',
      '}'
    ].join( '\n' );

    var roundFragmentShaderSource = [
      'precision mediump float;',
      'uniform float uNumBeads;',
      'uniform float uRadius;',
      'uniform float uPixelScale;',
      'uniform vec2 uBead0;',
      'uniform vec3 uHighlight;',
      'uniform vec3 uMain;',
      'uniform vec3 uShadow;',
      'uniform vec3 uBackground;',
      'varying vec2 vView;',
      '',
      'void main( void ) {',
      '  gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );',
      '  float dOff = 0.0;',
      '  float d0 = ( length( vView - uBead0 ) - uRadius ) * uPixelScale;',
      '  float s0 = ( length( vView - uBead0 - uRadius / 15.0 ) - uRadius * 1.02 ) * uPixelScale;',
      // "Shadow" background
      '  if ( uNumBeads >= 1.0 && s0 <= 0.5 ) {',
      '    gl_FragColor = vec4( uBackground, clamp( 0.5 - s0, 0.0, 1.0 ) );',
      '  }',
      '  if ( uNumBeads >= 1.0 && d0 <= 0.5 ) {',
      // TODO: fix alpha blending in both locations, so potentially do the shadow first
      '    float colorAlpha = clamp( 0.5 - d0, 0.0, 1.0 );',
      '    float resultAlpha = colorAlpha + ( 1.0 - colorAlpha ) * gl_FragColor.a;',
      '    dOff = clamp( 0.5 * length( ( vView - uBead0 ) / uRadius + 0.3 ), 0.0, 1.0 );',
      '    vec3 color;',
      '    if ( dOff > 0.5 ) {',
      '      color = mix( uMain, uShadow, dOff * 2.0 - 1.0 );',
      '    } else {',
      '      color = mix( uHighlight, uMain, dOff * 2.0 );',
      '    }',
      '    gl_FragColor.rgb = mix( gl_FragColor.rgb, color, colorAlpha );',
      '    gl_FragColor.a = resultAlpha;',
      '  }',
      '}'
    ].join( '\n' );

    this.shaderProgram = new ShaderProgram( gl, vertexShaderSource, roundFragmentShaderSource, {
      attributes: [ 'aPosition' ],
      uniforms: [ 'uModelViewMatrix', 'uProjectionMatrix', 'uRadius', 'uPixelScale', 'uHighlight', 'uMain', 'uShadow', 'uBackground', 'uNumBeads', 'uBead0' ]
    } );

    this.vertexBuffer = gl.createBuffer();

    var canvasBounds = this.node.getCanvasBounds();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [
        canvasBounds.minX, canvasBounds.minY, 0.2,
        canvasBounds.maxX, canvasBounds.minY, 0.2,
        canvasBounds.minX, canvasBounds.maxY, 0.2,
        canvasBounds.maxX, canvasBounds.maxY, 0.2
      ] ), gl.STATIC_DRAW );

    this.contextLossListener = function( event ) {
      event.preventDefault();

      // TODO: import?
      new ContextLossFailureDialog().show();

      if ( document.domain === 'phet.colorado.edu' ) {
        window._gaq && window._gaq.push( [ '_trackEvent', 'WebGL Context Loss', 'neuron' + phet.joist.sim.version, document.URL ] );
      }
    };

    // set up a handler for context loss - this will just put up a dialog, better handling may exist eventually
    gl.canvas.addEventListener( 'webglcontextlost', this.contextLossListener );
  }

  inherit( Object, NecklaceBeadsPainter, {
    paint: function( modelViewMatrix, projectionMatrix ) {
      var gl = this.gl;

      // TODO: can we do this at any other time?
      // TODO: maybe just cache round/square count and only change if those changed
      var layout = this.node.layoutProperty.value;
      var translation = layout.containerTranslation;

      this.shaderProgram.use();

      gl.uniformMatrix3fv( this.shaderProgram.uniformLocations.uModelViewMatrix, false, modelViewMatrix.entries );
      gl.uniformMatrix3fv( this.shaderProgram.uniformLocations.uProjectionMatrix, false, projectionMatrix.entries );
      gl.uniform1f( this.shaderProgram.uniformLocations.uRadius, ProportionPlaygroundConstants.BEAD_DIAMETER / 2 );
      gl.uniform1f( this.shaderProgram.uniformLocations.uPixelScale, modelViewMatrix.getScaleVector().x * projectionMatrix.getScaleVector().x * gl.canvas.width * Util.backingScale( gl ) );
      gl.uniform3f( this.shaderProgram.uniformLocations.uHighlight, this.node.roundHighlightColorProperty.value.red / 255,
                                                                    this.node.roundHighlightColorProperty.value.green / 255,
                                                                    this.node.roundHighlightColorProperty.value.blue / 255 );
      gl.uniform3f( this.shaderProgram.uniformLocations.uMain, this.node.roundMainColorProperty.value.red / 255,
                                                               this.node.roundMainColorProperty.value.green / 255,
                                                               this.node.roundMainColorProperty.value.blue / 255 );
      gl.uniform3f( this.shaderProgram.uniformLocations.uShadow, this.node.roundShadowColorProperty.value.red / 255,
                                                                 this.node.roundShadowColorProperty.value.green / 255,
                                                                 this.node.roundShadowColorProperty.value.blue / 255 );
      gl.uniform3f( this.shaderProgram.uniformLocations.uBackground, this.node.roundBackgroundColorProperty.value.red / 255,
                                                                     this.node.roundBackgroundColorProperty.value.green / 255,
                                                                     this.node.roundBackgroundColorProperty.value.blue / 255 );
      gl.uniform1f( this.shaderProgram.uniformLocations.uNumBeads, layout.roundBeads.length );
      if ( layout.roundBeads.length ) {
        gl.uniform2f( this.shaderProgram.uniformLocations.uBead0, layout.roundBeads[ 0 ].center.x + translation.x,
                                                                  layout.roundBeads[ 0 ].center.y + translation.y );
      }

      gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
      gl.vertexAttribPointer( this.shaderProgram.attributeLocations.aPosition, 3, gl.FLOAT, false, 0, 0 );

      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

      this.shaderProgram.unuse();

      return WebGLNode.PAINTED_SOMETHING;
    },

    dispose: function() {
      this.shaderProgram.dispose();
      this.gl.deleteBuffer( this.vertexBuffer );

      this.shaderProgram = null;

      // After we are disposed, we don't care about context loss
      this.gl.canvas.removeEventListener( 'webglcontextlost', this.contextLossListener );
    }
  } );

  return NecklaceWebGLBeadsNode;
} );
