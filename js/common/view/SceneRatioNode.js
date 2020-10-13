// Copyright 2016-2020, University of Colorado Boulder

/**
 * Base view type for displaying SceneRatios (necklaces, billiards tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import proportionPlayground from '../../proportionPlayground.js';

class SceneRatioNode extends Node {
  /**
   * @param {SceneRatio} sceneRatio
   */
  constructor( sceneRatio ) {
    super();

    sceneRatio.visibleProperty.linkAttribute( this, 'visible' );
  }
}

proportionPlayground.register( 'SceneRatioNode', SceneRatioNode );

export default SceneRatioNode;