// Copyright 2016-2017, University of Colorado Boulder

/**
 * Base view type for displaying SceneRatios (necklaces, billiards tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

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
