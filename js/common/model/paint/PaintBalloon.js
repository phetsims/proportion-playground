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

  /**
   * @constructor
   *
   * @param {boolean} isLeft - Whether this balloon contains the left-most color
   * @param {function} hitCallback - Called with this as a single arg when the balloon hits
   */
  function PaintBalloon( isLeft, hitCallback ) {
    // @public {number}
    this.timeToHit = TIME_TO_HIT;

    // @public {boolean}
    this.isLeft = isLeft;

    // @public {function}
    this.hitCallback = hitCallback;
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

    //TODO: doc
    getRatioToEnd: function() {
      return ( TIME_TO_HIT - this.timeToHit ) / TIME_TO_HIT;
    }
  } );
} );
