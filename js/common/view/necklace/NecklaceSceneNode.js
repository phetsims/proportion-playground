// Copyright 2016, University of Colorado Boulder

/**
 * Shows the necklace scene, including controls and the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ControllableNecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/ControllableNecklaceNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/StaticNecklaceNode' );
  var SceneNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneNode' );

  // constants
  var ICON_SCALE_OPTIONS = { scale: 0.2 };

  /**
   * @constructor
   *
   * @param {NecklaceScene} scene - the model
   * @param {Bounds2} layoutBounds - the visible bounds of the sim
   */
  function NecklaceSceneNode( scene, layoutBounds ) {
    var self = this;

    // Create the left and right necklace nodes, each with their own NumberPickers
    var firstControllableNecklaceNode = new ControllableNecklaceNode( scene.leftNecklace, scene.revealProperty );
    var secondControllableNecklaceNode = new ControllableNecklaceNode( scene.rightNecklace, scene.revealProperty );

    // Super call
    SceneNode.call( this, scene, layoutBounds, {
      leftSwitchIcon: new StaticNecklaceNode( 14, 7, ICON_SCALE_OPTIONS ),
      rightSwitchIcon: new HBox( {
        children: [
          new StaticNecklaceNode( 10, 5, ICON_SCALE_OPTIONS ), new StaticNecklaceNode( 14, 7, ICON_SCALE_OPTIONS ) ]
      } ),
      children: [ firstControllableNecklaceNode, secondControllableNecklaceNode ]
    } );

    // When 2 necklaces are selected, show both
    scene.showBothProperty.link( function( showBoth ) {
      secondControllableNecklaceNode.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        firstControllableNecklaceNode.x = layoutBounds.width * 1 / 3;
        secondControllableNecklaceNode.x = layoutBounds.width * 2 / 3;

        self.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        firstControllableNecklaceNode.x = layoutBounds.centerX;

        self.mutateRevealButton( { left: layoutBounds.centerX + 110 } );
      }
    } );
  }

  proportionPlayground.register( 'NecklaceSceneNode', NecklaceSceneNode );

  return inherit( SceneNode, NecklaceSceneNode );
} );
