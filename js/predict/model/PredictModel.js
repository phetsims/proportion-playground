// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ExploreModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreModel' );

  /**
   * @constructor
   */
  function PredictModel() {
    ExploreModel.call( this, true );
  }

  proportionPlayground.register( 'PredictModel', PredictModel );

  return inherit( ExploreModel, PredictModel );
} );