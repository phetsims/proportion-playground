// Copyright 2016, University of Colorado Boulder

/**
 * View node for the Predict Screen
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ExploreScreenView = require( 'PROPORTION_PLAYGROUND/explore/view/ExploreScreenView' );

  /**
   * @param {ProportionModel} exploreModel
   * @constructor
   */
  function PredictScreenView( exploreModel ) {
    ExploreScreenView.call( this, exploreModel );
  }

  proportionPlayground.register( 'PredictScreenView', PredictScreenView );

  return inherit( ScreenView, PredictScreenView );
} );
