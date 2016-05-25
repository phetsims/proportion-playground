// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NecklaceModel = require( 'PROPORTION_PLAYGROUND/explore/model/necklace/NecklaceModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ExploreSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreSceneModel' );

  function NecklaceSceneModel( predictMode ) {
    ExploreSceneModel.call( this, predictMode, {
      showBothNecklaces: false
    } );

    // These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.showBothNecklacesProperty = this.showBothNecklacesProperty || null;

    this.necklace1Model = new NecklaceModel();
    this.necklace2Model = new NecklaceModel();

    predictMode && this.registerChangeProperties( [
      this.necklace1Model.roundBeadCountProperty,
      this.necklace1Model.squareBeadCountProperty,
      this.necklace2Model.roundBeadCountProperty,
      this.necklace2Model.squareBeadCountProperty
    ] );
  }

  proportionPlayground.register( 'NecklaceSceneModel', NecklaceSceneModel );

  return inherit( ExploreSceneModel, NecklaceSceneModel, {
    reset: function() {
      ExploreSceneModel.prototype.reset.call( this );
      this.necklace1Model.reset();
      this.necklace2Model.reset();
    }
  } );
} );