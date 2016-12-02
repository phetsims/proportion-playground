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
  var Vector2 = require( 'DOT/Vector2' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Emitter = require( 'AXON/Emitter' );
  var Property = require( 'AXON/Property' );
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );

  // constants
  var SPEED = 8; // Ball speed, in pixels per second

  var scratchVector = new Vector2();

  /**
   * @constructor
   *
   * @param {BooleanProperty} visibleProperty - Whether we are visible or not
   */
  function BilliardsTable( visibleProperty ) {
    // @public {NumberProperty} - Number of grid units horizontally
    this.widthProperty = new NumberProperty( 1 );

    // @public {NumberProperty} - Number of grid units vertically
    this.heightProperty = new NumberProperty( 1 );

    // @public (read-only) - the allowed values for length and width
    this.range = new Range( 1, 20 );

    // @public {Property.<Vector2>} - The position of the ball in pixels
    this.ballPositionProperty = new Property( new Vector2() );

    // @public {Vector2} - The velocity of the ball in pixels per second
    this.ballVelocity = new Vector2( SPEED, -SPEED );

    // Keep track of collision points so the path can be shown as array of lines.
    // @public {ObservableArray.<Vector2>} (read-only) - the points where the ball has collided with the walls
    this.collisionPoints = new ObservableArray();

    // @public {Emitter} (read-only) - emits when the ball was restarted
    this.restartEmitter = new Emitter();

    SceneRatio.call( this, visibleProperty, [
      this.widthProperty,
      this.heightProperty
    ] );

    // Restart the ball when the length or width changes
    this.visibleChangeEmitter.addListener( this.restartBall.bind( this ) );
  }

  proportionPlayground.register( 'BilliardsTable', BilliardsTable );

  return inherit( SceneRatio, BilliardsTable, {
    /**
     * Restart the ball in the correct location and notify observers.
     * @public
     */
    restartBall: function() {
      // initially the ball starts in the bottom left corner and moves up and to the right.
      this.ballPositionProperty.value = new Vector2( 0, this.heightProperty.value );
      this.ballVelocity.setXY( SPEED, -SPEED );

      this.collisionPoints.clear();
      this.restartEmitter.emit();
    },

    /**
     * Reset the table and restart the ball.
     * @public
     * @override
     */
    reset: function() {
      SceneRatio.prototype.reset.call( this );

      this.restartBall();
    },

    /**
     * Moves the ball forward in time, and handles collisions.
     * @public
     *
     * @param {number} dt - Time to move forward in seconds
     */
    step: function( dt ) {
      // Cap DT
      //TODO: move cap to main model entry point
      dt = Math.min( dt, 0.25 );

      var width = this.widthProperty.value;
      var height = this.heightProperty.value;

      assert && assert( width > 0 && height > 0 );

      // Mutable vectors (we'll copy position to the new Property value at the end)
      var position = scratchVector.set( this.ballPositionProperty.value );
      var velocity = this.ballVelocity;

      // Bail out if the ball has stopped
      if ( velocity.magnitude() === 0 ) {
        return;
      }

      // Create a collision point at the very start if we have no collision points
      if ( this.collisionPoints.length === 0 ) {
        this.collisionPoints.add( position.copy() );
      }

      // Keep bouncing while we still can (and have time left)
      while ( velocity.magnitude() > 0 && dt > 0 ) {
        // What are the wall x/y values in the direction we're traveling
        var boundaryX = velocity.x > 0 ? width : 0;
        var boundaryY = velocity.y > 0 ? height : 0;

        // How much time until we hit said boundaries.
        var timeLeftX = ( boundaryX - position.x ) / velocity.x;
        var timeLeftY = ( boundaryY - position.y ) / velocity.y;
        assert && assert( timeLeftX >= 0 );
        assert && assert( timeLeftY >= 0 );

        // Time until hitting the first wall
        var minTimeLeft = Math.min( timeLeftX, timeLeftY );

        // We won't make it to a wall, just step forward and use up DT
        if ( dt < minTimeLeft ) {
          position.add( velocity.times( dt ) );
          dt = 0;
        }
        // We'll bounce off (and possibly continue afterwards)
        else {
          // Step to the position on the wall
          position.add( velocity.times( minTimeLeft ) );

          // Round (so our collision and end points are nice)
          //TODO: add Vector2 function for this
          position.x = Util.roundSymmetric( position.x );
          position.y = Util.roundSymmetric( position.y );

          // Record the bounce
          this.collisionPoints.push( position.copy() );

          // Sanity check, in case imprecise computations puts us over the boundary
          if ( minTimeLeft > 0 ) {
            dt -= minTimeLeft;
          }

          // If we bounced on the left or right
          if ( timeLeftX === minTimeLeft ) {
            velocity.x *= -1;
          }
          if ( timeLeftY === minTimeLeft ) {
            velocity.y *= -1;
          }

          // Stop the ball when we hit a corner
          if ( ( position.x === 0 || position.x === width ) &&
               ( position.y === 0 || position.y === height ) ) {
            this.ballVelocity.setXY( 0, 0 );
          }
        }
      }

      // Since we used a mutable vector for position, copy it over to the Property
      this.ballPositionProperty.value = position.copy();
    }
  } );
} );