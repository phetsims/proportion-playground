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
  var Node = require( 'SCENERY/nodes/Node' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/StaticNecklaceNode' );
  var Property = require( 'AXON/Property' );

  /**
   *
   * @param {NecklaceModel} necklaceModel - the model
   * @constructor
   */
  function NecklaceNode( necklaceModel ) {
    var self = this;
    Node.call( this );

    // When the bead counts change, update the view
    Property.multilink( [
      necklaceModel.roundBeadCountProperty,
      necklaceModel.squareBeadCountProperty
    ], function( roundBeadCount, squareBeadCount ) {
      self.children = [ new StaticNecklaceNode( roundBeadCount, squareBeadCount ) ];
      self.centerX = 0;
      self.centerY = 245;
    } );
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( Node, NecklaceNode );
} );