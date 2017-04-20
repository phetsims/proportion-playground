// Copyright 2016, University of Colorado Boulder

/**
 * Model for a single group of apples (green or red but not both) in the apples scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );

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

  return inherit( SceneRatio, AppleGroup );
} );
