// Copyright 2016-2017, University of Colorado Boulder

/**
 * Model for the Apple Scene, which includes two groups of apples, red and green.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AppleGroup = require( 'PROPORTION_PLAYGROUND/common/model/apples/AppleGroup' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Scene = require( 'PROPORTION_PLAYGROUND/common/model/Scene' );

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

    var initialCost = predictMode ? 5 : 0;
    var initialApples = predictMode ? 5 : 1;

    // @public {AppleGroup}
    this.redAppleGroup = new AppleGroup( initialCost, initialApples, this.leftVisibleProperty, this.leftControlsVisibleProperty );
    this.greenAppleGroup = new AppleGroup( initialCost, initialApples, this.rightVisibleProperty, this.rightControlsVisibleProperty );

    this.initializeRatios( this.redAppleGroup, this.greenAppleGroup );
  }

  proportionPlayground.register( 'AppleScene', AppleScene );

  return inherit( Scene, AppleScene, {
    /**
     * Reset the model
     * @public
     */
    reset: function() {
      Scene.prototype.reset.call( this );

      this.showCostPerAppleProperty.reset();
    }
  } );
} );
