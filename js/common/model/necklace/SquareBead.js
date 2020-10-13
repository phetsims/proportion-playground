// Copyright 2017-2020, University of Colorado Boulder

/**
 * Simple model for the position of a square bead
 *
 * @author Jonathan Olson
 */

import proportionPlayground from '../../../proportionPlayground.js';

class SquareBead {
  /**
   * @param {Vector2} center - The center (in model coordinates) of the bead.
   * @param {number} angle - Rotation applied to the bead, so it is aligned along the necklace's string.
   */
  constructor( center, angle ) {

    // @public {Vector2}
    this.center = center;

    // @public {number}
    this.angle = angle;
  }
}

proportionPlayground.register( 'SquareBead', SquareBead );

export default SquareBead;
