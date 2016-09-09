// Copyright 2016, University of Colorado Boulder

/**
 * Model & View for the "Predict" screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var PredictModel = require( 'PROPORTION_PLAYGROUND/predict/model/PredictModel' );
  var PredictScreenView = require( 'PROPORTION_PLAYGROUND/predict/view/PredictScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // strings
  var predictString = require( 'string!PROPORTION_PLAYGROUND/predict' );

  /**
   * @constructor
   */
  function PredictScreen() {

    var options = {
      name: predictString,
      backgroundColor: ProportionPlaygroundConstants.SCREEN_BACKGROUND_COLOR
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new PredictModel(); },
      function( model ) { return new PredictScreenView( model ); },
      options );
  }

  proportionPlayground.register( 'PredictScreen', PredictScreen );

  return inherit( Screen, PredictScreen );
} );