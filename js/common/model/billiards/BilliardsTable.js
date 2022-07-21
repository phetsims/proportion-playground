// Copyright 2016-2022, University of Colorado Boulder

/**
 * Model for one table in the Billiards scene
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import createObservableArray from '../../../../../axon/js/createObservableArray.js';
import Emitter from '../../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../../dot/js/Vector2Property.js';
import merge from '../../../../../phet-core/js/merge.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneRatio from '../SceneRatio.js';

// constants
const scratchVector = new Vector2( 0, 0 );

class BilliardsTable extends SceneRatio {
  /**
   * @param {Tandem} tandem
   * @param {Object} [options] - See below for available options
   */
  constructor( tandem, options ) {

    options = merge( {
      // {number} Initial length of the billiards table.
      initialLength: 5,

      // {number} Initial width of the billiards table.
      initialWidth: 5,

      // {Property.<boolean>} - Whether the view should be visible
      visibleProperty: new BooleanProperty( true ),

      // {Property.<boolean>} - Whether the controls should be visible
      controlsVisibleProperty: new BooleanProperty( true )
    }, options );

    const lengthProperty = new NumberProperty( options.initialLength, {
      range: ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE,
      numberType: 'Integer',
      tandem: tandem.createTandem( 'lengthProperty' )
    } );
    const widthProperty = new NumberProperty( options.initialWidth, {
      range: ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE,
      numberType: 'Integer',
      tandem: tandem.createTandem( 'widthProperty' )
    } );

    super( options.visibleProperty, options.controlsVisibleProperty,
      lengthProperty,
      widthProperty,
      tandem );

    // @public {NumberProperty} - Number of grid units vertically
    this.lengthProperty = lengthProperty;

    // @public {NumberProperty} - Number of grid units horizontally
    this.widthProperty = widthProperty;

    // @public {Property.<Vector2>} - The position of the ball in pixels
    this.ballPositionProperty = new Vector2Property( new Vector2( 0, 0 ), {
      phetioState: false,
      phetioReadOnly: true,
      tandem: tandem.createTandem( 'ballPositionProperty' )
    } );

    // @public {Vector2} - The velocity of the ball in pixels per second
    this.ballVelocity = new Vector2( 0, 0 );

    // Keep track of collision points so the path can be shown as an array of lines.
    // @public {ObservableArrayDef.<Vector2>} (read-only) - the points where the ball has collided with the walls
    this.collisionPoints = createObservableArray();

    // @public {Emitter} (read-only) - emits when the ball was restarted
    this.restartEmitter = new Emitter();

    // @public {boolean} - Whether the table has started animating (so we can continue to animate it in the background)
    this.hasStartedAnimating = false;

    this.restartBall(); // Helps initialize in one place

    // Restart the ball when the length or width changes
    this.lengthProperty.link( this.restartBall.bind( this ) );
    this.widthProperty.link( this.restartBall.bind( this ) );
  }

  /**
   * Restart the ball in the correct position and notify observers.
   * @public
   */
  restartBall() {

    // For readability
    const length = this.lengthProperty.value;
    const width = this.widthProperty.value;

    // See https://github.com/phetsims/proportion-playground/issues/13
    const speed = 1.5 * Math.sqrt( Math.pow( length, 2 ) + Math.pow( width, 2 ) );

    // initially the ball starts in the bottom left corner and moves up and to the right.
    this.ballPositionProperty.value = new Vector2( 0, 0 );
    this.ballVelocity.setXY( speed, speed );

    this.collisionPoints.clear();
    this.collisionPoints.push( new Vector2( 0, 0 ) );
    this.restartEmitter.emit();

    this.hasStartedAnimating = false;
  }

  /**
   * Reset the table and restart the ball.
   * @public
   * @override
   */
  reset() {
    super.reset();

    this.restartBall();
  }

  /**
   * Moves the ball forward in time, and handles collisions.
   * @public
   *
   * @param {number} dt - Time to move forward in seconds
   */
  step( dt ) {
    // Skip 0 dt, so we can simplify our intersection detection
    if ( dt === 0 ) {
      return;
    }

    if ( !this.hasStartedAnimating ) {
      this.hasStartedAnimating = true;
    }

    const width = this.widthProperty.value;
    const length = this.lengthProperty.value;

    assert && assert( width > 0 && length > 0 );

    // Mutable vectors (we'll copy position to the new Property value at the end)
    const position = scratchVector.set( this.ballPositionProperty.value );
    const velocity = this.ballVelocity;

    // Bail out if the ball has stopped
    if ( velocity.magnitude === 0 ) {
      return;
    }

    // Keep bouncing while we still can (and have time left)
    while ( velocity.magnitude > 0 && dt > 0 ) {
      // What are the wall x/y values in the direction we're traveling
      const boundaryX = velocity.x > 0 ? width : 0;
      const boundaryY = velocity.y > 0 ? length : 0;

      // How much time until we hit said boundaries.
      const timeLeftX = ( boundaryX - position.x ) / velocity.x;
      const timeLeftY = ( boundaryY - position.y ) / velocity.y;
      assert && assert( timeLeftX >= 0 );
      assert && assert( timeLeftY >= 0 );

      // Time until hitting the first wall
      const minTimeLeft = Math.min( timeLeftX, timeLeftY );

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
}

proportionPlayground.register( 'BilliardsTable', BilliardsTable );

export default BilliardsTable;
