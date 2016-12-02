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
    // @public {BooleanProperty}
    this.showCostPerAppleProperty = new BooleanProperty( false );

    // @public
    this.redAppleGroup = new AppleGroup();
    this.greenAppleGroup = new AppleGroup();

    // @public {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
    this.quantityProperties = this.redAppleGroup.quantityProperties.concat( this.greenAppleGroup.quantityProperties );

    Scene.call( this, predictMode );
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

      this.redAppleGroup.reset();
      this.greenAppleGroup.reset();
    }
  } );
} );
