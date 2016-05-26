// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  function BilliardTableIcon( width, height, options ) {
    var inset = width * 0.15;
    Node.call( this, {
      children: [
        new Rectangle( -inset, -inset, width, height, { fill: ProportionPlaygroundConstants.billiardsBrown } ),// brown
        new Rectangle( 0, 0, width - inset * 2, height - inset * 2, { fill: ProportionPlaygroundConstants.billiardsGreen } ) // green
      ]
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'BilliardTableIcon', BilliardTableIcon );

  return inherit( Node, BilliardTableIcon );
} );