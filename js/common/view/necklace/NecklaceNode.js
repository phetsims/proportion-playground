// Copyright 2016, University of Colorado Boulder

/**
 * Non-interactive node that displays the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NecklaceGraphicNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceGraphicNode' );
  var Property = require( 'AXON/Property' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );

  /**
   *
   * @param {Necklace} necklace - the model
   * @constructor
   */
  function NecklaceNode( necklace ) {
    SceneRatioNode.call( this, necklace );

    var necklaceGraphicNode = new NecklaceGraphicNode( necklace.roundBeadCountProperty.value, necklace.squareBeadCountProperty.value, {
      x: 0,
      y: 256,
      // Override bounds so that expensive recomputation isn't needed
      localBounds: new NecklaceGraphicNode( 20, 20 ).localBounds.dilated( 15 ),
      preventFit: true,
      pickable: false
    } );
    this.addChild( necklaceGraphicNode );

    // When the bead counts change, update the view
    Property.multilink( [
      necklace.roundBeadCountProperty,
      necklace.squareBeadCountProperty
    ], function( roundBeadCount, squareBeadCount ) {
      necklaceGraphicNode.setBeadCounts( roundBeadCount, squareBeadCount );
    } );
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( SceneRatioNode, NecklaceNode );
} );
