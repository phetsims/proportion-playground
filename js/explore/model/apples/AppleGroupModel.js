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

  function AppleGroupModel() {
    PropertySet.call( this, {
      numberOfApples: 0,
      totalCost: 0
    } );

    // TODO: Combine ranges
    this.totalCostRange = new Range( 0, 20 );
    this.numberOfApplesRange = new Range( 0, 20 );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.numberOfApplesProperty = this.numberOfApplesProperty || null;
    this.totalCostProperty = this.totalCostProperty || null;
  }

  proportionPlayground.register( 'AppleGroupModel', AppleGroupModel );

  return inherit( PropertySet, AppleGroupModel, {} );
} );