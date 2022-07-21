// Copyright 2016-2022, University of Colorado Boulder

/**
 * The model for a single paint splotch. Colors are combined in the view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import createObservableArray from '../../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneRatio from '../SceneRatio.js';
import Side from '../Side.js';
import PaintBalloon from './PaintBalloon.js';
import PaintDrip from './PaintDrip.js';
import PaintQuantity from './PaintQuantity.js';

class Splotch extends SceneRatio {
  /**
   * @param {number} initialLeftCount - Initial quantity of the left paint
   * @param {number} initialRightCount - Initial quantity of the right paint
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   * @param {Tandem} tandem
   */
  constructor( initialLeftCount, initialRightCount, visibleProperty, controlsVisibleProperty, tandem ) {

    const balloons = createObservableArray();
    const drips = createObservableArray();

    const leftQuantity = createPaintQuantity( initialLeftCount, Side.LEFT, balloons, drips, () => this.visibleLeftColorProperty, tandem.createTandem( 'leftQuantity' ) );
    const rightQuantity = createPaintQuantity( initialRightCount, Side.RIGHT, balloons, drips, () => this.visibleRightColorProperty, tandem.createTandem( 'rightQuantity' ) );

    super( visibleProperty, controlsVisibleProperty,
      leftQuantity.realCountProperty,
      rightQuantity.realCountProperty,
      tandem );

    // @public {PaintQuantity} - For each side
    this.leftQuantity = leftQuantity;
    this.rightQuantity = rightQuantity;

    // @public {ObservableArrayDef.<PaintBalloon>}
    this.balloons = balloons;

    // @public {ObservableArrayDef.<PaintDrip>}
    this.drips = drips;

    // @public {NumberProperty} - Amount of paint from the color choice on the left (after resulting balloons have landed)
    this.leftColorCountProperty = this.leftQuantity.realCountProperty;

    // @public {NumberProperty} - Amount of paint form the color choice on the right (after resulting balloons have landed)
    this.rightColorCountProperty = this.rightQuantity.realCountProperty;

    // @private {NumberProperty} - Amount of displayed paint (can increase after balloons hit). Can go negative.
    this.currentLeftColorProperty = this.leftQuantity.currentCountProperty;
    this.currentRightColorProperty = this.rightQuantity.currentCountProperty;

    // @public {Property.<number>} - Non-negative version of our internal count, with maximums designed to limit the
    // temporary appearance of https://github.com/phetsims/proportion-playground/issues/101.
    this.visibleLeftColorProperty = new DerivedProperty( [ this.leftQuantity.paintAreaProperty ], value => Math.min( value, ProportionPlaygroundConstants.PAINT_COUNT_RANGE.max ) );
    this.visibleRightColorProperty = new DerivedProperty( [ this.rightQuantity.paintAreaProperty ], value => Math.min( value, ProportionPlaygroundConstants.PAINT_COUNT_RANGE.max ) );

    // Clear balloons/drips in progress when visibility changes, see https://github.com/phetsims/proportion-playground/issues/100
    visibleProperty.lazyLink( visible => {
      this.step( 10000 ); // Just step a really big number (but not infinity, since we rely on finite numbers)
    } );
  }

  /**
   * Steps forward in time.
   * @public
   *
   * @param {number} dt - Time to move forward in seconds
   */
  step( dt ) {
    // Step balloons in reverse order, since they can remove themselves
    for ( let i = this.balloons.length - 1; i >= 0; i-- ) {
      this.balloons.get( i ).step( dt );
    }

    for ( let i = this.drips.length - 1; i >= 0; i-- ) {
      this.drips.get( i ).step( dt );
    }
  }

  /**
   * Resets the model
   * @public
   * @override
   */
  reset() {
    super.reset();

    this.leftQuantity.reset();
    this.rightQuantity.reset();

    this.balloons.clear();
    this.drips.clear();

    // Additional reset needed, as balloons/drips can potentially change the quantity when removed.
    this.leftQuantity.reset();
    this.rightQuantity.reset();
  }
}

proportionPlayground.register( 'Splotch', Splotch );

/**
 * Creates a PaintQuantity given an initialCount / side.
 * @private
 *
 * @param {number} initialCount
 * @param {Side} side
 * @param {Array.<PaintBallon>} balloons
 * @param {Array.<PaintDrip>} drips
 * @param {function} getVisibleColorProperty
 * @param {Tandem} tandem
 * @returns {PaintQuantity}
 */
function createPaintQuantity( initialCount, side, balloons, drips, getVisibleColorProperty, tandem ) {
  return new PaintQuantity( initialCount, ( hitCallback => {
    balloons.push( new PaintBalloon( side, balloon => {
      balloons.remove( balloon );
      hitCallback();
    } ) );
  } ), ( ( amountToDrip, removeCallback ) => {
    const visibleColorProperty = getVisibleColorProperty();
    drips.push( new PaintDrip( side, drip => {
      drips.remove( drip );
    }, amountToDrip, removeCallback, visibleColorProperty.value ) );
  } ), tandem );
}

export default Splotch;