// Copyright 2016-2017, University of Colorado Boulder

/**
 * Model for the necklace scene, which contains two necklaces.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const Scene = require( 'PROPORTION_PLAYGROUND/common/model/Scene' );

  /**
   * @constructor
   * @extends {Scene}
   *
   * @param {boolean} predictMode - Whether there should be a 'reveal' button to help the user predict.
   */
  function NecklaceScene( predictMode ) {
    Scene.call( this, predictMode );

    var initialCount = predictMode ? 5 : 0;

    // @public
    this.leftNecklace = new Necklace( initialCount, initialCount, this.leftVisibleProperty, this.leftControlsVisibleProperty );
    this.rightNecklace = new Necklace( initialCount, initialCount, this.rightVisibleProperty, this.rightControlsVisibleProperty );

    this.initializeRatios( this.leftNecklace, this.rightNecklace );
  }

  proportionPlayground.register( 'NecklaceScene', NecklaceScene );

  return inherit( Scene, NecklaceScene );
} );
