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
  var ProportionPlaygroundQueryParameters = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundQueryParameters' );
  var Range = require( 'DOT/Range' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Emitter = require( 'AXON/Emitter' );
  var Property = require( 'AXON/Property' );
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );

  var scratchVector = new Vector2();

  /**
   * @constructor
   *
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   */
  function BilliardsTable( visibleProperty, controlsVisibleProperty ) {

    // @public {NumberProperty} - Number of grid units vertically
    this.lengthProperty = new NumberProperty( 1 );

    // @public {NumberProperty} - Number of grid units horizontally
    this.widthProperty = new NumberProperty( 1 );

    // @public (read-only) - the allowed values for length and width
    //TODO: do we need this outside of the SceneRatio call?
    this.range = new Range( 1, 20 );

    // @public {Property.<Vector2>} - The position of the ball in pixels
    this.ballPositionProperty = new Property( new Vector2() );

    // @public {Vector2} - The velocity of the ball in pixels per second
    this.ballVelocity = new Vector2();

    // Keep track of collision points so the path can be shown as array of lines.
    // @public {ObservableArray.<Vector2>} (read-only) - the points where the ball has collided with the walls
    this.collisionPoints = new ObservableArray();

    // @public {Emitter} (read-only) - emits when the ball was restarted
    this.restartEmitter = new Emitter();

    this.restartBall(); // Helps initialize in one place

    SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
                     this.lengthProperty, this.range,
                     this.widthProperty, this.range );

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
      // For readability
      var a = this.lengthProperty.value;
      var b = this.widthProperty.value;

      // So we can handle isomorphic cases. For bumps and distance, think of unwrapping the path, and compute the LCM (a*b after GCD).
      var gcd = Util.gcd( a, b );
      var numBumps = ( a + b ) / gcd - 1; // including the 'end' bump
      var distance = a * b * Math.sqrt( 2 ) / ( gcd * gcd ); // Simply across an (a/gcd)x(b/gcd) square

      var inputExpr = ProportionPlaygroundQueryParameters.billiardSpeed;

      // This is likely to be safe. What could go wrong? How can this be escaped?
      //TODO: remove this query parameter
      if ( inputExpr.replace( /Math\.sqrt/g, '' )
                    .replace( /Math\.pow/g, '' )
                    .replace( /Math\.min/g, '' )
                    .replace( /Math\.max/g, '' )
                    .replace( /Math\.abs/g, '' )
                    .replace( /distance/g, '' )
                    .replace( /bumps/g, '' )
                    .replace( /gcd/g, '' )
                    .replace( /a/g, '' )
                    .replace( /b/g, '' )
                    .replace( /\(/g, '' )
                    .replace( /\)/g, '' )
                    .replace( /\*/g, '' )
                    .replace( /\//g, '' )
                    .replace( /\+/g, '' )
                    .replace( /\-/g, '' )
                    .replace( /,/g, '' )
                    .replace( / /g, '' )
                    .replace( /\d/g, '' ).length !== 0 ) {
        throw new Error( 'No XSS' );
      }

      var speedExpr = '(function( a, b, distance, bumps, gcd ) { return ' + inputExpr + '; } )';

      // Our linter will never discover this. MUAHAHAHAHAHAHAHA
      var speed = window.eval( speedExpr )( a, b, distance, numBumps, gcd );
      // var speed = 8 * Math.sqrt( distance ) / Math.sqrt( numBumps );

      // initially the ball starts in the bottom left corner and moves up and to the right.
      this.ballPositionProperty.value = new Vector2( 0, this.lengthProperty.value );
      this.ballVelocity.setXY( speed, -speed );

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
      var length = this.lengthProperty.value;

      assert && assert( width > 0 && length > 0 );

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
