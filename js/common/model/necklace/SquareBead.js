// Copyright 2017-2020, University of Colorado Boulder

/**
 * Simple model for the position of a square bead
 *
 * @author Jonathan Olson
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';

/**
 * @constructor
 *
 * @param {Vector2} center - The center (in model coordinates) of the bead.
 * @param {number} angle - Rotation applied to the bead, so it is aligned along the necklace's string.
 */
function SquareBead( center, angle ) {

  // @public {Vector2}
  this.center = center;

  // @public {number}
  this.angle = angle;
}

proportionPlayground.register( 'SquareBead', SquareBead );

inherit( Object, SquareBead );
export default SquareBead;
