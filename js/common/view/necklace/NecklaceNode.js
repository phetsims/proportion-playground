// Copyright 2016-2019, University of Colorado Boulder

/**
 * Non-interactive node that displays the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';
import SceneRatioNode from '../SceneRatioNode.js';
import NecklaceGraphicNode from './NecklaceGraphicNode.js';

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

inherit( SceneRatioNode, NecklaceNode );
export default NecklaceNode;