// Copyright 2017-2020, University of Colorado Boulder

/**
 * Models the quantity of a specific color/choice of paint, that can be added (with balloons) and removed (with drips)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';

class PaintQuantity {
  /**
   * @param {number} initialCount - Initial quantity of the paint
   * @param {function} createBalloon - function( callbackWhenHits() )
   * @param {function} createDrip - function( amountToRemove: number, dripCallback( amount ) )
   * @param {Tandem} tandem
   */
  constructor( initialCount, createBalloon, createDrip, tandem ) {
    // @private
    this.createBalloon = createBalloon;
    this.createDrip = createDrip;

    // @public {NumberProperty} - The real model value (ignoring balloons, drips, etc.), changes instantly on toggles.
    this.realCountProperty = new NumberProperty( initialCount, {
      range: ProportionPlaygroundConstants.PAINT_COUNT_RANGE,
      numberType: 'Integer',
      tandem: tandem.createTandem( 'realCountProperty' )
    } );

    // @public {NumberProperty} - The model value that increases instantly when balloons hit. Can go negative.
    this.currentCountProperty = new NumberProperty( initialCount, {
      numberType: 'Integer',
      phetioReadOnly: true,
      phetioState: false,
      tandem: tandem.createTandem( 'currentCountProperty' )
    } );

    // @public {NumberProperty} - The visual amount of paint for the meter and splotch.
    this.paintAreaProperty = new NumberProperty( initialCount, {
      phetioReadOnly: true,
      phetioState: false,
      tandem: tandem.createTandem( 'paintAreaProperty' )
    } );

    // @private {NumberProperty} - Pending drips that will occur when a balloon hit happens.
    this.pendingDripsProperty = new NumberProperty( 0, {
      phetioReadOnly: true,
      phetioState: false,
      tandem: tandem.createTandem( 'pendingDripsProperty' )
    } );

    this.realCountProperty.lazyLink( this.realCountChange.bind( this ) );
  }

  /**
   * Resets the amount of paint.
   * @public
   */
  reset() {
    this.realCountProperty.reset();
    this.currentCountProperty.reset();
    this.paintAreaProperty.reset();
    this.pendingDripsProperty.reset();
  }

  /**
   * Called when the real amount of paint changes. This either kicks off a balloon being thrown (increase), or queues
   * a drip (decrease).
   * @private
   *
   * @param {number} newCount
   * @param {number} oldCount
   */
  realCountChange( newCount, oldCount ) {
    const delta = Math.abs( newCount - oldCount );
    if ( newCount > oldCount ) {
      this.createBalloon( this.addCurrent.bind( this, delta ) );
    }
    else {
      this.removeCurrent( delta );
    }
  }

  /**
   * Removes a certain amount of paint area.
   * @private
   *
   * @param {number} amount - Amount to remove
   */
  removeArea( amount ) {
    assert && assert( typeof amount === 'number' && isFinite( amount ) && amount >= 0 );

    this.paintAreaProperty.value -= amount;
  }

  /**
   * Callback for when a balloon hits that adds a certain count to the current count.
   * @private
   *
   * @param {number} count
   */
  addCurrent( count ) {
    assert && assert( typeof count === 'number' && isFinite( count ) && count > 0 );

    const amountToDrip = Math.min( count, this.pendingDripsProperty.value );
    const amountToAdd = count - amountToDrip;
    this.paintAreaProperty.value += count;
    this.currentCountProperty.value += amountToAdd;
    this.pendingDripsProperty.value -= amountToDrip;
    if ( amountToDrip ) {
      this.createDrip( amountToDrip, this.removeArea.bind( this ) );
    }
  }

  /**
   * Called when an amount of paint is removed (immediately), so we can potentially create drips.
   * @private
   *
   * @param {number} count
   */
  removeCurrent( count ) {
    assert && assert( typeof count === 'number' && isFinite( count ) && count >= 0 );

    const amountToDrip = Math.min( count, this.currentCountProperty.value );
    const amountToQueue = count - amountToDrip;
    this.pendingDripsProperty.value += amountToQueue;
    this.currentCountProperty.value -= amountToDrip;
    if ( amountToDrip ) {
      this.createDrip( amountToDrip, this.removeArea.bind( this ) );
    }
  }
}

proportionPlayground.register( 'PaintQuantity', PaintQuantity );

export default PaintQuantity;