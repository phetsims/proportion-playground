// Copyright 2016, University of Colorado Boulder

/**
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

  function PaintSceneModel( predictMode ) {
    ExploreSceneModel.call( this, predictMode, {
      grayscale: false
    } );

    // These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.grayscaleProperty = this.grayscaleProperty || null;

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
    reset: function() {
      ExploreSceneModel.prototype.reset.call( this );
      this.splotch1Model.reset();
      this.splotch2Model.reset();
    }
  } );
} );