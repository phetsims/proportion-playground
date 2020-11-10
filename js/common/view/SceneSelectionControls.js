// Copyright 2016-2020, University of Colorado Boulder

/**
 * Shows a group of 4 radio buttons that allows switching between different scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import AlignBox from '../../../../scenery/js/nodes/AlignBox.js';
import AlignGroup from '../../../../scenery/js/nodes/AlignGroup.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from './ProportionPlaygroundColorProfile.js';

class SceneSelectionControls extends Node {
  /**
   * @param {Property.<Scene>} sceneProperty - Determines which scene is visible
   * @param {Array.<SceneNode>} sceneNodes - Each sceneNode has a scene and an icon
   * @param {Tandem} tandem
   * @param {Object} [options] - node options
   */
  constructor( sceneProperty, sceneNodes, tandem, options ) {
    super();

    const group = new AlignGroup();
    const ratioItems = sceneNodes.map( sceneNode => ( {
      value: sceneNode.scene,
      node: new AlignBox( sceneNode.sceneIcon, { group: group } )
    } ) );

    this.addChild( new RectangularRadioButtonGroup( sceneProperty, ratioItems, {
      orientation: 'horizontal',
      buttonContentXMargin: 20,
      buttonContentYMargin: 12,
      selectedLineWidth: 2,
      selectedStroke: ProportionPlaygroundColorProfile.sceneSelectionBorderProperty,
      baseColor: ProportionPlaygroundColorProfile.sceneSelectionBackgroundProperty,
      tandem: tandem
    } ) );

    this.mutate( options );
  }
}

proportionPlayground.register( 'SceneSelectionControls', SceneSelectionControls );

export default SceneSelectionControls;