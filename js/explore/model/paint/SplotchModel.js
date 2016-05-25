// Copyright 2016, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Range = require( 'DOT/Range' );

  /**
   *
   * @param {Color|string} color1
   * @param {Color|string} color2
   * @constructor
   */
  function SplotchModel( color1, color2 ) {
    this.color1 = color1;
    this.color2 = color2;
    PropertySet.call( this, {
      color1Count: 0,
      color2Count: 0
    } );

    this.colorCountRange = new Range( 0, 20 ); // TODO: Factor out ranges

    // These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.color1CountProperty = this.color1CountProperty || null;
    this.color2CountProperty = this.color2CountProperty || null;
  }

  proportionPlayground.register( 'SplotchModel', SplotchModel );

  return inherit( PropertySet, SplotchModel, {
    // @public
    hasEquivalentValue: function( appleGroupModel ) {

      // compare ratios between sims, accounting for /0
      return this.ratio1 === appleGroupModel.ratio1 && this.ratio2 === appleGroupModel.ratio2;
    },
    get ratio1() {
      return this.color1Count / this.color2Count;
    },

    // TODO: this hack makes it easy to compare ratios between sims, accounting for /0
    get ratio2() {
      return this.color2Count / this.color1Count;
    }
  } );
} );