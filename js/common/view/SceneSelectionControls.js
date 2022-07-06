// Copyright 2016-2021, University of Colorado Boulder

/**
 * Shows a group of 4 radio buttons that allows switching between different scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { AlignBox } from '../../../../scenery/js/imports.js';
import { AlignGroup } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundColors from './ProportionPlaygroundColors.js';

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
      tandemName: `${sceneNode.tandem.name}RadioButton`
    } ) );

    options = merge( {
      orientation: 'horizontal',
      radioButtonOptions: {
        xMargin: 20,
        yMargin: 12,
        selectedLineWidth: 2,
        selectedStroke: ProportionPlaygroundColors.sceneSelectionBorderProperty,
        baseColor: ProportionPlaygroundColors.sceneSelectionBackgroundProperty
      },
      tandem: tandem
    }, options );

    super( sceneProperty, ratioItems, options );
  }
}

proportionPlayground.register( 'SceneSelectionControls', SceneSelectionControls );

export default SceneSelectionControls;