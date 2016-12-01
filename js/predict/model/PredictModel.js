// Copyright 2016, University of Colorado Boulder

/**
 * Model for the Predict screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionModel = require( 'PROPORTION_PLAYGROUND/explore/model/ProportionModel' );

  /**
   * @constructor
   */
  function PredictModel() {
    ProportionModel.call( this, true );
  }

  proportionPlayground.register( 'PredictModel', PredictModel );

  return inherit( ProportionModel, PredictModel );
} );
