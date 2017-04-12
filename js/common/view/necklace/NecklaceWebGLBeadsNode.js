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

    var roundColorProperty = ProportionPlaygroundColorProfile.necklaceRoundBeadProperty;
    var squareColorProperty = ProportionPlaygroundColorProfile.necklaceSquareBeadProperty;

    this.roundMainColorProperty = new DerivedProperty( [ roundColorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.1 );
    } );
    this.roundShadowColorProperty = new DerivedProperty( [ roundColorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.5 );
    } );
    this.roundHighlightColorProperty = new DerivedProperty( [ roundColorProperty ], function( color ) {
      return color.colorUtilsBrighter( 0.5 );
    } );
    this.roundBackgroundColorProperty = new DerivedProperty( [ roundColorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.6 );
    } );

    this.squareDark7ColorProperty = new DerivedProperty( [ squareColorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.7 );
    } );
    this.squareDark4ColorProperty = new DerivedProperty( [ squareColorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.4 );
    } );
    this.squareDark3ColorProperty = new DerivedProperty( [ squareColorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.3 );
    } );
    this.squareDark1ColorProperty = new DerivedProperty( [ squareColorProperty ], function( color ) {
      return color.colorUtilsDarker( 0.1 );
    } );
    this.squareColorProperty = squareColorProperty;
    this.squareBright3ColorProperty = new DerivedProperty( [ squareColorProperty ], function( color ) {
      return color.colorUtilsBrighter( 0.3 );
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

    var maxBeads = 20;
    var beadRange = _.range( 0, maxBeads );

    var fuzzNumber = '0.8';
    var roundFragmentShaderSource = [
      'precision mediump float;',
      'uniform float uNumBeads;',
      'uniform float uRadius;',
      'uniform float uPixelScale;',
      beadRange.map( function( n ) {
        return 'uniform vec2 uBead' + n + ';';
      } ).join( '\n' ),
      'uniform vec3 uHighlight;',
      'uniform vec3 uMain;',
      'uniform vec3 uShadow;',
      'uniform vec3 uBackground;',
      'varying vec2 vView;',
      '',
      'float distS( vec2 bead ) {',
      '  return ( length( vView - bead - uRadius / 15.0 ) - uRadius * 1.02 ) * uPixelScale * ' + fuzzNumber + ';',
      '}',
      'float distR( vec2 bead ) {',
      '  return ( length( vView - bead ) - uRadius ) * uPixelScale * ' + fuzzNumber + ';',
      '}',
      'float shadeOff( vec2 bead ) {',
      '  return clamp( 0.5 * length( ( vView - bead ) / uRadius + 0.3 ), 0.0, 1.0 );',
      '}',
      '',
      'void main( void ) {',
      '  gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );',

      // Shadow background
      '  float sDist;',

      beadRange.map( function( n ) {
        return [
          '  if ( uNumBeads >= ' + ( n + 1 ) + '.0 ) {',
          '    sDist = distS( uBead' + n + ' );',
          '    if ( sDist <= 0.5 ) {',
          '      gl_FragColor = vec4( uBackground, clamp( 0.5 - sDist, 0.0, 1.0 ) );',
          '    }',
          '  }' ].join( '\n' );
      } ).join( '\n' ),

      // Main distance
      '  float rDist;',
      '  float finalRDist;',
      '  float dOff;',
      '  float isHit = 0.0;',

      beadRange.map( function( n ) {
        return [
          '  if ( uNumBeads >= ' + ( n + 1 ) + '.0 ) {',
          '    rDist = distR( uBead' + n + ' );',
          '    if ( rDist <= 0.5 ) {',
          '      finalRDist = rDist;',
          '      isHit = 1.0;',
          '      dOff = shadeOff( uBead' + n + ' );',
          '    }',
          '  }' ].join( '\n' );
      } ).join( '\n' ),

      '  if ( isHit != 0.0 ) {',
      '    float colorAlpha = clamp( 0.5 - finalRDist, 0.0, 1.0 );',
      '    float resultAlpha = colorAlpha + ( 1.0 - colorAlpha ) * gl_FragColor.a;',
      '    vec3 color;',
      '    if ( dOff > 0.3 ) {',
      '      color = mix( uMain, uShadow, ( dOff - 0.3 ) / 0.7 );',
      '    } else {',
      '      color = mix( uHighlight, uMain, dOff / 0.3 );',
      '    }',
      '    gl_FragColor.rgb = mix( gl_FragColor.rgb, color, colorAlpha );',
      '    gl_FragColor.a = resultAlpha;',
      '  }',
      '}'
    ].join( '\n' );

    var squareFragmentShaderSource = [
      'precision mediump float;',
      'uniform float uNumBeads;',
      beadRange.map( function( n ) {
        return 'uniform vec2 uBead' + n + ';';
      } ).join( '\n' ),
      'uniform float uPixelScale;',
      'varying vec2 vView;',
      '',
      'void main( void ) {',
      '    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );',
      beadRange.map( function( n ) {
        return [
          '  if ( uNumBeads >= ' + ( n + 1 ) + '.0 ) {',
          '    float dd = length( vView - uBead' + n + ' );',
          '    if ( dd < 10.0 ) {',
          '      gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );',
          '    }',
          '  }' ].join( '\n' );
      } ).join( '\n' ),
      '}'
    ].join( '\n' );

    this.roundShaderProgram = new ShaderProgram( gl, vertexShaderSource, roundFragmentShaderSource, {
      attributes: [ 'aPosition' ],
      uniforms: [ 'uModelViewMatrix', 'uProjectionMatrix', 'uRadius', 'uPixelScale', 'uHighlight', 'uMain', 'uShadow', 'uBackground', 'uNumBeads' ].concat( beadRange.map( function( n ) {
        return 'uBead' + n;
      } ) )
    } );

    this.squareShaderProgram = new ShaderProgram( gl, vertexShaderSource, squareFragmentShaderSource, {
      attributes: [ 'aPosition' ],
      uniforms: [ 'uModelViewMatrix', 'uProjectionMatrix', 'uPixelScale', 'uNumBeads' ].concat( beadRange.map( function( n ) {
        return 'uBead' + n;
      } ) )
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
      var i;

      // TODO: can we do this at any other time?
      // TODO: maybe just cache round/square count and only change if those changed
      var layout = this.node.layoutProperty.value;
      var translation = layout.containerTranslation;

      function mapToUnit( n ) {
        return n / 255;
      }

      this.roundShaderProgram.use();

      gl.uniformMatrix3fv( this.roundShaderProgram.uniformLocations.uModelViewMatrix, false, modelViewMatrix.entries );
      gl.uniformMatrix3fv( this.roundShaderProgram.uniformLocations.uProjectionMatrix, false, projectionMatrix.entries );
      gl.uniform1f( this.roundShaderProgram.uniformLocations.uRadius, ProportionPlaygroundConstants.BEAD_DIAMETER / 2 );
      gl.uniform1f( this.roundShaderProgram.uniformLocations.uPixelScale, modelViewMatrix.getScaleVector().x * projectionMatrix.getScaleVector().x * gl.canvas.width * Util.backingScale( gl ) );
      gl.uniform3f( this.roundShaderProgram.uniformLocations.uHighlight, mapToUnit( this.node.roundHighlightColorProperty.value.red ),
                                                                    mapToUnit( this.node.roundHighlightColorProperty.value.green ),
                                                                    mapToUnit( this.node.roundHighlightColorProperty.value.blue ) );
      gl.uniform3f( this.roundShaderProgram.uniformLocations.uMain, mapToUnit( this.node.roundMainColorProperty.value.red ),
                                                               mapToUnit( this.node.roundMainColorProperty.value.green ),
                                                               mapToUnit( this.node.roundMainColorProperty.value.blue ) );
      gl.uniform3f( this.roundShaderProgram.uniformLocations.uShadow, mapToUnit( this.node.roundShadowColorProperty.value.red ),
                                                                 mapToUnit( this.node.roundShadowColorProperty.value.green ),
                                                                 mapToUnit( this.node.roundShadowColorProperty.value.blue ) );
      gl.uniform3f( this.roundShaderProgram.uniformLocations.uBackground, mapToUnit( this.node.roundBackgroundColorProperty.value.red ),
                                                                     mapToUnit( this.node.roundBackgroundColorProperty.value.green ),
                                                                     mapToUnit( this.node.roundBackgroundColorProperty.value.blue ) );
      gl.uniform1f( this.roundShaderProgram.uniformLocations.uNumBeads, layout.roundBeads.length );
      for ( i = 0; i < layout.roundBeads.length; i++ ) {
        gl.uniform2f( this.roundShaderProgram.uniformLocations[ 'uBead' + i ],
                      layout.roundBeads[ i ].center.x + translation.x,
                      layout.roundBeads[ i ].center.y + translation.y );
      }

      gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
      gl.vertexAttribPointer( this.roundShaderProgram.attributeLocations.aPosition, 3, gl.FLOAT, false, 0, 0 );

      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

      this.roundShaderProgram.unuse();

      this.squareShaderProgram.use();

      gl.uniformMatrix3fv( this.squareShaderProgram.uniformLocations.uModelViewMatrix, false, modelViewMatrix.entries );
      gl.uniformMatrix3fv( this.squareShaderProgram.uniformLocations.uProjectionMatrix, false, projectionMatrix.entries );
      gl.uniform1f( this.squareShaderProgram.uniformLocations.uPixelScale, modelViewMatrix.getScaleVector().x * projectionMatrix.getScaleVector().x * gl.canvas.width * Util.backingScale( gl ) );
      gl.uniform1f( this.squareShaderProgram.uniformLocations.uNumBeads, layout.squareBeads.length );
      for ( i = 0; i < layout.squareBeads.length; i++ ) {
        gl.uniform2f( this.squareShaderProgram.uniformLocations[ 'uBead' + i ],
                      layout.squareBeads[ i ].center.x + translation.x,
                      layout.squareBeads[ i ].center.y + translation.y );
      }

      gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
      gl.vertexAttribPointer( this.squareShaderProgram.attributeLocations.aPosition, 3, gl.FLOAT, false, 0, 0 );

      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

      this.squareShaderProgram.unuse();

      return WebGLNode.PAINTED_SOMETHING;
    },

    dispose: function() {
      this.roundShaderProgram.dispose();
      this.gl.deleteBuffer( this.vertexBuffer );

      this.roundShaderProgram = null;

      // After we are disposed, we don't care about context loss
      this.gl.canvas.removeEventListener( 'webglcontextlost', this.contextLossListener );
    }
  } );

  return NecklaceWebGLBeadsNode;
} );
