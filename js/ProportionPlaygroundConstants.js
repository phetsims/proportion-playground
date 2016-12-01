// Copyright 2016, University of Colorado Boulder

/**
 * Constants for the Proportions Playground sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  var ProportionPlaygroundConstants = {
    BEAD_DIAMETER: 18,
    BEADS_PINK: '#d0275c',
    BEADS_BLUE: '#2f358f',
    CONTROL_FONT_SIZE: 22,
    BILLIARDS_BROWN: '#73481d',
    BILLIARDS_GREEN: '#0a6739',
    SCREEN_BACKGROUND_COLOR: '#fcf3eb',
    MAX_BEADS: 20
  };
  proportionPlayground.register( 'ProportionPlaygroundConstants', ProportionPlaygroundConstants );

  return ProportionPlaygroundConstants;
} );
