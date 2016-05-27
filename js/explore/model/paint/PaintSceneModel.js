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
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchModel = require( 'PROPORTION_PLAYGROUND/explore/model/paint/SplotchModel' );
  var ExploreSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreSceneModel' );

  /**
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function PaintSceneModel( predictMode ) {
    ExploreSceneModel.call( this, predictMode, {
      grayscale: false // {boolean} @public - whether the paints should be shown from black to white
    } );

    // @public (read-only) These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.grayscaleProperty = this.grayscaleProperty || null;

    // @public (read-only) - the models for each splotch
    this.splotch1Model = new SplotchModel();
    this.splotch2Model = new SplotchModel();

    predictMode && this.registerChangeProperties( [
      this.splotch1Model.color1CountProperty,
      this.splotch1Model.color2CountProperty,
      this.splotch2Model.color1CountProperty,
      this.splotch2Model.color2CountProperty
    ] );
  }

  proportionPlayground.register( 'PaintSceneModel', PaintSceneModel );

  return inherit( ExploreSceneModel, PaintSceneModel, {

    /**
     * Reset the model and both child splotches.
     * @public
     */
    reset: function() {
      ExploreSceneModel.prototype.reset.call( this );
      this.splotch1Model.reset();
      this.splotch2Model.reset();
    }
  } );
} );