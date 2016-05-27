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
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  /**
   * @constructor
   */
  function NecklaceModel() {
    PropertySet.call( this, {
      roundBeadCount: 0, // {number} @public the number of round beads in the necklace
      squareBeadCount: 0 // {number} @public the number of square beads in the necklace
    } );

    // Allowed range of bead counts
    this.beadCountRange = new Range( 0, ProportionPlaygroundConstants.maxBeads );

    // These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.roundBeadCountProperty = this.roundBeadCountProperty || null;
    this.squareBeadCountProperty = this.squareBeadCountProperty || null;
  }

  proportionPlayground.register( 'NecklaceModel', NecklaceModel );

  return inherit( PropertySet, NecklaceModel );
} );