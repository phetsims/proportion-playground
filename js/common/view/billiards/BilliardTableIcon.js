// Copyright 2016, University of Colorado Boulder

/**
 * This shows an iconic representation of a billiards table.  It is non-dynamic and simplified.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {number} width - the width of the icon
   * @param {number} height - the height of the icon (called length in the model)
   * @param {Object} [options] - node options
   */
  function BilliardTableIcon( width, height, options ) {
    var inset = width * 0.15;
    Node.call( this, {
      children: [
        new Rectangle( -inset, -inset, width, height, {
          fill: ProportionPlaygroundColorProfile.billiardsBorderProperty
        } ),
        new Rectangle( 0, 0, width - inset * 2, height - inset * 2, {
          fill: ProportionPlaygroundColorProfile.billiardsInsideProperty
        } )
      ]
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'BilliardTableIcon', BilliardTableIcon );

  return inherit( Node, BilliardTableIcon );
} );
