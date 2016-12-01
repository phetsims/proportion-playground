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
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );

  /**
   *
   * @constructor
   */
  function AppleGroup() {
    PropertySet.call( this, {
      numberOfApples: 1, // @public
      totalCost: 0 // @public
    } );

    this.totalCostRange = new RangeWithValue( 0, 20 ); // @public
    this.numberOfApplesRange = new RangeWithValue( 1, 20 ); // @public

    // @public (read-only) These assignments provide improved highlighting and navigation in IntelliJ IDEA
    this.numberOfApplesProperty = this.numberOfApplesProperty || null;
    this.totalCostProperty = this.totalCostProperty || null;
  }

  proportionPlayground.register( 'AppleGroup', AppleGroup );

  return inherit( PropertySet, AppleGroup, {

    /**
     * Returns true if the other model has an equivalent value to this model, accounts for divide by zero.
     * @param {AppleGroup} appleGroupModel
     * @returns {boolean}
     * @public
     */
    hasEquivalentValue: function( appleGroupModel ) {

      // compare ratios between sims, accounting for /0
      return this.ratio1 === appleGroupModel.ratio1 && this.ratio2 === appleGroupModel.ratio2;
    },

    /**
     * Returns the cost per apple
     * @returns {number}
     * @private
     */
    get ratio1() {
      return this.totalCost / this.numberOfApples;
    },

    /**
     * Returns the number of apples per dollar
     * @returns {number}
     * @private
     */
    get ratio2() {
      return this.numberOfApples / this.totalCost;
    }
  } );
} );
