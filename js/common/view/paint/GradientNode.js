// Copyright 2014-2015, University of Colorado Boulder

/**
 * Static display of a single gradient, copy-pasted from SpectrumNode
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var Util = require( 'DOT/Util' );
  var Image = require( 'SCENERY/nodes/Image' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * Rectange that shows a given spectrum
   *
   * @param {number} width
   * @param {number} height
   * @param {PaintChoice} paintChoice
   * @param {Object} [options]
   * @constructor
   */
  function GradientNode( width, height, paintChoice, options ) {

    Node.call( this );

    var canvasProperty = new DerivedProperty( [ paintChoice.leftColorProperty, paintChoice.rightColorProperty ], function( leftColor, rightColor ) {
      // Draw the spectrum directly to a canvas, to improve performance.
      var canvas = document.createElement( 'canvas' );
      var context = canvas.getContext( '2d' );
      canvas.width = width;
      canvas.height = height;

      for ( var i = 0; i < height; i++ ) {
        var parameter = Util.clamp( Util.linear( 0, height, 0, 1, i ), 0, 1 );  // position -> wavelength
        context.fillStyle = paintChoice.getColor( parameter ).toCSS();
        context.fillRect( 0, i, width, 1 );
      }

      return canvas;
    } );

    var image = new Image( canvasProperty.value, {
      initialWidth: width,
      initialHeight: height
    } );
    canvasProperty.linkAttribute( image, 'image' );

    this.addChild( image );

    // outline.
    this.addChild( new Rectangle( 0, 0, width, height, { stroke: 'black', lineWidth: 2 } ) );

    this.mutate( options );
  }

  proportionPlayground.register( 'GradientNode', GradientNode );

  return inherit( Node, GradientNode );
} );
