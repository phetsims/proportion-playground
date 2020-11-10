// Copyright 2016-2020, University of Colorado Boulder

/**
 * Model for the Apple Scene, which includes two groups of apples, red and green.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import proportionPlayground from '../../../proportionPlayground.js';
import Scene from '../Scene.js';
import AppleGroup from './AppleGroup.js';

class AppleScene extends Scene {
  /**
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @param {Tandem} tandem
   */
  constructor( predictMode, tandem ) {
    assert && assert( tandem );

    super( predictMode, tandem );

    // @public {BooleanProperty}
    this.showCostPerAppleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showCostPerAppleProperty' )
    } );

    const initialCost = predictMode ? 5 : 0;
    const initialApples = predictMode ? 5 : 1;

    // @public {AppleGroup}
    this.leftAppleGroup = new AppleGroup( initialCost, initialApples, this.leftVisibleProperty, this.leftControlsVisibleProperty, tandem.createTandem( 'leftAppleGroup' ) );
    this.rightAppleGroup = new AppleGroup( initialCost, initialApples, this.rightVisibleProperty, this.rightControlsVisibleProperty, tandem.createTandem( 'rightAppleGroup' ) );

    this.initializeRatios( this.leftAppleGroup, this.rightAppleGroup );
  }

  /**
   * Reset the model
   * @public
   * @override
   */
  reset() {
    super.reset();

    this.showCostPerAppleProperty.reset();
  }
}

proportionPlayground.register( 'AppleScene', AppleScene );

export default AppleScene;