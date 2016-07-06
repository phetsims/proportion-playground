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
    beadDiameter: 18,
    BEADS_PINK: '#d0275c',
    BEADS_BLUE: '#2f358f',
    controlFontSize: 22,
    billiardsBrown: '#73481d',
    billiardsGreen: '#0a6739',
    screenBackgroundColor: '#fcf3eb',
    maxBeads: 20
  };
  proportionPlayground.register( 'ProportionPlaygroundConstants', ProportionPlaygroundConstants );

  return ProportionPlaygroundConstants;
} );