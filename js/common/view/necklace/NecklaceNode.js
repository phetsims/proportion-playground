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
  var NecklaceGraphicNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceGraphicNode' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );

  /**
   * @constructor
   * @extends {SceneRatioNode}
   *
   * @param {Necklace} necklace - the model
   */
  function NecklaceNode( necklace ) {
    SceneRatioNode.call( this, necklace );

    var localBounds = NecklaceGraphicNode.createStaticNecklace( 20, 20 ).localBounds.dilated( 15 );

    this.addChild( new NecklaceGraphicNode( necklace.layoutProperty, {
      y: 256,
      // Override bounds so that expensive recomputation isn't needed
      localBounds: localBounds,
      preventFit: true,
      pickable: false
    } ) );
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( SceneRatioNode, NecklaceNode );
} );
