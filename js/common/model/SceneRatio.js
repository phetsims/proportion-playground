// Copyright 2016, University of Colorado Boulder

/**
 * Base type for the ratio-based items (necklaces, billiard tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );

  /**
   * @constructor
   *
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   * @param {Property.<number>} leftProperty - The numeric value for our ratio's left value
   * @param {Range} leftRange - The range of valid values for our leftProperty
   * @param {Property.<number>} rightProperty - The numeric value for our ratio's right value
   * @param {Range} rightRange - The range of valid values for our rightProperty
   */
  function SceneRatio( visibleProperty, controlsVisibleProperty, leftProperty, leftRange, rightProperty, rightRange ) {
    // @public {Property.<boolean>} - Whether we are visible or not
    this.visibleProperty = visibleProperty;

    // @public {Property.<boolean>} - Whether our controls are visible
    this.controlsVisibleProperty = controlsVisibleProperty;

    // @public {Property.<number>} - Left numeric value
    this.leftProperty = leftProperty; // TODO: check for getProperty() usages

    // @public {Range} - Range for the left numeric value
    this.leftRange = leftRange; // TODO: check for getRange() usages

    // @public {Property.<number>} - Right numeric value
    this.rightProperty = rightProperty;

    // @public {Range} - Range for the right numeric value
    this.rightRange = rightRange;

    // @public {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
    this.quantityProperties = [ leftProperty, rightProperty ];

    // @public {Emitter} - Fires when there is a change to a quantity property while visible, or when visibility changes
    this.visibleChangeEmitter = new Emitter();

    // Hook up our visible-change emitter
    var self = this;
    visibleProperty.lazyLink( this.visibleChangeEmitter.emit.bind( this.visibleChangeEmitter ) );
    this.quantityProperties.forEach( function( quantityProperty ) {
      quantityProperty.lazyLink( function() {
        if ( visibleProperty.value ) {
          self.visibleChangeEmitter.emit();
        }
      } );
    } );
  }

  proportionPlayground.register( 'SceneRatio', SceneRatio );

  return inherit( Object, SceneRatio, {
    /**
     * Returns the count property for a specific side (left or right).
     * @public
     *
     * @returns {Property.<number>}
     */
    getProperty: function( side ) {
      return side === Side.LEFT ? this.leftProperty : this.rightProperty;
    },

    /**
     * Returns the range property for a specific side (left or right).
     * @public
     *
     * @returns {Range}
     */
    getRange: function( side ) {
      return side === Side.LEFT ? this.leftRange : this.rightRange;
    },

    /**
     * Resets the ratio to the original values.
     * @public
     */
    reset: function() {
      this.quantityProperties.forEach( function( quantityProperty ) {
        quantityProperty.reset();
      } );
    },

    /**
     * Whether this ratio is equivalent to another ratio (accounting for 0s)
     * @public
     *
     * @param {SceneRatio} ratio
     * @returns {boolean}
     */
    isEquivalentTo: function( ratio ) {
      return SceneRatio.areRatiosEquivalent( this.quantityProperties[ 0 ].value,
                                             this.quantityProperties[ 1 ].value,
                                             ratio.quantityProperties[ 0 ].value,
                                             ratio.quantityProperties[ 1 ].value );
    }
  }, {
    /**
     * Whether two ratios are equivalent.
     * @public
     *
     * @param {number} a1 - First number for the first ratio
     * @param {number} a2 - Second number for the first ratio
     * @param {number} b1 - First number for the second ratio
     * @param {number} b2 - Second number for the second ratio
     * @returns {boolean}
     */
    areRatiosEquivalent: function( a1, a2, b1, b2 ) {
      // Division by zero in both places will have Infinity === Infinity, which is OK.
      return ( a1 / a2 === b1 / b2 || Math.abs( a1 / a2 - b1 / b2 ) < 1e-6 ) &&
             ( a2 / a1 === b2 / b1 || Math.abs( a2 / a1 - b2 / b1 ) < 1e-6 );
    }
  } );
} );
