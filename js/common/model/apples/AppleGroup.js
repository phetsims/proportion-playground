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
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );
  var Range = require( 'DOT/Range' );

  /**
   * @constructor
   *
   * @param {number} initialCost - Intial total cost of all apples
   * @param {number} initialApples - Initial number of apples
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   */
  function AppleGroup( initialCost, initialApples, visibleProperty, controlsVisibleProperty ) {

    // @public {NumberProperty} - Total cost of all of the apples
    this.totalCostProperty = new NumberProperty( initialCost );

    // @public {NumberProperty} - How many apples are in this group
    this.numberOfApplesProperty = new NumberProperty( initialApples );

    // @public {Range}
    //TODO: do we need this outside of the SceneRatio call?
    this.totalCostRange = new Range( 0, 20 );

    // @public {Range}
    //TODO: do we need this outside of the SceneRatio call?
    this.numberOfApplesRange = new Range( 1, 20 );

    SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
                     this.totalCostProperty, this.totalCostRange,
                     this.numberOfApplesProperty, this.numberOfApplesRange );
  }

  proportionPlayground.register( 'AppleGroup', AppleGroup );

  return inherit( SceneRatio, AppleGroup );
} );
