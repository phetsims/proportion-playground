// Copyright 2016-2019, University of Colorado Boulder

/**
 * Base view type for displaying SceneRatios (necklaces, billiards tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import proportionPlayground from '../../proportionPlayground.js';

/**
 * @constructor
 * @extends {Node}
 *
 * @param {SceneRatio} sceneRatio
 */
function SceneRatioNode( sceneRatio ) {
  Node.call( this );

  sceneRatio.visibleProperty.linkAttribute( this, 'visible' );
}

proportionPlayground.register( 'SceneRatioNode', SceneRatioNode );

inherit( Node, SceneRatioNode );
export default SceneRatioNode;