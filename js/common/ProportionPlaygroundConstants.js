// Copyright 2016-2020, University of Colorado Boulder

/**
 * Constants for the Proportions Playground sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Range from '../../../dot/js/Range.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import proportionPlayground from '../proportionPlayground.js';

const ProportionPlaygroundConstants = {
  // @public {number} - Diameter/width of the beads in the necklace scene
  BEAD_DIAMETER: 18,
  BUTTON_RIGHT_CENTER_OFFSET: 42,

  // @public {number} - For manually positioned scenes/controls, the y position of the controls
  CONTROL_Y_OFFSET: 250,

  // @public {PhetFont}
  CONTROL_FONT: new PhetFont( 22 ),
  APPLE_PRICE_FONT: new PhetFont( 25 ),

  // @public {Range}
  BEAD_COUNT_RANGE: new Range( 0, 20 ),
  BILLIARDS_COUNT_RANGE: new Range( 1, 20 ),
  APPLE_TOTAL_COST_RANGE: new Range( 0, 20 ),
  APPLE_COUNT_RANGE: new Range( 1, 20 ),
  PAINT_COUNT_RANGE: new Range( 0, 20 )
};

proportionPlayground.register( 'ProportionPlaygroundConstants', ProportionPlaygroundConstants );

export default ProportionPlaygroundConstants;
