// Copyright 2016-2020, University of Colorado Boulder

/**
 * Shows a group of 4 radio buttons that allows switching between different scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import AlignBox from '../../../../scenery/js/nodes/AlignBox.js';
import AlignGroup from '../../../../scenery/js/nodes/AlignGroup.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MutableOptionsNode from '../../../../sun/js/MutableOptionsNode.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from './ProportionPlaygroundColorProfile.js';

class SceneSelectionControls extends Node {
  /**
   * @param {Property.<Scene>} sceneProperty - Determines which scene is visible
   * @param {Array.<SceneNode>} sceneNodes - Each sceneNode has a scene and an icon
   * @param {Object} [options] - node options
   */
  constructor( sceneProperty, sceneNodes, options ) {
    super();

    const group = new AlignGroup();
    const ratioItems = sceneNodes.map( sceneNode => ( {
        value: sceneNode.scene,
        node: new AlignBox( sceneNode.sceneIcon, { group: group } )
      } ) );

    // We need to be able to change the colors of this node, so it's wrapped in a MutableOptionsNode.
    this.addChild( new MutableOptionsNode( RadioButtonGroup, [ sceneProperty, ratioItems ], {
      orientation: 'horizontal',
      buttonContentXMargin: 20,
      buttonContentYMargin: 12,
      selectedLineWidth: 2
    }, {
      selectedStroke: ProportionPlaygroundColorProfile.sceneSelectionBorderProperty,
      baseColor: ProportionPlaygroundColorProfile.sceneSelectionBackgroundProperty
    } ) );

    this.mutate( options );
  }
}

proportionPlayground.register( 'SceneSelectionControls', SceneSelectionControls );

export default SceneSelectionControls;