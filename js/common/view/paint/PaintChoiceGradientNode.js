// Copyright 2014-2015, University of Colorado Boulder

/**
 * Displays a gradient of colors from the two extremes (from a single paintChoice)
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Util = require( 'DOT/Util' );

  /**
   * Rectangle that shows a given spectrum
   * @constructor
   * @extends {Node}
   *
   * @param {number} width
   * @param {number} height
   * @param {PaintChoice} paintChoice
   * @param {Object} [options]
   */
  function PaintChoiceGradientNode( width, height, paintChoice, options ) {

    Node.call( this );

    var canvasProperty = new DerivedProperty( [ paintChoice.leftColorProperty, paintChoice.rightColorProperty ], function( leftColor, rightColor ) {
      var canvas = document.createElement( 'canvas' );
      var context = canvas.getContext( '2d' );
      canvas.width = width;
      canvas.height = height;

      for ( var i = 0; i < height; i++ ) {
        var parameter = Util.clamp( Util.linear( 0, height, 0, 1, i ), 0, 1 );
        context.fillStyle = paintChoice.getBlendedColor( parameter ).toCSS();
        context.fillRect( 0, i, width, 1 );
      }

      return canvas;
    } );

    // Gradient (swap image when the colors change)
    var image = new Image( canvasProperty.value, {
      initialWidth: width,
      initialHeight: height
    } );
    canvasProperty.linkAttribute( image, 'image' );
    this.addChild( image );

    // Outline
    this.addChild( new Rectangle( 0, 0, width, height, { stroke: 'black', lineWidth: 2 } ) );

    this.mutate( options );
  }

  proportionPlayground.register( 'PaintChoiceGradientNode', PaintChoiceGradientNode );

  return inherit( Node, PaintChoiceGradientNode );
} );
