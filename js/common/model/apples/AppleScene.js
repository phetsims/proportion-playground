// Copyright 2016, University of Colorado Boulder

/**
 * Model for the Apple Scene, which includes two groups of apples, red and green.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var AppleGroup = require( 'PROPORTION_PLAYGROUND/common/model/apples/AppleGroup' );
  var Scene = require( 'PROPORTION_PLAYGROUND/common/model/Scene' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function AppleScene( predictMode ) {
    Scene.call( this, predictMode );

    // @public {BooleanProperty}
    this.showCostPerAppleProperty = new BooleanProperty( false );

    // @public {AppleGroup}
    this.redAppleGroup = new AppleGroup( this.leftVisibleProperty );
    this.greenAppleGroup = new AppleGroup( this.rightVisibleProperty );

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
