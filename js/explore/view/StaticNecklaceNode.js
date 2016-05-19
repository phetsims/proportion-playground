// Copyright 2016, University of Colorado Boulder

/**
 * An immutable necklace node, used in icons and recreated by NecklaceNode when bead count changes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/SquareBeadNode' );

  function StaticNecklaceNode( roundBeadCount, squareBeadCount ) {
    var children = [];
    for ( var i = 0; i < roundBeadCount; i++ ) {
      children.push( new RoundBeadNode( { x: i * 22 } ) );
    }
    for ( i = 0; i < squareBeadCount; i++ ) {
      children.push( new SquareBeadNode( { x: i * 22, y: 22 } ) );
    }

    Node.call( this, {
      children: children
    } );
  }

  proportionPlayground.register( 'StaticNecklaceNode', StaticNecklaceNode );

  return inherit( Node, StaticNecklaceNode, {} );
} );