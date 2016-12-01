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

  /**
   * @constructor
   */
  function GameModel() {

    PropertySet.call( this, {} );
  }

  proportionPlayground.register( 'GameModel', GameModel );

  return inherit( PropertySet, GameModel, {

    // @public
    step: function( dt ) {
    }
  } );
} );
