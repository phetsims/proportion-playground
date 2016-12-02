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
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Range = require( 'DOT/Range' );

  /**
   *
   * @constructor
   */
  function AppleGroup() {
    // @public {NumberProperty} - How many apples are in this group
    this.numberOfApplesProperty = new NumberProperty( 1 );

    // @public {NumberProperty} - Total cost of all of the apples
    this.totalCostProperty = new NumberProperty( 0 );

    // @public {Range}
    this.numberOfApplesRange = new Range( 1, 20 );

    // @public {Range}
    this.totalCostRange = new Range( 0, 20 );
  }

  proportionPlayground.register( 'AppleGroup', AppleGroup );

  return inherit( PropertySet, AppleGroup, {
    /**
     * Resets to original values.
     * @public
     */
    reset: function() {
      this.numberOfApplesProperty.reset();
      this.totalCostProperty.reset();
    },

    /**
     * Returns whether this group has an equivalent ratio to the other group.
     * @public
     *
     * @param {AppleGroup} appleGroup
     * @returns {boolean}
     */
    hasEquivalentValue: function( appleGroup ) {
      // We're always guaranteed at least one apple
      assert && assert( this.numberOfApplesProperty.value > 0 );
      assert && assert( appleGroup.numberOfApplesProperty.value > 0 );

      return this.costPerApple === appleGroup.costPerApple;
    },

    /**
     * Returns the cost per apple
     * @public
     *
     * @returns {number}
     */
    get costPerApple() {
      //TODO: consider a derived property?
      return this.totalCostProperty.value / this.numberOfApplesProperty.value;
    }
  } );
} );
