// Copyright 2016-2019, University of Colorado Boulder

/**
 * Shows the necklace scene, including controls and the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NecklaceControl = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceControl' );
  const NecklaceGraphicNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceGraphicNode' );
  const PatternPanel = require( 'PROPORTION_PLAYGROUND/common/view/necklace/PatternPanel' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const SceneNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneNode' );

  // constants
  const ICON_OPTIONS = {
    scale: 0.2,
    pickable: false
  };

  /**
   * @constructor
   * @extends {SceneNode}
   *
   * @param {NecklaceScene} scene - the model
   * @param {Bounds2} layoutBounds - the visible bounds of the sim
   */
  function NecklaceSceneNode( scene, layoutBounds ) {
    const self = this;

    // Create the left and right necklace nodes, each with their own NumberPickers
    const leftNecklaceControl = new NecklaceControl( scene.leftNecklace );
    const rightNecklaceControl = new NecklaceControl( scene.rightNecklace );
    const patternPanel = new PatternPanel( scene.leftNecklace, scene.rightNecklace );

    // Super call
    SceneNode.call( this, scene, layoutBounds, {
      sceneIcon: NecklaceGraphicNode.createStaticNecklace( 14, 7, { scale: 0.25, pickable: false } ),
      leftControl: leftNecklaceControl,
      rightControl: rightNecklaceControl,
      canCenterControlButton: false, // due to the pattern panel
      leftSwitchIcon: NecklaceGraphicNode.createStaticNecklace( 14, 7, ICON_OPTIONS ),
      rightSwitchIcon: new HBox( {
        children: [
          NecklaceGraphicNode.createStaticNecklace( 10, 5, ICON_OPTIONS ), NecklaceGraphicNode.createStaticNecklace( 14, 7, ICON_OPTIONS ) ]
      } )
    } );

    // When 2 necklaces are selected, show both
    scene.showBothProperty.link( function( showBoth ) {
      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        const ratio = 2 / 7;
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
