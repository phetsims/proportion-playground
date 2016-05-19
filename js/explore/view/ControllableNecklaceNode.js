// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with its controls.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );

  function ControllableNecklaceNode( necklaceModel ) {
    Node.call( this );
  }

  proportionPlayground.register( 'ControllableNecklaceNode', ControllableNecklaceNode );

  return inherit( Node, ControllableNecklaceNode, {} );
} );