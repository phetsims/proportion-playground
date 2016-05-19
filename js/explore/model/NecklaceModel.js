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

  function NecklaceModel() {
    PropertySet.call( this, {
      roundBeadCount: 0,
      squareBeadCount: 0
    } );
  }

  proportionPlayground.register( 'NecklaceModel', NecklaceModel );

  return inherit( PropertySet, NecklaceModel, {} );
} );