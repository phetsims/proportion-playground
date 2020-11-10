// Copyright 2016-2020, University of Colorado Boulder

/**
 * Shows a group of 4 radio buttons that allows switching between different scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import AlignBox from '../../../../scenery/js/nodes/AlignBox.js';
import AlignGroup from '../../../../scenery/js/nodes/AlignGroup.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from './ProportionPlaygroundColorProfile.js';

class SceneSelectionControls extends RectangularRadioButtonGroup {
  /**
   * @param {Property.<Scene>} sceneProperty - Determines which scene is visible
   * @param {Array.<SceneNode>} sceneNodes - Each sceneNode has a scene and an icon
   * @param {Tandem} tandem
   * @param {Object} [options] - node options
   */
  constructor( sceneProperty, sceneNodes, tandem, options ) {
    const group = new AlignGroup();
    const ratioItems = sceneNodes.map( sceneNode => ( {
      value: sceneNode.scene,
      node: new AlignBox( sceneNode.sceneIcon, { group: group } ),
      tandemName: sceneNode.tandem.name + 'RadioButton'
    } ) );

    options = merge( {
      orientation: 'horizontal',
      buttonContentXMargin: 20,
      buttonContentYMargin: 12,
      selectedLineWidth: 2,
      selectedStroke: ProportionPlaygroundColorProfile.sceneSelectionBorderProperty,
      baseColor: ProportionPlaygroundColorProfile.sceneSelectionBackgroundProperty,
      tandem: tandem
    }, options );

    super( sceneProperty, ratioItems, options );
  }
}

proportionPlayground.register( 'SceneSelectionControls', SceneSelectionControls );

export default SceneSelectionControls;