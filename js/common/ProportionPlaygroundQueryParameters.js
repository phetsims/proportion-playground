// Copyright 2016-2017, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  var ProportionPlaygroundQueryParameters = QueryStringMachine.getAll( {

    // allow launching a specific Explore scene, 0-based index
    scene: {
      type: 'number',
      defaultValue: 0
    }
  } );

  proportionPlayground.register( 'ProportionPlaygroundQueryParameters', ProportionPlaygroundQueryParameters );

  return ProportionPlaygroundQueryParameters;
} );
