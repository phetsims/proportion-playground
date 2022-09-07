// Copyright 2016-2022, University of Colorado Boulder

/**
 * Node that displays everything for the Apple scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { HBox, Image, Node, Text } from '../../../../../scenery/js/imports.js';
import Checkbox from '../../../../../sun/js/Checkbox.js';
import appleRed_png from '../../../../mipmaps/appleRed_png.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundStrings from '../../../ProportionPlaygroundStrings.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneNode from '../SceneNode.js';
import AppleGraphNode from './AppleGraphNode.js';
import AppleGroupControl from './AppleGroupControl.js';

const costPerAppleString = ProportionPlaygroundStrings.costPerApple;

class AppleSceneNode extends SceneNode {
  /**
   * @param {AppleScene} scene - the model
   * @param {Bounds2} layoutBounds - the box within which to lay out all components
   * @param {Tandem} tandem
   */
  constructor( scene, layoutBounds, tandem ) {

    // Create child nodes to be displayed
    const leftAppleGroupControl = new AppleGroupControl( scene.leftAppleGroup, scene.showCostPerAppleProperty, tandem.createTandem( 'leftAppleGroupControl' ) );
    const rightAppleGroupControl = new AppleGroupControl( scene.rightAppleGroup, scene.showCostPerAppleProperty, tandem.createTandem( 'rightAppleGroupControl' ) );
    const appleGraphNode = new AppleGraphNode( scene, {
      y: 150,
      tandem: tandem.createTandem( 'appleGraphNode' )
    } );

    // Create icons for the ABSwitch
    const appleImageNode = new Image( appleRed_png, { scale: 0.2 } );

    // Checkbox that shows the cost per apple in a price tag
    const showCostPerAppleCheckbox = new Checkbox( scene.showCostPerAppleProperty, new Text( costPerAppleString, {
      maxWidth: 293, // ceiling value from ?stringTest=double for English
      font: ProportionPlaygroundConstants.CONTROL_FONT
    } ), {
      tandem: tandem.createTandem( 'showCostPerAppleCheckbox' )
    } );

    // Super call and add children
    super( scene, layoutBounds, {
      sceneIcon: new Image( appleRed_png, { scale: 0.25 } ),
      leftControl: leftAppleGroupControl,
      rightControl: rightAppleGroupControl,
      leftSwitchIcon: new Node( { children: [ appleImageNode ] } ),
      rightSwitchIcon: new HBox( {
        children: [
          new Node( { children: [ appleImageNode ] } ),
          new Node( { children: [ appleImageNode ] } )
        ]
      } ),
      tandem: tandem
    } );

    this.addChild( showCostPerAppleCheckbox );
    this.addChild( appleGraphNode );

    // When the "show both" ABSwitch is toggled, change which apple groups are displayed and update their layouts
    scene.showBothProperty.link( showBoth => {
      if ( showBoth ) {
        leftAppleGroupControl.right = layoutBounds.width * 0.465;
        rightAppleGroupControl.left = layoutBounds.width * 0.535;
        appleGraphNode.x = layoutBounds.centerX;
      }
      else {
        leftAppleGroupControl.centerX = layoutBounds.width / 2;
        appleGraphNode.left = leftAppleGroupControl.right + layoutBounds.width * 0.05;
      }
      this.updateControlButton();
    } );

    // Price tag checkbox goes in the bottom left
    const checkboxInset = 10;
    showCostPerAppleCheckbox.leftBottom = layoutBounds.leftBottom.plusXY( checkboxInset, -checkboxInset );
  }
}

proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

export default AppleSceneNode;