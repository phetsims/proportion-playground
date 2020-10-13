// Copyright 2016-2020, University of Colorado Boulder

/**
 * Model for a single group of apples (green or red but not both) in the apples scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneRatio from '../SceneRatio.js';

class AppleGroup extends SceneRatio {
  /**
   * @param {number} initialCost - Initial total cost of all apples
   * @param {number} initialApples - Initial number of apples
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   */
  constructor( initialCost, initialApples, visibleProperty, controlsVisibleProperty ) {

    const totalCostProperty = new NumberProperty( initialCost );
    const numberOfApplesProperty = new NumberProperty( initialApples );

    super( visibleProperty, controlsVisibleProperty,
      totalCostProperty, ProportionPlaygroundConstants.APPLE_TOTAL_COST_RANGE,
      numberOfApplesProperty, ProportionPlaygroundConstants.APPLE_COUNT_RANGE );

    // @public {NumberProperty} - Total cost of all of the apples
    this.totalCostProperty = totalCostProperty;

    // @public {NumberProperty} - How many apples are in this group
    this.numberOfApplesProperty = numberOfApplesProperty;
  }
}

proportionPlayground.register( 'AppleGroup', AppleGroup );

export default AppleGroup;