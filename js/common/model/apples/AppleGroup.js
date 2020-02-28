// Copyright 2016-2020, University of Colorado Boulder

/**
 * Model for a single group of apples (green or red but not both) in the apples scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneRatio from '../SceneRatio.js';

/**
 * @constructor
 * @extends {SceneRatio}
 *
 * @param {number} initialCost - Initial total cost of all apples
 * @param {number} initialApples - Initial number of apples
 * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
 * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
 */
function AppleGroup( initialCost, initialApples, visibleProperty, controlsVisibleProperty ) {

  // @public {NumberProperty} - Total cost of all of the apples
  this.totalCostProperty = new NumberProperty( initialCost );

  // @public {NumberProperty} - How many apples are in this group
  this.numberOfApplesProperty = new NumberProperty( initialApples );

  SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
    this.totalCostProperty, ProportionPlaygroundConstants.APPLE_TOTAL_COST_RANGE,
    this.numberOfApplesProperty, ProportionPlaygroundConstants.APPLE_COUNT_RANGE );
}

proportionPlayground.register( 'AppleGroup', AppleGroup );

inherit( SceneRatio, AppleGroup );
export default AppleGroup;