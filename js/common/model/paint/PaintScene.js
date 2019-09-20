// Copyright 2016-2019, University of Colorado Boulder

/**
 * The model for the paint scene, which contains two splotches.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  const Property = require( 'AXON/Property' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const Scene = require( 'PROPORTION_PLAYGROUND/common/model/Scene' );
  const SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );
  const Splotch = require( 'PROPORTION_PLAYGROUND/common/model/paint/Splotch' );

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

  return inherit( Scene, PaintScene, {
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
} );
