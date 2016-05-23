// Copyright 2016, University of Colorado Boulder

/**
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
  var speed = 8;

  function Ball() {
    PropertySet.call( this, {
      position: new Vector2( 0, 0 ),
      velocity: new Vector2( speed, -speed )
    } );

    // TODO: Delete
    this.positionProperty = this.positionProperty || null;
    this.position = this.position || null;
    this.velocityProperty = this.velocityProperty || null;
    this.velocity = this.velocity || null;
  }

  proportionPlayground.register( 'Ball', Ball );

  return inherit( PropertySet, Ball, {
    restartBall: function( x, y ) {
      this.position = new Vector2( x, y );

      // initially the ball starts in the bottom left corner and moves up and to the right.
      this.velocity = new Vector2( speed, -speed );
    }
  } );
} );