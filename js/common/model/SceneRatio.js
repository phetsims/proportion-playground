// Copyright 2016, University of Colorado Boulder

/**
 * Base type for the ratio-based items (necklaces, billiard tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {BooleanProperty} - Whether we are visible or not
   * @param {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
   */
  function SceneRatio( visibleProperty, quantityProperties ) {
    // @public {BooleanProperty} - Whether we are visible or not
    this.visibleProperty = visibleProperty;

    // @public {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
    this.quantityProperties = quantityProperties;
  }

  proportionPlayground.register( 'SceneRatio', SceneRatio );

  return inherit( Object, SceneRatio, {
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
     */
    isEquivalentTo: function( ratio ) {
      // Division by zero in both places will have Infinity === Infinity, which is OK.
      return ( this.quantityProperties[ 0 ].value / this.quantityProperties[ 1 ] ===
               ratio.quantityProperties[ 0 ].value / ratio.quantityProperties[ 1 ] ) &&
             ( this.quantityProperties[ 1 ].value / this.quantityProperties[ 0 ] ===
               ratio.quantityProperties[ 1 ].value / ratio.quantityProperties[ 0 ] );
    }
  } );
} );
