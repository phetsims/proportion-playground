// Copyright 2016-2020, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import proportionPlayground from '../proportionPlayground.js';

const ProportionPlaygroundQueryParameters = QueryStringMachine.getAll( {

  // allow launching a specific Explore scene, 0-based index
  scene: {
    type: 'number',
    defaultValue: 0
  }
} );

proportionPlayground.register( 'ProportionPlaygroundQueryParameters', ProportionPlaygroundQueryParameters );

export default ProportionPlaygroundQueryParameters;