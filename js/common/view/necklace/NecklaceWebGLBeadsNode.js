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
    var fuzzNumber = '0.55';

    // Porter-Duff "over" blend function (non-premultiplied)
    var blendSource = [
      'vec4 blend( vec4 source, vec4 target ) {',
      '  float alpha = target.a + ( 1.0 - target.a ) * source.a;',
      '  vec3 color = ( target.rgb * target.a + source.rgb * source.a * ( 1.0 - target.a ) ) / alpha;',
      '  return vec4( color, alpha );',
      '}'
    ].join( '\n' );

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
      blendSource,
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
      '    float alpha = clamp( 0.5 - finalRDist, 0.0, 1.0 );',
      '    vec3 color;',
      '    if ( dOff > 0.3 ) {',
      '      color = mix( uMain, uShadow, ( dOff - 0.3 ) / 0.7 );',
      '    } else {',
      '      color = mix( uHighlight, uMain, dOff / 0.3 );',
      '    }',
      '    gl_FragColor = blend( gl_FragColor, vec4( color, alpha ) );',
      '  }',
      '}'
    ].join( '\n' );

    // sqrt(2)/2 from circle+angle combination, 0.6*radius from SquareBeadNode
    var gradOffset = Math.sqrt( 2 ) * 0.5 * 0.6 * ProportionPlaygroundConstants.BEAD_DIAMETER / 2;
    var squareFragmentShaderSource = [
      'precision mediump float;',
      'uniform float uNumBeads;',
      beadRange.map( function( n ) {
        return 'uniform vec3 uBead' + n + ';';
      } ).join( '\n' ),
      'uniform float uRadius;',
      'uniform float uPixelScale;',
      'uniform vec3 uDark7;',
      'uniform vec3 uDark4;',
      'uniform vec3 uDark3;',
      'uniform vec3 uDark1;',
      'uniform vec3 uMain;',
      'uniform vec3 uBright3;',
      'varying vec2 vView;',
      '',
      'float distR( vec2 offset ) {',
      '  float off;',
      '  float ax = abs( offset.x );',
      '  float ay = abs( offset.y );',
      '  float cutoff = uRadius * 4.0 / 5.0;',
      '  if ( ax > cutoff && ay > cutoff ) {',
      '    off = length( vec2( ax - cutoff, ay - cutoff ) ) - uRadius / 5.0;',
      '  } else {',
      '    off = max( ax, ay ) - uRadius;',
      '  }',
      '  return off * uPixelScale * ' + fuzzNumber + ';',
      '}',
      blendSource,
      '',
      'void main( void ) {',
      '    vec2 offset;',
      '    vec2 curOffset;',
      '    float gradOffset;',
      '    vec2 bestCurOffset;',
      '    float rDist;',
      '    float backDist = 1000.0;',
      '    float middleDist = 1000.0;',
      '    float frontDist = 1000.0;',
      '    vec3 color;',
      '    mat2 rotation;',
      beadRange.map( function( n ) {
        return [
          '  if ( uNumBeads >= ' + ( n + 1 ) + '.0 ) {',
          '    rotation = mat2( cos( uBead' + n + '.z ), -sin( uBead' + n + '.z ), sin( uBead' + n + '.z ), cos( uBead' + n + '.z ) );',
          '    offset = ( vView - uBead' + n + '.xy ) / 0.95;', // compensate for 0.95 scale
          '    offset += 1.0;', // compensate for centering

          // Back
          '    curOffset = offset - uRadius / 7.5;',
          '    backDist = min( backDist, distR( rotation * curOffset ) );',

          // Middle
          '    curOffset = ( offset - uRadius / 15.0 ) * 21.0 / 20.0;',
          '    middleDist = min( middleDist, distR( rotation * curOffset ) );',

          // Front
          '    curOffset = offset * 11.0 / 10.0;',
          '    rDist = distR( rotation * curOffset );',
          '    if ( rDist < frontDist ) {',
          '      frontDist = min( frontDist, rDist );',
          '      bestCurOffset = curOffset;',
          '    }',
          '  }' ].join( '\n' );
      } ).join( '\n' ),

      // Default (transparent)
      '    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );',

      // Back
      '  if ( backDist <= 0.5 ) {',
      '    gl_FragColor = blend( gl_FragColor, vec4( uDark7, clamp( 0.5 - backDist, 0.0, 1.0 ) ) );',
      '  }',

      // Middle
      '  if ( middleDist <= 0.5 ) {',
      '    gl_FragColor = blend( gl_FragColor, vec4( uDark4, clamp( 0.5 - middleDist, 0.0, 1.0 ) ) );',
      '  }',

      // Front
      '  if ( frontDist <= 0.5 ) {',
      '    gradOffset = clamp( length( bestCurOffset + ' + gradOffset + ' ) / ( uRadius * 2.6 ), 0.0, 1.0 );', // dia + offset 2.6
      '    if ( gradOffset < 0.3 ) {',
      '      color = mix( uBright3, uMain, gradOffset / 0.3 );',
      '    } else if ( gradOffset < 0.5 ) {',
      '      color = mix( uMain, uDark1, ( gradOffset - 0.3 ) / 0.2 );',
      '    } else if ( gradOffset < 0.8 ) {',
      '      color = mix( uDark1, uDark3, ( gradOffset - 0.5 ) / 0.3 );',
      '    } else {',
      '      color = uDark3;',
      '    }',
      '    gl_FragColor = blend( gl_FragColor, vec4( color, clamp( 0.5 - frontDist, 0.0, 1.0 ) ) );',
      '  }',
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
      uniforms: [ 'uModelViewMatrix', 'uProjectionMatrix', 'uRadius', 'uPixelScale', 'uDark7', 'uDark4', 'uDark3', 'uDark1', 'uMain', 'uBright3', 'uNumBeads' ].concat( beadRange.map( function( n ) {
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
      gl.uniform1f( this.squareShaderProgram.uniformLocations.uRadius, ProportionPlaygroundConstants.BEAD_DIAMETER / 2 );
      gl.uniform1f( this.squareShaderProgram.uniformLocations.uPixelScale, modelViewMatrix.getScaleVector().x * projectionMatrix.getScaleVector().x * gl.canvas.width * Util.backingScale( gl ) );
      gl.uniform1f( this.squareShaderProgram.uniformLocations.uNumBeads, layout.squareBeads.length );
      gl.uniform3f( this.squareShaderProgram.uniformLocations.uDark7, mapToUnit( this.node.squareDark7ColorProperty.value.red ),
                                                                    mapToUnit( this.node.squareDark7ColorProperty.value.green ),
                                                                    mapToUnit( this.node.squareDark7ColorProperty.value.blue ) );
      gl.uniform3f( this.squareShaderProgram.uniformLocations.uDark4, mapToUnit( this.node.squareDark4ColorProperty.value.red ),
                                                                    mapToUnit( this.node.squareDark4ColorProperty.value.green ),
                                                                    mapToUnit( this.node.squareDark4ColorProperty.value.blue ) );
      gl.uniform3f( this.squareShaderProgram.uniformLocations.uDark3, mapToUnit( this.node.squareDark3ColorProperty.value.red ),
                                                                    mapToUnit( this.node.squareDark3ColorProperty.value.green ),
                                                                    mapToUnit( this.node.squareDark3ColorProperty.value.blue ) );
      gl.uniform3f( this.squareShaderProgram.uniformLocations.uDark1, mapToUnit( this.node.squareDark1ColorProperty.value.red ),
                                                                    mapToUnit( this.node.squareDark1ColorProperty.value.green ),
                                                                    mapToUnit( this.node.squareDark1ColorProperty.value.blue ) );
      gl.uniform3f( this.squareShaderProgram.uniformLocations.uMain, mapToUnit( this.node.squareColorProperty.value.red ),
                                                                    mapToUnit( this.node.squareColorProperty.value.green ),
                                                                    mapToUnit( this.node.squareColorProperty.value.blue ) );
      gl.uniform3f( this.squareShaderProgram.uniformLocations.uBright3, mapToUnit( this.node.squareBright3ColorProperty.value.red ),
                                                                    mapToUnit( this.node.squareBright3ColorProperty.value.green ),
                                                                    mapToUnit( this.node.squareBright3ColorProperty.value.blue ) );
      for ( i = 0; i < layout.squareBeads.length; i++ ) {
        gl.uniform3f( this.squareShaderProgram.uniformLocations[ 'uBead' + i ],
                      layout.squareBeads[ i ].center.x + translation.x,
                      layout.squareBeads[ i ].center.y + translation.y,
                      layout.squareBeads[ i ].angle );
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
