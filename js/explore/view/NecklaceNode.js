// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function NecklaceNode( necklaceModel ) {
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( Object, NecklaceNode, {} );
} );