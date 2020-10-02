// Copyright 2016-2020, University of Colorado Boulder

/**
 * The model for a single paint splotch. Colors are combined in the view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import createObservableArray from '../../../../../axon/js/createObservableArray.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneRatio from '../SceneRatio.js';
import Side from '../Side.js';
import PaintBalloon from './PaintBalloon.js';
import PaintDrip from './PaintDrip.js';
import PaintQuantity from './PaintQuantity.js';

/**
 * @constructor
 * @extends {SceneRatio}
 *
 * @param {number} initialLeftCount - Initial quantity of the left paint
 * @param {number} initialRightCount - Initial quantity of the right paint
 * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
 * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
 */
function Splotch( initialLeftCount, initialRightCount, visibleProperty, controlsVisibleProperty ) {
  const self = this;

  // @public {PaintQuantity} - For each side
  this.leftQuantity = createPaintQuantity( this, initialLeftCount, Side.LEFT );
  this.rightQuantity = createPaintQuantity( this, initialRightCount, Side.RIGHT );

  // @public {NumberProperty} - Amount of paint from the color choice on the left (after resulting balloons have landed)
  this.leftColorCountProperty = this.leftQuantity.realCountProperty;

  // @public {NumberProperty} - Amount of paint form the color choice on the right (after resulting balloons have landed)
  this.rightColorCountProperty = this.rightQuantity.realCountProperty;

  // @private {NumberProperty} - Amount of displayed paint (can increase after balloons hit). Can go negative.
  this.currentLeftColorProperty = this.leftQuantity.currentCountProperty;
  this.currentRightColorProperty = this.rightQuantity.currentCountProperty;

  // @public {Property.<number>} - Non-negative version of our internal count, with maximums designed to limit the
  // temporary appearance of https://github.com/phetsims/proportion-playground/issues/101.
  this.visibleLeftColorProperty = new DerivedProperty( [ this.leftQuantity.paintAreaProperty ], function( value ) {
    return Math.min( value, ProportionPlaygroundConstants.PAINT_COUNT_RANGE.max );
  } );
  this.visibleRightColorProperty = new DerivedProperty( [ this.rightQuantity.paintAreaProperty ], function( value ) {
    return Math.min( value, ProportionPlaygroundConstants.PAINT_COUNT_RANGE.max );
  } );

  // @public {ObservableArrayDef.<PaintBalloon>}
  this.balloons = createObservableArray();

  // @public {ObservableArrayDef.<PaintDrip>}
  this.drips = createObservableArray();

  SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
    this.leftColorCountProperty, ProportionPlaygroundConstants.PAINT_COUNT_RANGE,
    this.rightColorCountProperty, ProportionPlaygroundConstants.PAINT_COUNT_RANGE );

  // Clear balloons/drips in progress when visibility changes, see https://github.com/phetsims/proportion-playground/issues/100
  visibleProperty.lazyLink( function( visible ) {
    self.step( 10000 ); // Just step a really big number (but not infinity, since we rely on finite numbers)
  } );
}

proportionPlayground.register( 'Splotch', Splotch );

inherit( SceneRatio, Splotch, {
  /**
   * Steps forward in time.
   * @public
   *
   * @param {number} dt - Time to move forward in seconds
   */
  step: function( dt ) {
    // Step balloons in reverse order, since they can remove themselves
    for ( var i = this.balloons.length - 1; i >= 0; i-- ) {
      this.balloons.get( i ).step( dt );
    }

    for ( i = this.drips.length - 1; i >= 0; i-- ) {
      this.drips.get( i ).step( dt );
    }
  },

  /**
   * Resets the model
   * @public
   * @override
   */
  reset: function() {
    SceneRatio.prototype.reset.call( this );

    this.leftQuantity.reset();
    this.rightQuantity.reset();

    this.balloons.clear();
    this.drips.clear();

    // Additional reset needed, as balloons/drips can potentially change the quantity when removed.
    this.leftQuantity.reset();
    this.rightQuantity.reset();
  }
} );

/**
 * Creates a PaintQuantity given an initialCount / side.
 * @private
 *
 * @param {Splotch} splotch
 * @param {number} initialCount
 * @param {Side} side
 * @returns {PaintQuantity}
 */
function createPaintQuantity( splotch, initialCount, side ) {
  return new PaintQuantity( initialCount, function createBalloon( hitCallback ) {
    splotch.balloons.push( new PaintBalloon( side, function( balloon ) {
      splotch.balloons.remove( balloon );
      hitCallback();
    } ) );
  }, function createDrip( amountToDrip, removeCallback ) {
    const visibleColorProperty = side === Side.LEFT ? splotch.visibleLeftColorProperty : splotch.visibleRightColorProperty;
    splotch.drips.push( new PaintDrip( side, function( drip ) {
      splotch.drips.remove( drip );
    }, amountToDrip, removeCallback, visibleColorProperty.value ) );
  } );
}

export default Splotch;