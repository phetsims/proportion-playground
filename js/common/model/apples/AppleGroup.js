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
   * @param {BooleanProperty} visibleProperty - Whether we are visible or not
   */
  function AppleGroup( visibleProperty ) {
    // @public {NumberProperty} - How many apples are in this group
    this.numberOfApplesProperty = new NumberProperty( 1 );

    // @public {NumberProperty} - Total cost of all of the apples
    this.totalCostProperty = new NumberProperty( 0 );

    // @public {Range}
    this.numberOfApplesRange = new Range( 1, 20 );

    // @public {Range}
    this.totalCostRange = new Range( 0, 20 );

    SceneRatio.call( this, visibleProperty, [
      this.numberOfApplesProperty,
      this.totalCostProperty
    ] );
  }

  proportionPlayground.register( 'AppleGroup', AppleGroup );

  return inherit( SceneRatio, AppleGroup );
} );
