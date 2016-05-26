// Copyright 2016, University of Colorado Boulder

/**
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
   * @param {ProportionPlaygroundModel} proportionPlaygroundModel
   * @constructor
   */
  function PredictScreenView( proportionPlaygroundModel ) {
    ExploreScreenView.call( this, proportionPlaygroundModel );
  }

  proportionPlayground.register( 'PredictScreenView', PredictScreenView );

  return inherit( ScreenView, PredictScreenView );
} );