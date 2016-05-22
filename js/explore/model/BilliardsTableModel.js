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

  function BilliardsTableModel() {
    PropertySet.call( this, {
      length: 0,
      width: 0
    } );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.lengthProperty = this.lengthProperty || null;
    this.widthProperty = this.widthProperty || null;

    // TODO: Factor out ranges
    this.range = new Range( 0, 20 );
  }

  proportionPlayground.register( 'BilliardsTableModel', BilliardsTableModel );

  return inherit( PropertySet, BilliardsTableModel, {} );
} );