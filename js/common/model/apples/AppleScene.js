// Copyright 2016-2019, University of Colorado Boulder

/**
 * Model for the Apple Scene, which includes two groups of apples, red and green.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AppleGroup = require( 'PROPORTION_PLAYGROUND/common/model/apples/AppleGroup' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const Scene = require( 'PROPORTION_PLAYGROUND/common/model/Scene' );

  /**
   * @constructor
   * @extends {Scene}
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function AppleScene( predictMode ) {
    Scene.call( this, predictMode );

    // @public {BooleanProperty}
    this.showCostPerAppleProperty = new BooleanProperty( false );

    const initialCost = predictMode ? 5 : 0;
    const initialApples = predictMode ? 5 : 1;

    // @public {AppleGroup}
    this.leftAppleGroup = new AppleGroup( initialCost, initialApples, this.leftVisibleProperty, this.leftControlsVisibleProperty );
    this.rightAppleGroup = new AppleGroup( initialCost, initialApples, this.rightVisibleProperty, this.rightControlsVisibleProperty );

    this.initializeRatios( this.leftAppleGroup, this.rightAppleGroup );
  }

  proportionPlayground.register( 'AppleScene', AppleScene );

  return inherit( Scene, AppleScene, {
    /**
     * Reset the model
     * @public
     * @override
     */
    reset: function() {
      Scene.prototype.reset.call( this );

      this.showCostPerAppleProperty.reset();
    }
  } );
} );
