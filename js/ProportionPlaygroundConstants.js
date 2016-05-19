// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  var ProportionPlaygroundConstants = {
    beadDiameter: 20
  };
  proportionPlayground.register( 'ProportionPlaygroundConstants', ProportionPlaygroundConstants );

  return ProportionPlaygroundConstants;
} );