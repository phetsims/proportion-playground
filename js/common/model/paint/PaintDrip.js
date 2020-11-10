// Copyright 2016-2020, University of Colorado Boulder

/**
 * Models paint dripping.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import proportionPlayground from '../../../proportionPlayground.js';

class PaintDrip {
  /**
   * @param {Side} side - Whether this balloon contains the left-most color
   * @param {function} leaveCallback - Called with this as a single arg when the paint shouldn't be visible
   * @param {number} amountToDrip - Total amount of paint balloons to drip away
   * @param {function} removeCallback - Call with function( amount ) to remove a certain amount as the drop grows
   * @param {number} initialSplotchArea - Indicates the intial area, so the intial position can be calibrated
   */
  constructor( side, leaveCallback, amountToDrip, removeCallback, initialSplotchArea ) {
    // @public {number}
    this.timeElapsed = 0;

    // @public {boolean}
    this.side = side;

    // @public {function}
    this.leaveCallback = leaveCallback;

    // @public {number}
    this.drippedAmount = 0;

    // @public {number}
    this.amountToDrip = amountToDrip;

    // @public {function}
    this.removeCallback = removeCallback;

    // @public {number}
    this.initialSplotchArea = initialSplotchArea;
  }

  /**
   * Steps the balloon forward in time.
   * @public
   *
   * @param {number} dt
   */
  step( dt ) {
    this.timeElapsed += dt;

    const amountToRemove = Math.min( this.amountToDrip, dt * 7 );
    if ( amountToRemove ) {
      this.removeCallback( amountToRemove );
      this.amountToDrip -= amountToRemove;
      this.drippedAmount += amountToRemove;
    }
  }

  /**
   * Removes the drip after it has passed from view.
   * @public
   */
  remove() {
    // assert && assert( Math.abs( this.amountToDrip ) < 1e-7 );

    this.leaveCallback( this );
  }
}

proportionPlayground.register( 'PaintDrip', PaintDrip );

export default PaintDrip;