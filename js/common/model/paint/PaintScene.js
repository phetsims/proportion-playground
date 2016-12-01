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
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function PaintScene( predictMode ) {
    Scene.call( this, predictMode );

    // @public {BooleanProperty} - Whether the paints should be shown in shades of black and white
    this.grayscaleProperty = new BooleanProperty( false );

    // @public (read-only) - the models for each splotch
    this.splotch1Model = new Splotch();
    this.splotch2Model = new Splotch();

    predictMode && this.registerChangeProperties( [
      this.splotch1Model.color1CountProperty,
      this.splotch1Model.color2CountProperty,
      this.splotch2Model.color1CountProperty,
      this.splotch2Model.color2CountProperty
    ] );
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

      this.splotch1Model.reset();
      this.splotch2Model.reset();
    }
  } );
} );
