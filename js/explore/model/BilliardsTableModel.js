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

  function BilliardsTableModel() {
    var billiardsTableModel = this;
    PropertySet.call( this, {
      length: 0,
      width: 0
    } );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.lengthProperty = this.lengthProperty || null;
    this.widthProperty = this.widthProperty || null;

    // TODO: Factor out ranges
    this.range = new Range( 0, 20 );

    this.ball = new Ball();

    var restartBall = function() {
      billiardsTableModel.ball.restartBall( 0, billiardsTableModel.length );
    };
    this.lengthProperty.link( restartBall );
    this.widthProperty.link( restartBall );
  }

  proportionPlayground.register( 'BilliardsTableModel', BilliardsTableModel );

  return inherit( PropertySet, BilliardsTableModel, {
    step: function( dt ) {
      this.ball.position = this.ball.position.plus( this.ball.velocity.times( dt ) );

      if ( this.ball.velocity.x > 0 && this.ball.position.x >= this.width ) {
        this.ball.velocity.x *= -1;
        this.ball.position = new Vector2( this.width, this.ball.position.y );
      }
      if ( this.ball.velocity.x < 0 && this.ball.position.x <= 0 ) {
        this.ball.velocity.x *= -1;
        this.ball.position = new Vector2( 0, this.ball.position.y );
      }

      if ( this.ball.velocity.y > 0 && this.ball.position.y >= this.length ) {
        this.ball.velocity.y *= -1;
        this.ball.position = new Vector2( this.ball.position.x, this.length );
      }
      if ( this.ball.velocity.y < 0 && this.ball.position.y <= 0 ) {
        this.ball.velocity.y *= -1;
        this.ball.position = new Vector2( this.ball.position.x, 0 );
      }
    }
  } );
} );