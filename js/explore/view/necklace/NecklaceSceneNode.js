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
  var ControllableNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/ControllableNecklaceNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/StaticNecklaceNode' );
  var RevealButton = require( 'PROPORTION_PLAYGROUND/explore/view/RevealButton' );

  function NecklaceSceneNode( layoutBounds, necklaceSceneModel, predictMode ) {
    var firstControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace1Model, necklaceSceneModel.revealProperty );
    var secondControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace2Model, necklaceSceneModel.revealProperty );
    var options = { scale: 0.3 };
    var abSwitch = new ABSwitch( necklaceSceneModel.showBothProperty,
      false, new StaticNecklaceNode( 14, 7, options ),
      true, new HBox( {
        children: [
          new StaticNecklaceNode( 10, 5, options ), new StaticNecklaceNode( 14, 7, options ) ]
      } ) );

    Node.call( this, {
      children: [ firstControllableNecklaceNode, secondControllableNecklaceNode, abSwitch ]
    } );
    this.necklaceSceneModel = necklaceSceneModel;

    if ( predictMode ) {
      var revealButton = new RevealButton( necklaceSceneModel.revealProperty, {
        bottom: layoutBounds.maxY - 87
      } );
      this.addChild( revealButton );
    }

    necklaceSceneModel.showBothProperty.link( function( showBoth ) {
      secondControllableNecklaceNode.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        firstControllableNecklaceNode.x = layoutBounds.width * 1 / 3;
        secondControllableNecklaceNode.x = layoutBounds.width * 2 / 3;

        revealButton && revealButton.mutate( { centerX: layoutBounds.centerX } );
      }
      else {
        firstControllableNecklaceNode.x = layoutBounds.width / 2;

        revealButton && revealButton.mutate( { left: layoutBounds.centerX + 110 } );
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 ); // TODO: Factor out
  }

  proportionPlayground.register( 'NecklaceSceneNode', NecklaceSceneNode );

  return inherit( Node, NecklaceSceneNode );
} );