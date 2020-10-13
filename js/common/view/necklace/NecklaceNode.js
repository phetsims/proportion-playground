// Copyright 2016-2020, University of Colorado Boulder

/**
 * Non-interactive node that displays the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import proportionPlayground from '../../../proportionPlayground.js';
import SceneRatioNode from '../SceneRatioNode.js';
import NecklaceGraphicNode from './NecklaceGraphicNode.js';

class NecklaceNode extends SceneRatioNode {
  /**
   * @param {Necklace} necklace - the model
   */
  constructor( necklace ) {
    super( necklace );

    this.addChild( new NecklaceGraphicNode( necklace.layoutProperty, {
      y: 256,
      // Override bounds so that expensive recomputation isn't needed
      localBounds: NecklaceGraphicNode.createStaticNecklace( 20, 20 ).localBounds.dilated( 15 ),
      preventFit: true,
      pickable: false
    } ) );
  }
}

proportionPlayground.register( 'NecklaceNode', NecklaceNode );

export default NecklaceNode;