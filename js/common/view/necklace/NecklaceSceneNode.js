// Copyright 2016-2021, University of Colorado Boulder

/**
 * Shows the necklace scene, including controls and the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { HBox } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import SceneNode from '../SceneNode.js';
import NecklaceControl from './NecklaceControl.js';
import NecklaceGraphicNode from './NecklaceGraphicNode.js';
import PatternPanel from './PatternPanel.js';

// constants
const ICON_OPTIONS = {
  scale: 0.2,
  pickable: false
};

class NecklaceSceneNode extends SceneNode {
  /**
   * @param {NecklaceScene} scene - the model
   * @param {Bounds2} layoutBounds - the visible bounds of the sim
   * @param {Tandem} tandem
   */
  constructor( scene, layoutBounds, tandem ) {

    // Create the left and right necklace nodes, each with their own NumberPickers
    const leftNecklaceControl = new NecklaceControl( scene.leftNecklace, tandem.createTandem( 'leftNecklaceControl' ) );
    const rightNecklaceControl = new NecklaceControl( scene.rightNecklace, tandem.createTandem( 'rightNecklaceControl' ) );
    const patternPanel = new PatternPanel( scene.leftNecklace, scene.rightNecklace, {
      tandem: tandem.createTandem( 'patternPanel' )
    } );

    // Super call
    super( scene, layoutBounds, {
      sceneIcon: NecklaceGraphicNode.createStaticNecklace( 14, 7, { scale: 0.25, pickable: false } ),
      leftControl: leftNecklaceControl,
      rightControl: rightNecklaceControl,
      canCenterControlButton: false, // due to the pattern panel
      leftSwitchIcon: NecklaceGraphicNode.createStaticNecklace( 14, 7, ICON_OPTIONS ),
      rightSwitchIcon: new HBox( {
        children: [
          NecklaceGraphicNode.createStaticNecklace( 10, 5, ICON_OPTIONS ), NecklaceGraphicNode.createStaticNecklace( 14, 7, ICON_OPTIONS ) ]
      } ),
      tandem: tandem
    } );

    // When 2 necklaces are selected, show both
    scene.showBothProperty.link( showBoth => {
      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        const ratio = 2 / 7;
        leftNecklaceControl.x = layoutBounds.width * ratio;
        rightNecklaceControl.x = layoutBounds.width * ( 1 - ratio );
      }
      else {
        leftNecklaceControl.x = layoutBounds.centerX;
      }
      this.updateControlButton();
    } );

    this.addChild( patternPanel );

    // Position the pattern panel
    scene.showBothProperty.link( showBoth => {
      patternPanel.top = 85;
      patternPanel.centerX = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.73;
    } );
  }
}

proportionPlayground.register( 'NecklaceSceneNode', NecklaceSceneNode );

export default NecklaceSceneNode;