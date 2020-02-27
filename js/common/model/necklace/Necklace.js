// Copyright 2016-2019, University of Colorado Boulder

/**
 * The model for a single necklace, which is a collection of round and square beads.  The pattern (order of beads)
 * is implemented in the view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneRatio from '../SceneRatio.js';
import NecklaceLayout from './NecklaceLayout.js';

/**
 * @constructor
 * @extends {SceneRatio}
 *
 * @param {number} initialRoundCount - Initial number of round beads
 * @param {number} initialSquareCount - Initial number of square beads
 * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
 * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
 */
function Necklace( initialRoundCount, initialSquareCount, visibleProperty, controlsVisibleProperty ) {
  // @public {NumberProperty} - Quantity of round beads in the necklace
  this.roundBeadCountProperty = new NumberProperty( initialRoundCount );

  // @public {NumberProperty} - Quantity of square beads in the necklace
  this.squareBeadCountProperty = new NumberProperty( initialSquareCount );

  // @public {Property.<NecklaceLayout>}
  this.layoutProperty = new DerivedProperty( [
      this.roundBeadCountProperty,
      this.squareBeadCountProperty ],
    function( roundBeadCount, squareBeadCount ) {
      return NecklaceLayout.getLayout( roundBeadCount, squareBeadCount );
    } );

  SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
    this.roundBeadCountProperty, ProportionPlaygroundConstants.BEAD_COUNT_RANGE,
    this.squareBeadCountProperty, ProportionPlaygroundConstants.BEAD_COUNT_RANGE );
}

proportionPlayground.register( 'Necklace', Necklace );

inherit( SceneRatio, Necklace );
export default Necklace;