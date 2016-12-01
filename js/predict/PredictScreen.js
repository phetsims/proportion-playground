// Copyright 2016, University of Colorado Boulder

/**
 * Model & View for the "Predict" screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  var ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Property = require( 'AXON/Property' );
  var Color = require( 'SCENERY/util/Color' );

  // strings
  var predictString = require( 'string!PROPORTION_PLAYGROUND/predict' );

  /**
   * @constructor
   */
  function PredictScreen() {

    var options = {
      name: predictString,
      backgroundColorProperty: new Property( Color.toColor( ProportionPlaygroundConstants.SCREEN_BACKGROUND_COLOR ) )
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new ProportionModel( true ); },
      function( model ) { return new ProportionScreenView( model ); },
      options );
  }

  proportionPlayground.register( 'PredictScreen', PredictScreen );

  return inherit( Screen, PredictScreen );
} );
