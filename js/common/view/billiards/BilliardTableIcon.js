// Copyright 2016-2019, University of Colorado Boulder

/**
 * This shows an iconic representation of a billiards table.  It is non-dynamic and simplified.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {number} width - the width of the icon
   * @param {number} height - the height of the icon (called length in the model)
   * @param {Object} [options] - node options
   */
  function BilliardTableIcon( width, height, options ) {
    const inset = width * 0.15;
    Node.call( this, {
      children: [
        new Rectangle( -inset, -inset, width, height, {
          fill: ProportionPlaygroundColorProfile.billiardsBorderProperty,
          cornerRadius: inset
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
