// Copyright 2015-2016, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  var ProportionPlaygroundQueryParameters = QueryStringMachine.getAll( {

    // allow launching a specific explore scene, 0-based index
    scene: {
      type: 'number',
      defaultValue: 0
    }
  } );

  proportionPlayground.register( 'ProportionPlaygroundQueryParameters', ProportionPlaygroundQueryParameters );

  return ProportionPlaygroundQueryParameters;
} );
