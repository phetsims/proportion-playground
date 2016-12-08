// Copyright 2016, University of Colorado Boulder

/**
 * Non-interactive node that displays the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/StaticNecklaceNode' );
  var Property = require( 'AXON/Property' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );

  /**
   *
   * @param {Necklace} necklace - the model
   * @constructor
   */
  function NecklaceNode( necklace ) {
    SceneRatioNode.call( this, necklace );

    var self = this;

    // When the bead counts change, update the view
    Property.multilink( [
      necklace.roundBeadCountProperty,
      necklace.squareBeadCountProperty
    ], function( roundBeadCount, squareBeadCount ) {
      self.children = [ new StaticNecklaceNode( roundBeadCount, squareBeadCount ) ];
      if ( roundBeadCount + squareBeadCount > 0 ) {
        self.centerX = 0;
        self.centerY = 245;
      }
    } );
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( SceneRatioNode, NecklaceNode );
} );
