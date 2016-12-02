// Copyright 2016, University of Colorado Boulder

/**
 * Model for one table in the Billiards scene
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Range = require( 'DOT/Range' );
  var Util = require( 'DOT/Util' );
  var Ball = require( 'PROPORTION_PLAYGROUND/common/model/billiards/Ball' );
  var Vector2 = require( 'DOT/Vector2' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Emitter = require( 'AXON/Emitter' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function BilliardsTable() {
    // @public {NumberProperty} - Number of grid units horizontally
    this.widthProperty = new NumberProperty( 1 );

    // @public {NumberProperty} - Number of grid units vertically
    this.heightProperty = new NumberProperty( 1 );

    // @public (read-only) - the allowed values for length and width
    this.range = new Range( 1, 20 );

    // @public (read-only)
    this.ball = new Ball();

    // Keep track of collision points so the path can be shown as array of lines.
    // @public {ObservableArray.<Vector2>} (read-only) - the points where the ball has collided with the walls
    this.collisionPoints = new ObservableArray();

    // @public {Emitter} (read-only) - emits when the ball was restarted
    this.restartEmitter = new Emitter();

    // @public {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
    this.quantityProperties = [
      this.widthProperty,
      this.heightProperty
    ];

    // Restart the ball when the length or width changes
    Property.multilink( this.quantityProperties, this.restartBall.bind( this ) );
  }

  proportionPlayground.register( 'BilliardsTable', BilliardsTable );

  return inherit( Object, BilliardsTable, {
    /**
     * Restart the ball in the correct location and notify observers.
     * @public
     */
    restartBall: function() {
      this.ball.restartBall( 0, this.heightProperty.value );
      this.collisionPoints.clear();
      this.restartEmitter.emit();
    },

    /**
     * Reset the table and restart the ball.
     * @public
     */
    reset: function() {
      this.widthProperty.reset();
      this.heightProperty.reset();
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
      this.ball.positionProperty.value = new Vector2( Util.roundSymmetric( x ), Util.roundSymmetric( y ) );
      this.collisionPoints.push( this.ball.positionProperty.value.copy() );
    },

    /**
     * Moves the ball forward in time, and handles collisions.
     * @param {number} dt - time to move forward in seconds
     * @public
     */
    step: function( dt ) {
      // Cap DT
      dt = Math.min( dt, 1 / 30 );

      var width = this.widthProperty.value;
      var height = this.heightProperty.value;

      assert && assert( width > 0 && height > 0 );

      if ( this.collisionPoints.height === 0 ) {
        this.collisionPoints.add( this.ball.positionProperty.value.copy() );
      }
      //TODO: Propertification made this ugly and looks slow, fix it
      this.ball.positionProperty.value = this.ball.positionProperty.value.plus( this.ball.velocity.times( dt ) );

      var vx = this.ball.velocity.x;
      var vy = this.ball.velocity.y;
      var x = this.ball.positionProperty.value.x;
      var y = this.ball.positionProperty.value.y;

      if ( vx > 0 && x >= width ) {
        this.bounce( -1, 1, width, y );
      }
      if ( vx < 0 && x <= 0 ) {
        this.bounce( -1, 1, 0, y );
      }
      if ( vy > 0 && y >= height ) {
        this.bounce( 1, -1, x, height );
      }
      if ( vy < 0 && y <= 0 ) {
        this.bounce( 1, -1, x, 0 );
      }

      // Stop the ball when it strikes a corner
      if (
        this.ball.positionProperty.value.equals( new Vector2( 0, 0 ) ) ||
        this.ball.positionProperty.value.equals( new Vector2( 0, height ) ) ||
        this.ball.positionProperty.value.equals( new Vector2( width, 0 ) ) ||
        this.ball.positionProperty.value.equals( new Vector2( width, height ) )
      ) {
        this.ball.velocity.setXY( 0, 0 );
      }
    }
  } );
} );
