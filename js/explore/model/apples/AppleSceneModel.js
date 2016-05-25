// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var AppleGroupModel = require( 'PROPORTION_PLAYGROUND/explore/model/apples/AppleGroupModel' );
  var ExploreSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreSceneModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function AppleSceneModel( predictMode ) {
    ExploreSceneModel.call( this, predictMode, {
      showBothAppleGroups: false,
      showCostPerApple: false
    } );

    // TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.showBothAppleGroupsProperty = this.showBothAppleGroupsProperty || null;
    this.showCostPerAppleProperty = this.showCostPerAppleProperty || null;

    this.redAppleGroup = new AppleGroupModel();
    this.greenAppleGroup = new AppleGroupModel();

    predictMode && this.registerChangeProperties( [
      this.redAppleGroup.numberOfApplesProperty,
      this.redAppleGroup.totalCostProperty,
      this.greenAppleGroup.numberOfApplesProperty,
      this.greenAppleGroup.totalCostProperty
    ] );
  }

  proportionPlayground.register( 'AppleSceneModel', AppleSceneModel );

  return inherit( ExploreSceneModel, AppleSceneModel, {
    reset: function() {
      ExploreSceneModel.prototype.reset.call( this );
      this.redAppleGroup.reset();
      this.greenAppleGroup.reset();
    }
  } );
} );