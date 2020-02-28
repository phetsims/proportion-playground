// Copyright 2016-2020, University of Colorado Boulder

/**
 * Node that displays everything for the Apple scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../../sun/js/Checkbox.js';
import redAppleImage from '../../../../mipmaps/apple-red_png.js';
import proportionPlaygroundStrings from '../../../proportion-playground-strings.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneNode from '../SceneNode.js';
import AppleGraphNode from './AppleGraphNode.js';
import AppleGroupControl from './AppleGroupControl.js';

const costPerAppleString = proportionPlaygroundStrings.costPerApple;

/**
 * @constructor
 * @extends {SceneNode}
 *
 * @param {AppleScene} scene - the model
 * @param {Bounds2} layoutBounds - the box within which to lay out all components
 */
function AppleSceneNode( scene, layoutBounds ) {
  const self = this;

  // Create child nodes to be displayed
  const leftAppleGroupControl = new AppleGroupControl( scene.leftAppleGroup, scene.showCostPerAppleProperty );
  const rightAppleGroupControl = new AppleGroupControl( scene.rightAppleGroup, scene.showCostPerAppleProperty );
  const appleGraphNode = new AppleGraphNode( scene, {
    y: 150
  } );

  // Create icons for the ABSwitch
  const appleImageNode = new Image( redAppleImage, { scale: 0.2 } );

  // Checkbox that shows the cost per apple in a price tag
  const showCostPerAppleCheckbox = new Checkbox( new Text( costPerAppleString, {
    maxWidth: 293, // ceiling value from ?stringTest=double for English
    font: ProportionPlaygroundConstants.CONTROL_FONT
  } ), scene.showCostPerAppleProperty );

  // Super call and add children
  SceneNode.call( this, scene, layoutBounds, {
    sceneIcon: new Image( redAppleImage, { scale: 0.25 } ),
    leftControl: leftAppleGroupControl,
    rightControl: rightAppleGroupControl,
    leftSwitchIcon: new Node( { children: [ appleImageNode ] } ),
    rightSwitchIcon: new HBox( {
      children: [
        new Node( { children: [ appleImageNode ] } ),
        new Node( { children: [ appleImageNode ] } )
      ]
    } )
  } );

  this.addChild( showCostPerAppleCheckbox );
  this.addChild( appleGraphNode );

  // When the "show both" ABSwitch is toggled, change which apple groups are displayed and update their layouts
  scene.showBothProperty.link( function( showBoth ) {
    if ( showBoth ) {
      leftAppleGroupControl.right = layoutBounds.width * 0.465;
      rightAppleGroupControl.left = layoutBounds.width * 0.535;
      appleGraphNode.x = layoutBounds.centerX;
    }
    else {
      leftAppleGroupControl.centerX = layoutBounds.width / 2;
      appleGraphNode.left = leftAppleGroupControl.right + layoutBounds.width * 0.05;
    }
    self.updateControlButton();
  } );

  // Price tag checkbox goes in the bottom left
  const checkboxInset = 10;
  showCostPerAppleCheckbox.leftBottom = layoutBounds.leftBottom.plusXY( checkboxInset, -checkboxInset );
}

proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

inherit( SceneNode, AppleSceneNode );
export default AppleSceneNode;