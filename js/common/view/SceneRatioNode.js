// Copyright 2016-2019, University of Colorado Boulder

/**
 * Base view type for displaying SceneRatios (necklaces, billiards tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

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

  return inherit( Node, SceneRatioNode );
} );
