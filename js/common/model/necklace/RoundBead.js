// Copyright 2017-2020, University of Colorado Boulder

/**
 * Simple model for the position of a round bead
 *
 * @author Jonathan Olson
 */

import proportionPlayground from '../../../proportionPlayground.js';

class RoundBead {
  /**
   * @param {Vector2} center - The center (in model coordinates) of the bead
   */
  constructor( center ) {

    // @public {Vector2}
    this.center = center;
  }
}

proportionPlayground.register( 'RoundBead', RoundBead );

export default RoundBead;
