// Copyright 2016-2020, University of Colorado Boulder

/**
 * Models a paint balloon thrown at the splotch.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import proportionPlayground from '../../../proportionPlayground.js';

// {number} - In seconds, the time from "launch" to when the balloon "hits" the splotch.
const TIME_TO_HIT = 0.5;

// {number} - Number of balloons created. We rotate through 3 different graphic images, so we can take the number of
// balloons mod 3 to determine which image to use.
let numberOfBalloons = 0;

class PaintBalloon {
  /**
   * @param {Side} side - Whether this balloon contains the left or right color
   * @param {function} hitCallback - Called with this as a single arg when the balloon hits
   */
  constructor( side, hitCallback ) {
    // @public {number}
    this.timeToHit = TIME_TO_HIT;

    // @public {boolean}
    this.side = side;

    // @public {function}
    this.hitCallback = hitCallback;

    // @public {number} - Determines which balloon orientation image is used
    this.balloonType = ( numberOfBalloons++ ) % 3;
  }

  /**
   * Steps the balloon forward in time.
   * @public
   *
   * @param {number} dt
   */
  step( dt ) {
    this.timeToHit -= dt;
    if ( this.timeToHit <= 0 ) {
      this.hit();
    }
  }

  /**
   * Triggers a (possibly premature) hit.
   * @public
   */
  hit() {
    this.hitCallback( this );
  }

  /**
   * Returns 0 when the balloon starts and 1 when it hits.
   * @public
   *
   * @returns {number}
   */
  getRatioToEnd() {
    return ( TIME_TO_HIT - this.timeToHit ) / TIME_TO_HIT;
  }
}

proportionPlayground.register( 'PaintBalloon', PaintBalloon );

export default PaintBalloon;