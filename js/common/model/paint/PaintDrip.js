// Copyright 2016, University of Colorado Boulder

/**
 * Models paint dripping.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {Side} side - Whether this balloon contains the left-most color
   * @param {function} leaveCallback - Called with this as a single arg when the paint shouldn't be visible
   * @param {number} amountToDrip - Total amount of paint balloons to drip away
   * @param {Function} removeCallback - Call with function( amount ) to remove a certain amount as the drop grows
   * @param {number} initialSplotchArea - Indicates the intial area, so the intial position can be calibrated
   */
  function PaintDrip( side, leaveCallback, amountToDrip, removeCallback, initialSplotchArea ) {
    // @public {number}
    this.timeElapsed = 0;

    // @public {boolean}
    this.side = side;

    // @public {Function}
    this.leaveCallback = leaveCallback;

    // @public {number}
    this.drippedAmount = 0;

    // @public {number}
    this.amountToDrip = amountToDrip;

    // @public {Function}
    this.removeCallback = removeCallback;

    // @public {number}
    this.initialSplotchArea = initialSplotchArea;
  }

  proportionPlayground.register( 'PaintDrip', PaintDrip );

  return inherit( Object, PaintDrip, {
    /**
     * Steps the balloon forward in time.
     * @public
     *
     * @param {number} dt
     */
    step: function( dt ) {
      this.timeElapsed += dt;

      var amountToRemove = Math.min( this.amountToDrip, dt * 7 );
      if ( amountToRemove ) {
        this.removeCallback( amountToRemove );
        this.amountToDrip -= amountToRemove;
        this.drippedAmount += amountToRemove;
      }
    },

    /**
     * Removes the drip after it has passed from view.
     * @public
     */
    remove: function() {
      this.leaveCallback( this );
    }
  } );
} );
