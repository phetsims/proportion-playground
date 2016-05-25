// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Range = require( 'DOT/Range' );

  function AppleGroupModel() {
    PropertySet.call( this, {
      numberOfApples: 1,
      totalCost: 0
    } );

    this.totalCostRange = new Range( 0, 20 );
    this.numberOfApplesRange = new Range( 1, 20 );

    // These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.numberOfApplesProperty = this.numberOfApplesProperty || null;
    this.totalCostProperty = this.totalCostProperty || null;
  }

  proportionPlayground.register( 'AppleGroupModel', AppleGroupModel );

  return inherit( PropertySet, AppleGroupModel, {
    hasEquivalentValue: function( appleGroupModel ) {

      // compare ratios between sims, accounting for /0
      return this.ratio1 === appleGroupModel.ratio1 && this.ratio2 === appleGroupModel.ratio2;
    },

    // @private
    get ratio1() {
      return this.totalCost / this.numberOfApples;
    },

    // @private
    get ratio2() {
      return this.numberOfApples / this.totalCost;
    }
  } );
} );