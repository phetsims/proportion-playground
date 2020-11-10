// Copyright 2016-2020, University of Colorado Boulder

/**
 * The model for a single necklace, which is a collection of round and square beads.  The pattern (order of beads)
 * is implemented in the view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneRatio from '../SceneRatio.js';
import NecklaceLayout from './NecklaceLayout.js';

class Necklace extends SceneRatio {
  /**
   * @param {number} initialRoundCount - Initial number of round beads
   * @param {number} initialSquareCount - Initial number of square beads
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   * @param {Tandem} tandem
   */
  constructor( initialRoundCount, initialSquareCount, visibleProperty, controlsVisibleProperty, tandem ) {
    const roundBeadCountProperty = new NumberProperty( initialRoundCount, {
      range: ProportionPlaygroundConstants.BEAD_COUNT_RANGE,
      numberType: 'Integer',
      tandem: tandem.createTandem( 'roundBeadCountProperty' )
    } );
    const squareBeadCountProperty = new NumberProperty( initialSquareCount, {
      range: ProportionPlaygroundConstants.BEAD_COUNT_RANGE,
      numberType: 'Integer',
      tandem: tandem.createTandem( 'squareBeadCountProperty' )
    } );

    super( visibleProperty, controlsVisibleProperty,
      roundBeadCountProperty,
      squareBeadCountProperty,
      tandem );

    // @public {NumberProperty} - Quantity of round beads in the necklace
    this.roundBeadCountProperty = roundBeadCountProperty;

    // @public {NumberProperty} - Quantity of square beads in the necklace
    this.squareBeadCountProperty = squareBeadCountProperty;

    // @public {Property.<NecklaceLayout>}
    this.layoutProperty = new DerivedProperty( [
        this.roundBeadCountProperty,
        this.squareBeadCountProperty ],
      ( roundBeadCount, squareBeadCount ) => NecklaceLayout.getLayout( roundBeadCount, squareBeadCount ) );
  }
}

proportionPlayground.register( 'Necklace', Necklace );

export default Necklace;