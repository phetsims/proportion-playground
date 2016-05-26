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
  var Bounds2 = require( 'DOT/Bounds2' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * Slider track that displays the visible spectrum.
   * @param {number} width
   * @param {number} height
   * @param {function} getColor - given a number between 0 and 1, return a color for that point in the gradient
   * @param {Object} [options]
   * @constructor
   */
  function GradientNode( width, height, getColor, options ) {

    Node.call( this );

    // Draw the spectrum directly to a canvas, to improve performance.
    var canvas = document.createElement( 'canvas' );
    var context = canvas.getContext( '2d' );
    canvas.width = width;
    canvas.height = height;

    for ( var i = 0; i < height; i++ ) {
      var parameter = Util.clamp( Util.linear( 0, height, 0, 1, i ), 0, 1 );  // position -> wavelength
      context.fillStyle = getColor( parameter ).toCSS();
      context.fillRect( 0, i, width, 1 );
    }

    this.addChild( new Image( canvas.toDataURL() ) );

    // since the Image's bounds aren't immediately computed, we override it here
    this.setLocalBounds( new Bounds2( 0, 0, width, height ) );

    // outline. TODO: is it a problem that this goes outside of the LocalBounds?
    this.addChild( new Rectangle( 0, 0, width, height, { stroke: 'black', lineWidth: 2 } ) );

    this.mutate( options );
  }

  proportionPlayground.register( 'GradientNode', GradientNode );

  return inherit( Node, GradientNode );
} );
