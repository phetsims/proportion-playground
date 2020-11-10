// Copyright 2016-2020, University of Colorado Boulder

/**
 * Base type for the ratio-based items (necklaces, billiard tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Emitter from '../../../../axon/js/Emitter.js';
import proportionPlayground from '../../proportionPlayground.js';
import Side from './Side.js';

class SceneRatio {
  /**
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   * @param {NumberProperty.<number>} leftProperty - The numeric value for our ratio's left value
   * @param {NumberProperty.<number>} rightProperty - The numeric value for our ratio's right value
   * @param {Tandem} tandem
   */
  constructor( visibleProperty, controlsVisibleProperty, leftProperty, rightProperty, tandem ) {
    assert && assert( leftProperty.range );
    assert && assert( rightProperty.range );

    // @public {Property.<boolean>} - Whether we are visible or not
    this.visibleProperty = visibleProperty;

    // @public {Property.<boolean>} - Whether our controls are visible
    this.controlsVisibleProperty = controlsVisibleProperty;

    // @public {Property.<number>} - Left numeric value
    this.leftProperty = leftProperty;

    // @public {Property.<number>} - Right numeric value
    this.rightProperty = rightProperty;

    // @public {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
    this.quantityProperties = [ leftProperty, rightProperty ];

    // @public {Emitter} - Fires when there is a change to a quantity property while visible, or when visibility changes
    this.visibleChangeEmitter = new Emitter();

    // Hook up our visible-change emitter
    visibleProperty.lazyLink( () => {
      this.visibleChangeEmitter.emit();
    } );
    this.quantityProperties.forEach( quantityProperty => {
      quantityProperty.lazyLink( () => {
        if ( visibleProperty.value ) {
          this.visibleChangeEmitter.emit();
        }
      } );
    } );
  }

  /**
   * Returns the count property for a specific side (left or right).
   * @public
   *
   * @returns {Property.<number>}
   */
  getProperty( side ) {
    return side === Side.LEFT ? this.leftProperty : this.rightProperty;
  }

  /**
   * Returns the range property for a specific side (left or right).
   * @public
   *
   * @returns {Range}
   */
  getRange( side ) {
    return this.getProperty( side ).range;
  }

  /**
   * Resets the ratio to the original values.
   * @public
   */
  reset() {
    this.quantityProperties.forEach( quantityProperty => {
      quantityProperty.reset();
    } );
  }

  /**
   * Whether this ratio is equivalent to another ratio (accounting for 0s)
   * @public
   *
   * @param {SceneRatio} ratio
   * @returns {boolean}
   */
  isEquivalentTo( ratio ) {
    return SceneRatio.areRatiosEquivalent( this.quantityProperties[ 0 ].value,
      this.quantityProperties[ 1 ].value,
      ratio.quantityProperties[ 0 ].value,
      ratio.quantityProperties[ 1 ].value );
  }

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
  static areRatiosEquivalent( a1, a2, b1, b2 ) {
    // Division by zero in both places will have Infinity === Infinity, which is OK.
    return ( a1 / a2 === b1 / b2 || Math.abs( a1 / a2 - b1 / b2 ) < 1e-6 ) &&
           ( a2 / a1 === b2 / b1 || Math.abs( a2 / a1 - b2 / b1 ) < 1e-6 );
  }
}

proportionPlayground.register( 'SceneRatio', SceneRatio );

export default SceneRatio;