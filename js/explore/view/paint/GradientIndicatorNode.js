// Copyright 2016, University of Colorado Boulder

/**
 * This is the live gradient that changes based on user input events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var GradientNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/GradientNode' );
  var Color = require( 'SCENERY/util/Color' );
  var Vector3 = require( 'DOT/Vector3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function GradientIndicatorNode( options ) {

    var gradientNode = new GradientNode( 20, 300, function( parameter ) {
      var blueVector = new Vector3( 0, 1, 1 ); // use cyan for RGB color mixing
      var yellowVector = new Vector3( 1, 1, 0 );

      var blended = blueVector.blend( yellowVector, parameter );
      return new Color( blended.x * 255, blended.y * 255, blended.z * 255 );
    } );
    Node.call( this, {
      children: [
        gradientNode
      ]
    } );

    this.mutate( options );
  }

  proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

  return inherit( Node, GradientIndicatorNode, {} );
} );