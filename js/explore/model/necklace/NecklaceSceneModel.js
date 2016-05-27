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
  var NecklaceModel = require( 'PROPORTION_PLAYGROUND/explore/model/necklace/NecklaceModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ExploreSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreSceneModel' );

  function NecklaceSceneModel( predictMode ) {
    ExploreSceneModel.call( this, predictMode );

    // @public
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

    /**
     * Resets the entire scene model
     * @public
     */
    reset: function() {
      ExploreSceneModel.prototype.reset.call( this );
      this.necklace1Model.reset();
      this.necklace2Model.reset();
    }
  } );
} );