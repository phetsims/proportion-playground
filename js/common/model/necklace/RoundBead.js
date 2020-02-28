// Copyright 2017-2020, University of Colorado Boulder

/**
 * Simple model for the location of a round bead
 *
 * @author Jonathan Olson
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';

/**
 * @constructor
 *
 * @param {Vector2} center - The center (in model coordinates) of the bead
 */
function RoundBead( center ) {

  // @public {Vector2}
  this.center = center;
}

proportionPlayground.register( 'RoundBead', RoundBead );

inherit( Object, RoundBead );
export default RoundBead;