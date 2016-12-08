// Copyright 2016, University of Colorado Boulder

/**
 * Base type for a combined visual representation with controls (spinners, etc.) for the ratio-based items
 * (necklaces, billiard tables, splotches, etc.)
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
  function SceneRatioControl( sceneRatio ) {
    Node.call( this );

    sceneRatio.controlsVisibleProperty.linkAttribute( this, 'visible' );
  }

  proportionPlayground.register( 'SceneRatioControl', SceneRatioControl );

  return inherit( Node, SceneRatioControl );
} );
