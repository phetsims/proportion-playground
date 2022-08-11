// Copyright 2016-2022, University of Colorado Boulder

/**
 * The model for the paint scene, which contains two splotches.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import ReferenceIO from '../../../../../tandem/js/types/ReferenceIO.js';
import proportionPlayground from '../../../proportionPlayground.js';
import Scene from '../Scene.js';
import SceneRatio from '../SceneRatio.js';
import PaintChoice from './PaintChoice.js';
import Splotch from './Splotch.js';

class PaintScene extends Scene {
  /**
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @param {Tandem} tandem
   */
  constructor( predictMode, tandem ) {
    assert && assert( tandem );

    super( predictMode, tandem );

    // @public {Property.<PaintChoice>} - What two paints (left and right) are currently used.
    this.paintChoiceProperty = new Property( PaintChoice.BLUE_YELLOW, {
      phetioValueType: ReferenceIO( PaintChoice.PaintChoiceIO ),
      tandem: tandem.createTandem( 'paintChoiceProperty' )
    } );

    const initialCount = predictMode ? 5 : 0;

    // @public (read-only) - the models for each splotch
    this.leftSplotch = new Splotch( initialCount, initialCount, this.leftVisibleProperty, this.leftControlsVisibleProperty, tandem.createTandem( 'leftSplotch' ) );
    this.rightSplotch = new Splotch( initialCount, initialCount, this.rightVisibleProperty, this.rightControlsVisibleProperty, tandem.createTandem( 'rightSplotch' ) );

    this.initializeRatios( this.leftSplotch, this.rightSplotch );
  }

  /**
   * Returns whether our two (visible) ratios are equivalent (handling division by 0 properly).
   * @public
   *
   * @returns {boolean}
   */
  areVisualRatiosEquivalent() {
    return SceneRatio.areRatiosEquivalent( this.leftSplotch.visibleLeftColorProperty.value,
      this.leftSplotch.visibleRightColorProperty.value,
      this.rightSplotch.visibleLeftColorProperty.value,
      this.rightSplotch.visibleRightColorProperty.value );
  }

  /**
   * Steps forward in time
   * @public
   *
   * @param {number} dt - In seconds
   */
  step( dt ) {
    this.leftSplotch.step( dt );
    this.rightSplotch.step( dt );
  }

  /**
   * Reset the model and both child splotches.
   * @public
   * @override
   */
  reset() {
    super.reset();

    this.paintChoiceProperty.reset();
  }
}

proportionPlayground.register( 'PaintScene', PaintScene );

export default PaintScene;