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

  function NecklaceModel() {
    PropertySet.call( this, {
      roundBeadCount: 0,
      squareBeadCount: 0
    } );

    // TODO: Combine ranges
    this.roundBeadRange = new Range( 0, 20 );
    this.squareBeadRange = new Range( 0, 20 );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.roundBeadCountProperty = this.roundBeadCountProperty || null;
    this.squareBeadCountProperty = this.squareBeadCountProperty || null;
  }

  proportionPlayground.register( 'NecklaceModel', NecklaceModel );

  return inherit( PropertySet, NecklaceModel, {} );
} );