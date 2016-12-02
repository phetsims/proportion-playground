// Copyright 2016, University of Colorado Boulder

/**
 * The model for the paint scene, which contains two splotches.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Splotch = require( 'PROPORTION_PLAYGROUND/common/model/paint/Splotch' );
  var Scene = require( 'PROPORTION_PLAYGROUND/common/model/Scene' );

  /**
   * @constructor
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function PaintScene( predictMode ) {
    Scene.call( this, predictMode );

    // @public {BooleanProperty} - Whether the paints should be shown in shades of black and white
    this.grayscaleProperty = new BooleanProperty( false );

    // @public (read-only) - the models for each splotch
    this.leftSplotch = new Splotch( this.leftVisibleProperty );
    this.rightSplotch = new Splotch( this.rightVisibleProperty );

    this.initializeRatios( this.leftSplotch, this.rightSplotch );
  }

  proportionPlayground.register( 'PaintScene', PaintScene );

  return inherit( Scene, PaintScene, {
    /**
     * Reset the model and both child splotches.
     * @public
     */
    reset: function() {
      Scene.prototype.reset.call( this );

      this.grayscaleProperty.reset();
    }
  } );
} );
