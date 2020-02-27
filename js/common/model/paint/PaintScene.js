// Copyright 2016-2019, University of Colorado Boulder

/**
 * The model for the paint scene, which contains two splotches.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';
import Scene from '../Scene.js';
import SceneRatio from '../SceneRatio.js';
import PaintChoice from './PaintChoice.js';
import Splotch from './Splotch.js';

/**
 * @constructor
 * @extends {Scene}
 *
 * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
 */
function PaintScene( predictMode ) {
  Scene.call( this, predictMode );

  // @public {Property.<PaintChoice>} - What two paints (left and right) are currently used.
  this.paintChoiceProperty = new Property( PaintChoice.BLUE_YELLOW );

  const initialCount = predictMode ? 5 : 0;

  // @public (read-only) - the models for each splotch
  this.leftSplotch = new Splotch( initialCount, initialCount, this.leftVisibleProperty, this.leftControlsVisibleProperty );
  this.rightSplotch = new Splotch( initialCount, initialCount, this.rightVisibleProperty, this.rightControlsVisibleProperty );

  this.initializeRatios( this.leftSplotch, this.rightSplotch );
}

proportionPlayground.register( 'PaintScene', PaintScene );

export default inherit( Scene, PaintScene, {
  /**
   * Returns whether our two (visible) ratios are equivalent (handling division by 0 properly).
   * @public
   *
   * @returns {boolean}
   */
  areVisualRatiosEquivalent: function() {
    return SceneRatio.areRatiosEquivalent( this.leftSplotch.visibleLeftColorProperty.value,
      this.leftSplotch.visibleRightColorProperty.value,
      this.rightSplotch.visibleLeftColorProperty.value,
      this.rightSplotch.visibleRightColorProperty.value );
  },

  /**
   * Steps forward in time
   * @public
   *
   * @param {number} dt - In seconds
   */
  step: function( dt ) {
    this.leftSplotch.step( dt );
    this.rightSplotch.step( dt );
  },

  /**
   * Reset the model and both child splotches.
   * @public
   * @override
   */
  reset: function() {
    Scene.prototype.reset.call( this );

    this.paintChoiceProperty.reset();
  }
} );