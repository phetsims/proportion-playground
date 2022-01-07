// Copyright 2017-2022, University of Colorado Boulder

/**
 * Enumeration for which side our ratio is on (the left or right, where if only one is visible, it's the left)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import proportionPlayground from '../../proportionPlayground.js';

const Side = EnumerationDeprecated.byKeys( [
  'LEFT',
  'RIGHT'
], {
  beforeFreeze( Side ) {
    Side.opposite = side => {
      assert && assert( Side.includes( side ) );

      return ( side === Side.LEFT ) ? Side.RIGHT : Side.LEFT;
    };
  }
} );

proportionPlayground.register( 'Side', Side );
export default Side;