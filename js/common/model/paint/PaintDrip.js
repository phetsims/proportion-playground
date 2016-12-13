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
   * @param {boolean} isLeft - Whether this balloon contains the left-most color
   * @param {function} leaveCallback - Called with this as a single arg when the paint shouldn't be visible
   */
  function PaintDrip( isLeft, leaveCallback ) {
    // @public {number}
    this.timeElapsed = 0;

    // @public {boolean}
    this.isLeft = isLeft;

    // @public {function}
    this.leaveCallback = leaveCallback;
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
