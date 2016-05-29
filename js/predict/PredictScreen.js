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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // strings
  var predictString = require( 'string!PROPORTION_PLAYGROUND/predict' );

  /**
   * @constructor
   */
  function PredictScreen() {

    var icon = new Rectangle( 0, 0, 548, 373, { fill: 'green' } );

    Screen.call( this, predictString, icon,
      function() { return new PredictModel(); },
      function( model ) { return new PredictScreenView( model ); }, {
        backgroundColor: ProportionPlaygroundConstants.screenBackgroundColor
      }
    );
  }

  proportionPlayground.register( 'PredictScreen', PredictScreen );

  return inherit( Screen, PredictScreen );
} );