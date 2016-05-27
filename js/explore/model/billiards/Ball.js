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
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var speed = 8; // Pixels per second

  /**
   *
   * @constructor
   */
  function Ball() {
    PropertySet.call( this, {
      position: new Vector2( 0, 0 ), // {Vector2} @public the position of the ball in pixels
      velocity: new Vector2( speed, -speed ) // {Vector2} @public the velocity of the ball in pixels per second
    } );

    // These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.positionProperty = this.positionProperty || null;
    this.velocityProperty = this.velocityProperty || null;
  }

  proportionPlayground.register( 'Ball', Ball );

  return inherit( PropertySet, Ball, {

    /**
     * Restart the ball when the billiard table size is changed or reveal is pressed.
     * @param {number} x - the x coordinate for the ball
     * @param {number} y - the y coordinate for the ball
     * @public
     */
    restartBall: function( x, y ) {
      this.position = new Vector2( x, y );

      // initially the ball starts in the bottom left corner and moves up and to the right.
      this.velocity = new Vector2( speed, -speed );
    }
  } );
} );