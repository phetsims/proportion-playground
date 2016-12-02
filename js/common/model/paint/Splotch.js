// Copyright 2016, University of Colorado Boulder

/**
 * The model for a single paint splotch. Colors are combined in the view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function Splotch() {

    // @public {NumberProperty} - Amount of paint from the color choice on the left
    this.leftColorCountProperty = new NumberProperty( 0 );

    // @public {NumberProperty} - Amount of paint form the color choice on the right
    this.rightColorCountProperty = new NumberProperty( 0 );

    // @public (read-only) the range for colors
    this.colorCountRange = new Range( 0, 20 );
  }

  proportionPlayground.register( 'Splotch', Splotch );

  return inherit( Object, Splotch, {
    /**
     * Resets properties.
     * @public
     */
    reset: function() {
      this.leftColorCountProperty.reset();
      this.rightColorCountProperty.reset();
    },

    /**
     * @public
     *
     * @param {Splotch} splotchModel
     * @returns {boolean}
     */
    hasEquivalentValue: function( splotchModel ) {
      // compare ratios between sims, accounting for /0
      return this.ratio1 === splotchModel.ratio1 && this.ratio2 === splotchModel.ratio2;
    },

    /**
     * Gets the ratio leftColor/rightColor
     * @returns {number}
     * @private
     */
    get ratio1() {
      return this.leftColorCountProperty.value / this.rightColorCountProperty.value;
    },

    /**
     * Gets the ratio rightColor/leftColor
     * @returns {number}
     * @private
     */
    get ratio2() {
      return this.rightColorCountProperty.value / this.leftColorCountProperty.value;
    }
  } );
} );
