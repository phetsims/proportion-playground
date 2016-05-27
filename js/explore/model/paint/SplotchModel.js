// Copyright 2016, University of Colorado Boulder

/**
 * The model for a single paint splotch.  Colors are combined in the view.
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

  /**
   * @param {Color|string} color1 - the color choice on the left
   * @param {Color|string} color2 - the color choice on the right
   * @constructor
   */
  function SplotchModel( color1, color2 ) {

    // @public (read-only)
    this.color1 = color1;
    this.color2 = color2;

    PropertySet.call( this, {
      color1Count: 0, // {number} @public - the number of times color1 has been added
      color2Count: 0 // {number} @public - the number of times color2 has been added
    } );

    // @public (read-only) the range for colors
    this.colorCountRange = new Range( 0, 20 );

    // @public (read-only) These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.color1CountProperty = this.color1CountProperty || null;
    this.color2CountProperty = this.color2CountProperty || null;
  }

  proportionPlayground.register( 'SplotchModel', SplotchModel );

  return inherit( PropertySet, SplotchModel, {

    /**
     *
     * @param {SplotchModel} splotchModel
     * @returns {boolean}
     * @public
     */
    hasEquivalentValue: function( splotchModel ) {

      // compare ratios between sims, accounting for /0
      return this.ratio1 === splotchModel.ratio1 && this.ratio2 === splotchModel.ratio2;
    },

    // @private
    get ratio1() {
      return this.color1Count / this.color2Count;
    },

    // @private
    get ratio2() {
      return this.color2Count / this.color1Count;
    }
  } );
} );