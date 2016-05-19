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
  var Text = require( 'SCENERY/nodes/Text' );

  function StaticNecklaceNode( necklaceModel ) {
    Node.call( this, {
      children: [ new Text( 'hello from necklace' ) ]
    } );
  }

  proportionPlayground.register( 'StaticNecklaceNode', StaticNecklaceNode );

  return inherit( Node, StaticNecklaceNode, {} );
} );