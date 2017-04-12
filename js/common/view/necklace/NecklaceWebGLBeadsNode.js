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
  var ShaderProgram = require( 'SCENERY/util/ShaderProgram' );
  var WebGLNode = require( 'SCENERY/nodes/WebGLNode' );
  var ContextLossFailureDialog = require( 'SCENERY_PHET/ContextLossFailureDialog' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   * TODO: doc
   */
  function NecklaceWebGLBeadsNode() {
    WebGLNode.call( this, NecklaceBeadsPainter, {
      layerSplit: true // ensure we're on our own layer
    } );
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
    var roundVertexShaderSource = [
      'attribute vec2 aPosition;',
      'uniform mat3 uModelViewMatrix;',
      'uniform mat3 uProjectionMatrix;',
      '',
      'void main( void ) {',
      // homogeneous model-view transformation
      '  vec3 view = uModelViewMatrix * vec3( aPosition.xy, 1 );',
      // homogeneous map to to normalized device coordinates
      '  vec3 ndc = uProjectionMatrix * vec3( view.xy, 1 );',
      // ?
      '  gl_Position = vec4( ndc.xy, 1.0, 1.0 );',
      '}'
    ].join( '\n' );

    var roundFragmentShaderSource = [
      'precision mediump float;',
      '',
      'void main( void ) {',
      '  gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );',
      '}'
    ].join( '\n' );

    this.shaderProgram = new ShaderProgram( gl, roundVertexShaderSource, roundFragmentShaderSource, {
      attributes: [ 'aPosition' ],
      uniforms: [ 'uModelViewMatrix', 'uProjectionMatrix' ]
    } );

    this.vertexBuffer = gl.createBuffer();

    gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [
      100, 0, 0.2,
      100, 100, 0.2,
      0, 100, 0.2
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

      this.shaderProgram.use();

      gl.uniformMatrix3fv( this.shaderProgram.uniformLocations.uModelViewMatrix, false, modelViewMatrix.entries );
      gl.uniformMatrix3fv( this.shaderProgram.uniformLocations.uProjectionMatrix, false, projectionMatrix.entries );

      gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
      gl.vertexAttribPointer( this.shaderProgram.attributeLocations.aPosition, 3, gl.FLOAT, false, 0, 0 );

      gl.drawArrays( gl.TRIANGLES, 0, 3 );

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
