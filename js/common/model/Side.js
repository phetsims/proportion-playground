// Copyright 2017, University of Colorado Boulder

/**
 * Enumeration for which side our ratio is on (the left or right, where if only one is visible, it's the left)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  var Side = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
  };

  proportionPlayground.register( 'Side', Side );

  Side.SIDES = [ Side.LEFT, Side.RIGHT ];

  Side.isSide = function( side ) {
    return _.includes( Side.SIDES, side );
  };

  Side.opposite = function( side ) {
    assert && assert( Side.isSide( side ) );

    return ( side === Side.LEFT ) ? Side.RIGHT : Side.LEFT;
  };

  return Side;
} );
