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

  function Ball() {
    PropertySet.call( this, { position: new Vector2( 0, 0 ) } );

    // TODO: Delete
    this.positionProperty = this.positionProperty || null;
    this.position = this.position || null;
  }

  proportionPlayground.register( 'Ball', Ball );

  return inherit( PropertySet, Ball, {
    restartBall: function() {
      this.position = new Vector2();
    }
  } );
} );