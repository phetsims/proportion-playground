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
  var ControllableNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/ControllableNecklaceNode' );

  function NecklaceSceneNode( layoutBounds, necklaceSceneModel ) {
    var firstControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace1Model );
    var secondControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace2Model );

    Node.call( this, {
      children: [ firstControllableNecklaceNode, secondControllableNecklaceNode ]
    } );
    this.necklaceSceneModel = necklaceSceneModel;
  }

  proportionPlayground.register( 'NecklaceSceneNode', NecklaceSceneNode );

  return inherit( Node, NecklaceSceneNode, {} );
} );