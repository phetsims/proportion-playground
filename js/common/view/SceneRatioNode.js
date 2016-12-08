// Copyright 2016, University of Colorado Boulder

/**
 * Base type for visual representation nodes for the ratio-based items (necklaces, billiard tables, splotches, etc.)
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
