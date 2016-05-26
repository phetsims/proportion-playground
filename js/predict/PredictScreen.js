// Copyright 2016, University of Colorado Boulder

/**
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

  // strings
  var predictString = require( 'string!PROPORTION_PLAYGROUND/predict' );

  /**
   * @constructor
   */
  function PredictScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = new Rectangle( 0, 0, 548, 373, { fill: 'green' } );

    Screen.call( this, predictString, icon,
      function() { return new PredictModel(); },
      function( model ) { return new PredictScreenView( model ); }, {
        backgroundColor: '#fcf3eb' // TODO: Factor out
      } 
    );
  }

  proportionPlayground.register( 'PredictScreen', PredictScreen );

  return inherit( Screen, PredictScreen );
} );