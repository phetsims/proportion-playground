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
    this.leftNecklace = new Necklace( this.leftVisibleProperty );
    this.rightNecklace = new Necklace( this.rightVisibleProperty );

    this.initializeRatios( this.leftNecklace, this.rightNecklace );
  }

  proportionPlayground.register( 'NecklaceScene', NecklaceScene );

  return inherit( Scene, NecklaceScene );
} );
