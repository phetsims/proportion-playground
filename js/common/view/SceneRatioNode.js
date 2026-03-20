// Copyright 2016-2026, University of Colorado Boulder

/**
 * Base view type for displaying SceneRatios (necklaces, billiards tables, splotches, etc.)
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import Node from '../../../../scenery/js/nodes/Node.js';

class SceneRatioNode extends Node {
  /**
   * @param {SceneRatio} sceneRatio
   */
  constructor( sceneRatio ) {
    super();

    sceneRatio.visibleProperty.linkAttribute( this, 'visible' );
  }
}

export default SceneRatioNode;
