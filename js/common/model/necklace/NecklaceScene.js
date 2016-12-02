// Copyright 2016, University of Colorado Boulder

/**
 * Model for the necklace scene, which contains two necklaces.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Scene = require( 'PROPORTION_PLAYGROUND/common/model/Scene' );

  function NecklaceScene( predictMode ) {
    Scene.call( this, predictMode );

    // @public
    this.leftNecklace = new Necklace();
    this.rightNecklace = new Necklace();

    predictMode && this.registerChangeProperties( [
      this.leftNecklace.roundBeadCountProperty,
      this.leftNecklace.squareBeadCountProperty,
      this.rightNecklace.roundBeadCountProperty,
      this.rightNecklace.squareBeadCountProperty
    ] );
  }

  proportionPlayground.register( 'NecklaceScene', NecklaceScene );

  return inherit( Scene, NecklaceScene, {
    /**
     * Resets the entire scene model
     * @public
     */
    reset: function() {
      Scene.prototype.reset.call( this );

      this.leftNecklace.reset();
      this.rightNecklace.reset();
    }
  } );
} );
