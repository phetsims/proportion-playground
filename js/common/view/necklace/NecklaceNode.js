// Copyright 2016-2019, University of Colorado Boulder

/**
 * Non-interactive node that displays the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const NecklaceGraphicNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceGraphicNode' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );

  /**
   * @constructor
   * @extends {SceneRatioNode}
   *
   * @param {Necklace} necklace - the model
   */
  function NecklaceNode( necklace ) {
    SceneRatioNode.call( this, necklace );

    this.addChild( new NecklaceGraphicNode( necklace.layoutProperty, {
      y: 256,
      // Override bounds so that expensive recomputation isn't needed
      localBounds: NecklaceGraphicNode.createStaticNecklace( 20, 20 ).localBounds.dilated( 15 ),
      preventFit: true,
      pickable: false
    } ) );
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( SceneRatioNode, NecklaceNode );
} );
