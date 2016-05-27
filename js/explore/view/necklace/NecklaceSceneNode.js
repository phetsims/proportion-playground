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
  var ControllableNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/ControllableNecklaceNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/StaticNecklaceNode' );
  var ExploreSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/ExploreSceneNode' );

  function NecklaceSceneNode( layoutBounds, necklaceSceneModel, predictMode ) {
    var necklaceSceneNode = this;
    var firstControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace1Model, necklaceSceneModel.revealProperty );
    var secondControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace2Model, necklaceSceneModel.revealProperty );
    var options = { scale: 0.3 };
    var abSwitch = new ABSwitch( necklaceSceneModel.showBothProperty,
      false, new StaticNecklaceNode( 14, 7, options ),
      true, new HBox( {
        children: [
          new StaticNecklaceNode( 10, 5, options ), new StaticNecklaceNode( 14, 7, options ) ]
      } ) );

    ExploreSceneNode.call( this, layoutBounds, necklaceSceneModel, predictMode, 87, {
      children: [ firstControllableNecklaceNode, secondControllableNecklaceNode, abSwitch ]
    } );
    this.necklaceSceneModel = necklaceSceneModel;

    necklaceSceneModel.showBothProperty.link( function( showBoth ) {
      secondControllableNecklaceNode.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        firstControllableNecklaceNode.x = layoutBounds.width * 1 / 3;
        secondControllableNecklaceNode.x = layoutBounds.width * 2 / 3;

        necklaceSceneNode.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        firstControllableNecklaceNode.x = layoutBounds.width / 2;

        necklaceSceneNode.mutateRevealButton( { left: layoutBounds.centerX + 110 } );
      }
    } );
    this.moveABSwitchToBottomCenter( abSwitch );
  }

  proportionPlayground.register( 'NecklaceSceneNode', NecklaceSceneNode );

  return inherit( ExploreSceneNode, NecklaceSceneNode );
} );