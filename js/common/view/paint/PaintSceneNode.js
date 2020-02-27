// Copyright 2016-2019, University of Colorado Boulder

/**
 * Node that shows everything for a paint scene (including NumberPickers and paint splotches and gradient).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import AlignBox from '../../../../../scenery/js/nodes/AlignBox.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import VerticalAquaRadioButtonGroup from '../../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import paintSceneImage from '../../../../mipmaps/paint-scene_png.js';
import proportionPlayground from '../../../proportionPlayground.js';
import PaintChoice from '../../model/paint/PaintChoice.js';
import Splotch from '../../model/paint/Splotch.js';
import Side from '../../model/Side.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneNode from '../SceneNode.js';
import GradientIndicatorNode from './GradientIndicatorNode.js';
import PaintChoiceGradientNode from './PaintChoiceGradientNode.js';
import SplotchControl from './SplotchControl.js';
import SplotchNode from './SplotchNode.js';

// constants
const SPLOTCH_ICON_OPTIONS = {
  scale: 0.5,
  useVisibleAmounts: false
};

/**
 * @constructor
 * @extends {SceneNode}
 *
 * @param {PaintScene} scene
 * @param {Bounds2} layoutBounds - bounds withing which the scene will be shown
 */
function PaintSceneNode( scene, layoutBounds ) {
  const self = this;

  // Left/right splotches for the showBoth ABSwitch
  const blueSplotch = new Splotch( 2, 0, new BooleanProperty( true ), new BooleanProperty( true ) );
  const greenSplotch = new Splotch( 1, 1, new BooleanProperty( true ), new BooleanProperty( true ) );

  // Create the left/right splotches and their NumberPickers
  const leftSplotchControl = new SplotchControl( scene.leftSplotch, scene.paintChoiceProperty, !scene.predictMode, Side.LEFT );
  const rightSplotchControl = new SplotchControl( scene.rightSplotch, scene.paintChoiceProperty, !scene.predictMode, Side.RIGHT );

  SceneNode.call( this, scene, layoutBounds, {
    sceneIcon: new Image( paintSceneImage, { scale: 0.17 } ),
    leftControl: leftSplotchControl,
    rightControl: rightSplotchControl,
    leftSwitchIcon: new HBox( {
      spacing: 10,
      children: [
        new SplotchNode( blueSplotch, scene.paintChoiceProperty, SPLOTCH_ICON_OPTIONS )
      ]
    } ),
    rightSwitchIcon: new HBox( {
      spacing: 10,
      children: [
        new SplotchNode( blueSplotch, scene.paintChoiceProperty, SPLOTCH_ICON_OPTIONS ),
        new SplotchNode( greenSplotch, scene.paintChoiceProperty, SPLOTCH_ICON_OPTIONS )
      ]
    } )
  } );

  // When the ABSwitch is toggled, show one/both of the splotches.
  scene.showBothProperty.link( function( showBoth ) {
    if ( showBoth ) {
      const ratio = 4 / 13;
      leftSplotchControl.x = layoutBounds.width * ratio;
      rightSplotchControl.x = layoutBounds.width * ( 1 - ratio );
    }
    else {
      leftSplotchControl.x = layoutBounds.width / 2;
    }
    self.updateControlButton();
  } );

  this.addChild( new VerticalAquaRadioButtonGroup( scene.paintChoiceProperty,
    PaintChoice.CHOICES.map( function( paintChoice ) {
      const gradientNode = new PaintChoiceGradientNode( 25, 220, paintChoice, {
        rotation: -Math.PI / 2, scale: 0.5
      } );
      return {
        node: new AlignBox( gradientNode, { leftMargin: 5 } ),
        value: paintChoice
      };
    } ), {
      // options
      spacing: 10,
      left: layoutBounds.left + 15,
      bottom: layoutBounds.bottom - 15
    } ) );

  this.addChild( new GradientIndicatorNode( layoutBounds, scene, scene.revealProperty, {
    centerY: ProportionPlaygroundConstants.CONTROL_Y_OFFSET
  } ) );
}

proportionPlayground.register( 'PaintSceneNode', PaintSceneNode );

inherit( SceneNode, PaintSceneNode );
export default PaintSceneNode;