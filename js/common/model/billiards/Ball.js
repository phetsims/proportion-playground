// Copyright 2016, University of Colorado Boulder

/**
 * The model for the moving Ball in the Billiards Scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var SPEED = 8; // Pixels per second

  /**
   *
   * @constructor
   */
  function Ball() {
    // @public {Property.<Vector2>} - The position of the ball in pixels
    this.positionProperty = new Property( new Vector2() );

    // @public {Vector2} - The velocity of the ball in pixels per second
    this.velocity = new Vector2( SPEED, -SPEED );
  }

  proportionPlayground.register( 'Ball', Ball );

  return inherit( Object, Ball, {
    /**
     * Restart the ball when the billiard table size is changed or reveal is pressed.
     * @public
     *
     * @param {number} x - the x coordinate for the ball
     * @param {number} y - the y coordinate for the ball
     */
    restartBall: function( x, y ) {
      this.positionProperty.value = new Vector2( x, y );

      // initially the ball starts in the bottom left corner and moves up and to the right.
      this.velocity.setXY( SPEED, -SPEED );
    }
  } );
} );
