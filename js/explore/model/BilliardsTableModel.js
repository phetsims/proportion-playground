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
  var Range = require( 'DOT/Range' );
  var Ball = require( './Ball' ); // TODO: is relative style legit?  If legit, is it maintainable despite being nonstandard?
  var Vector2 = require( 'DOT/Vector2' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Emitter = require( 'AXON/Emitter' );

  function BilliardsTableModel() {
    var billiardsTableModel = this;
    PropertySet.call( this, {
      length: 7, // TODO: 0
      width: 8
    } );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.lengthProperty = this.lengthProperty || null;
    this.widthProperty = this.widthProperty || null;

    // TODO: Factor out ranges
    this.range = new Range( 0, 20 );

    this.ball = new Ball();

    // Keep track of collision points so the path can be shown as array of lines.
    this.collisionPoints = new ObservableArray();

    this.restartEmitter = new Emitter();

    var restartBall = function() {
      billiardsTableModel.ball.restartBall( 0, billiardsTableModel.length );
      billiardsTableModel.collisionPoints.clear();
      billiardsTableModel.restartEmitter.emit();
    };
    this.lengthProperty.link( restartBall );
    this.widthProperty.link( restartBall );

    this.resetBilliardsTableModel = function() {
      restartBall();
    };
  }

  proportionPlayground.register( 'BilliardsTableModel', BilliardsTableModel );

  // Ball has collided with the wall, re-center at nearest integral coordinates so the trace doesn't get off course
  function round( x, y ) {
    return new Vector2( Math.round( x ), Math.round( y ) );
  }

  return inherit( PropertySet, BilliardsTableModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.resetBilliardsTableModel();
    },
    step: function( dt ) {

      // Cap DT
      dt = Math.min( dt, 1 / 16 * 4 );

      if ( this.length === 0 || this.width === 0 ) {
        return;
      }
      if ( this.collisionPoints.length === 0 ) {
        this.collisionPoints.add( this.ball.position.copy() );
      }
      this.ball.position = this.ball.position.plus( this.ball.velocity.times( dt ) );

      // TODO: Factor out?
      if ( this.ball.velocity.x > 0 && this.ball.position.x >= this.width ) {
        this.ball.velocity.x *= -1;
        this.ball.position = round( this.width, this.ball.position.y );
        this.collisionPoints.push( this.ball.position.copy() );
      }
      if ( this.ball.velocity.x < 0 && this.ball.position.x <= 0 ) {
        this.ball.velocity.x *= -1;
        this.ball.position = round( 0, this.ball.position.y );
        this.collisionPoints.push( this.ball.position.copy() );
      }

      if ( this.ball.velocity.y > 0 && this.ball.position.y >= this.length ) {
        this.ball.velocity.y *= -1;
        this.ball.position = round( this.ball.position.x, this.length );
        this.collisionPoints.push( this.ball.position.copy() );
      }
      if ( this.ball.velocity.y < 0 && this.ball.position.y <= 0 ) {
        this.ball.velocity.y *= -1;
        this.ball.position = round( this.ball.position.x, 0 );
        this.collisionPoints.push( this.ball.position.copy() );
      }
    }
  } );
} );