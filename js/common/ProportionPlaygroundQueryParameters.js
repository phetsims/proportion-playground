// Copyright 2016-2025, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
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