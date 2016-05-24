// Copyright 2016, University of Colorado Boulder

/**
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

  function NecklaceNode( necklaceModel ) {
    var necklaceNode = this;
    Node.call( this );

    var updateNecklace = function() {
      necklaceNode.children = [ new StaticNecklaceNode( necklaceModel.roundBeadCount, necklaceModel.squareBeadCount ) ];
      necklaceNode.centerX = 0;
      necklaceNode.centerY = 260;
    };
    necklaceModel.roundBeadCountProperty.link( updateNecklace );
    necklaceModel.squareBeadCountProperty.link( updateNecklace );
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( Node, NecklaceNode, {} );
} );