// Copyright 2016, University of Colorado Boulder

/**
 * Models a paint balloon thrown at the splotch.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  var TIME_TO_HIT = 0.5; // in Seconds

  var balloonCounter = 0;

  /**
   * @constructor
   *
   * @param {Side} side - Whether this balloon contains the left or right color
   * @param {function} hitCallback - Called with this as a single arg when the balloon hits
   */
  function PaintBalloon( side, hitCallback ) {
    // @public {number}
    this.timeToHit = TIME_TO_HIT;

    // @public {boolean}
    this.side = side;

    // @public {function}
    this.hitCallback = hitCallback;

    // @public {number} - Determines which balloon orientation image is used
    this.balloonType = ( balloonCounter++ ) % 3;
  }

  proportionPlayground.register( 'PaintBalloon', PaintBalloon );

  return inherit( Object, PaintBalloon, {
    /**
     * Steps the balloon forward in time.
     * @public
     *
     * @param {number} dt
     */
    step: function( dt ) {
      this.timeToHit -= dt;
      if ( this.timeToHit <= 0 ) {
        this.hit();
      }
    },

    /**
     * Triggers a (possibly premature) hit.
     * @public
     */
    hit: function() {
      this.hitCallback( this );
    },

    /**
     * Returns 0 when the balloon starts and 1 when it hits.
     * @public
     *
     * @returns {number}
     */
    getRatioToEnd: function() {
      return ( TIME_TO_HIT - this.timeToHit ) / TIME_TO_HIT;
    }
  } );
} );
