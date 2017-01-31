// Copyright 2016, University of Colorado Boulder

/**
 * Constants for the Proportions Playground sim.
 *
 * TODO: should this move to common/ ?
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';
  var Bounds2 = require( 'DOT/Bounds2' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  var ProportionPlaygroundConstants = {
    LAYOUT_BOUNDS: new Bounds2( 0, 0, 1024, 618 ),

    BEAD_DIAMETER: 18,
    BEADS_PINK: 'hsl(355,75%,53%)', // #d0275c original hsl(341,68%,48%)
    BEADS_BLUE: 'hsl(206,65%,48%)', // #2f358f original hsl(236,51%,37%)
    CONTROL_FONT_SIZE: 22,
    MAX_BEADS: 20
  };

  proportionPlayground.register( 'ProportionPlaygroundConstants', ProportionPlaygroundConstants );

  return ProportionPlaygroundConstants;
} );
