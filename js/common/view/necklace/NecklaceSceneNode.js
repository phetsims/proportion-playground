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
  var NecklaceControl = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceControl' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/StaticNecklaceNode' );
  var PatternPanel = require( 'PROPORTION_PLAYGROUND/common/view/necklace/PatternPanel' );
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
    var leftNecklaceControl = new NecklaceControl( scene.leftNecklace, scene.revealProperty );
    var rightNecklaceControl = new NecklaceControl( scene.rightNecklace, scene.revealProperty );
    var patternPanel = new PatternPanel( scene.leftNecklace, scene.rightNecklace );

    // Super call
    SceneNode.call( this, scene, layoutBounds, {
      sceneIcon: new StaticNecklaceNode( 14, 7, { scale: 0.25 } ),
      leftControl: leftNecklaceControl,
      rightControl: rightNecklaceControl,
      canCenterControlButton: false, // due to the pattern panel
      leftSwitchIcon: new StaticNecklaceNode( 14, 7, ICON_SCALE_OPTIONS ),
      rightSwitchIcon: new HBox( {
        children: [
          new StaticNecklaceNode( 10, 5, ICON_SCALE_OPTIONS ), new StaticNecklaceNode( 14, 7, ICON_SCALE_OPTIONS ) ]
      } )
    } );

    // When 2 necklaces are selected, show both
    scene.showBothProperty.link( function( showBoth ) {
      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        var ratio = 2 / 7;
        leftNecklaceControl.x = layoutBounds.width * ratio;
        rightNecklaceControl.x = layoutBounds.width * ( 1 - ratio );
      }
      else {
        leftNecklaceControl.x = layoutBounds.centerX;
      }
      self.updateControlButton();
    } );

    this.addChild( patternPanel );

    // Position the pattern panel
    scene.showBothProperty.link( function( showBoth ) {
      patternPanel.top = 85;
      patternPanel.centerX = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.73;
    } );
  }

  proportionPlayground.register( 'NecklaceSceneNode', NecklaceSceneNode );

  return inherit( SceneNode, NecklaceSceneNode );
} );
