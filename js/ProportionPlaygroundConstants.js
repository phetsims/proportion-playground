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
  var Range = require( 'DOT/Range' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  var ProportionPlaygroundConstants = {
    // @public {Bounds2} - Bounds in which our sim is positioned.
    LAYOUT_BOUNDS: new Bounds2( 0, 0, 1024, 618 ),

    // @public {number} - Diameter/width of the beads in the necklace scene
    BEAD_DIAMETER: 18,

    // @public {PhetFont}
    CONTROL_FONT: new PhetFont( 22 ),

    // @public {Range}
    BEAD_COUNT_RANGE: new Range( 0, 20 )
  };

  proportionPlayground.register( 'ProportionPlaygroundConstants', ProportionPlaygroundConstants );

  return ProportionPlaygroundConstants;
} );
