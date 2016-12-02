// Copyright 2016, University of Colorado Boulder

/**
 * Model for one table in the Billiards Scene
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var Ball = require( 'PROPORTION_PLAYGROUND/common/model/billiards/Ball' );
  var Vector2 = require( 'DOT/Vector2' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Emitter = require( 'AXON/Emitter' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function BilliardsTable() {
    // @public {NumberProperty} - Number of grid units vertically
    // TODO: heightProperty???
    this.lengthProperty = new NumberProperty( 1 );

    // @public {NumberProperty} - Number of grid units horizontally
    this.widthProperty = new NumberProperty( 1 );

    // @public (read-only) - the allowed values for length and width
    this.range = new RangeWithValue( 1, 20 );

    // @public (read-only)
    this.ball = new Ball();

    // Keep track of collision points so the path can be shown as array of lines.
    // @public (read-only) - the points where the ball has collided with the walls
    this.collisionPoints = new ObservableArray();

    // @public (read-only) - emits when the ball was restarted
    this.restartEmitter = new Emitter();

    // Restart the ball when the length or width changes
    Property.multilink( [
      this.lengthProperty,
      this.widthProperty
    ], this.restartBall.bind( this ) );

    // @public {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
    this.quantityProperties = [
      this.lengthProperty,
      this.widthProperty
    ];
  }

  proportionPlayground.register( 'BilliardsTable', BilliardsTable );

  // Ball has collided with the wall, re-center at nearest integral coordinates so the trace doesn't get off course
  function round( x, y ) {
    return new Vector2( Math.round( x ), Math.round( y ) );
  }

  return inherit( Object, BilliardsTable, {

    /**
     * Restart the ball in the correct location and notify observers.
     * @public
     */
    restartBall: function() {
      this.ball.restartBall( 0, this.lengthProperty.value );
      this.collisionPoints.clear();
      this.restartEmitter.emit();
    },

    /**
     * Reset the table and restart the ball.
     * @public
     */
    reset: function() {
      this.lengthProperty.reset();
      this.widthProperty.reset();
      this.restartBall();
    },

    /**
     * Generalized function for handling bouncing off any wall.
     *
     * @param {number} xVelocityScale - how much to scale the velocity in the x-direction (1 or -1)
     * @param {number} yVelocityScale - how much to scale the velocity in the y-direction (1 or -1)
     * @param {number} x - the rounded off collision point (so errors don't accumulate)
     * @param {number} y - the rounded off collision point (so errors don't accumulate)
     * @private
     */
    bounce: function( xVelocityScale, yVelocityScale, x, y ) {
      this.ball.velocity.x *= xVelocityScale;
      this.ball.velocity.y *= yVelocityScale;
      this.ball.position = round( x, y );
      this.collisionPoints.push( this.ball.position.copy() );
    },

    /**
     * Moves the ball forward in time, and handles collisions.
     * @param {number} dt - time to move forward in seconds
     * @public
     */
    step: function( dt ) {
      var length = this.lengthProperty.value;
      var width = this.widthProperty.value;

      // Cap DT
      dt = Math.min( dt, 1 / 60 * 2 );

      //TODO: Can this happen?
      if ( length === 0 || width === 0 ) {
        return;
      }
      if ( this.collisionPoints.length === 0 ) {
        this.collisionPoints.add( this.ball.position.copy() );
      }
      this.ball.position = this.ball.position.plus( this.ball.velocity.times( dt ) );

      var vx = this.ball.velocity.x;
      var vy = this.ball.velocity.y;
      var x = this.ball.position.x;
      var y = this.ball.position.y;

      if ( vx > 0 && x >= width ) {
        this.bounce( -1, 1, width, y );
      }
      if ( vx < 0 && x <= 0 ) {
        this.bounce( -1, 1, 0, y );
      }
      if ( vy > 0 && y >= length ) {
        this.bounce( 1, -1, x, length );
      }
      if ( vy < 0 && y <= 0 ) {
        this.bounce( 1, -1, x, 0 );
      }

      // Stop the ball when it strikes a corner
      if (
        this.ball.position.equals( new Vector2( 0, 0 ) ) ||
        this.ball.position.equals( new Vector2( 0, length ) ) ||
        this.ball.position.equals( new Vector2( width, 0 ) ) ||
        this.ball.position.equals( new Vector2( width, length ) )
      ) {
        this.ball.velocity = new Vector2();
      }
    }
  } );
} );
