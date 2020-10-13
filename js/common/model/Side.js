// Copyright 2017-2020, University of Colorado Boulder

/**
 * Enumeration for which side our ratio is on (the left or right, where if only one is visible, it's the left)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import proportionPlayground from '../../proportionPlayground.js';

const Side = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

proportionPlayground.register( 'Side', Side );

Side.SIDES = [ Side.LEFT, Side.RIGHT ];

Side.isSide = side => _.includes( Side.SIDES, side );

Side.opposite = side => {
  assert && assert( Side.isSide( side ) );

  return ( side === Side.LEFT ) ? Side.RIGHT : Side.LEFT;
};

export default Side;