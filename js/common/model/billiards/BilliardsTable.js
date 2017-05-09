// Copyright 2016-2017, University of Colorado Boulder

/**
 * Model for one table in the Billiards scene
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );
  var Vector2 = require( 'DOT/Vector2' );

  var scratchVector = new Vector2();

  /**
   * @constructor
   * @extends {SceneRatio}
   *
   * @param {number} initialLength - Initial length of the billiards table.
   * @param {number} initialWidth - Initial width of the billiards table.
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   */
  function BilliardsTable( initialLength, initialWidth, visibleProperty, controlsVisibleProperty ) {

    // @public {NumberProperty} - Number of grid units vertically
    this.lengthProperty = new NumberProperty( initialLength );

    // @public {NumberProperty} - Number of grid units horizontally
    this.widthProperty = new NumberProperty( initialWidth );

    // @public {Property.<Vector2>} - The position of the ball in pixels
    this.ballPositionProperty = new Property( new Vector2() );

    // @public {Vector2} - The velocity of the ball in pixels per second
    this.ballVelocity = new Vector2();

    // Keep track of collision points so the path can be shown as an array of lines.
    // @public {ObservableArray.<Vector2>} (read-only) - the points where the ball has collided with the walls
    this.collisionPoints = new ObservableArray( new Vector2() );

    // @public {Emitter} (read-only) - emits when the ball was restarted
    this.restartEmitter = new Emitter();

    // @public {boolean} - Whether the table has started animating (so we can continue to animate it in the background)
    this.hasStartedAnimating = false;

    this.restartBall(); // Helps initialize in one place

    SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
      this.lengthProperty, ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE,
      this.widthProperty, ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE );

    // Restart the ball when the length or width changes
    this.lengthProperty.link( this.restartBall.bind( this ) );
    this.widthProperty.link( this.restartBall.bind( this ) );
  }

  proportionPlayground.register( 'BilliardsTable', BilliardsTable );

  return inherit( SceneRatio, BilliardsTable, {
    /**
     * Restart the ball in the correct location and notify observers.
     * @public
     */
    restartBall: function() {

      // For readability
      var length = this.lengthProperty.value;
      var width = this.widthProperty.value;

      // See https://github.com/phetsims/proportion-playground/issues/13
      var speed = 1.5 * Math.sqrt( Math.pow( length, 2 ) + Math.pow( width, 2 ) );

      // initially the ball starts in the bottom left corner and moves up and to the right.
      this.ballPositionProperty.value = new Vector2();
      this.ballVelocity.setXY( speed, speed );

      this.collisionPoints.clear();
      this.collisionPoints.push( new Vector2() );
      this.restartEmitter.emit();

      this.hasStartedAnimating = false;
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
      // Skip 0 dt, so we can simplify our intersection detection
      if ( dt === 0 ) {
        return;
      }

      if ( !this.hasStartedAnimating ) {
        this.hasStartedAnimating = true;
      }

      var width = this.widthProperty.value;
      var length = this.lengthProperty.value;

      assert && assert( width > 0 && length > 0 );

      // Mutable vectors (we'll copy position to the new Property value at the end)
      var position = scratchVector.set( this.ballPositionProperty.value );
      var velocity = this.ballVelocity;

      // Bail out if the ball has stopped
      if ( velocity.magnitude() === 0 ) {
        return;
      }

      // Keep bouncing while we still can (and have time left)
      while ( velocity.magnitude() > 0 && dt > 0 ) {
        // What are the wall x/y values in the direction we're traveling
        var boundaryX = velocity.x > 0 ? width : 0;
        var boundaryY = velocity.y > 0 ? length : 0;

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
          position.roundSymmetric();

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
               ( position.y === 0 || position.y === length ) ) {
            this.ballVelocity.setXY( 0, 0 );
          }
        }
      }

      // Since we used a mutable vector for position, copy it over to the Property
      this.ballPositionProperty.value = position.copy();
    }
  } );
} );
