// Copyright 2016-2022, University of Colorado Boulder

/**
 * This shows an iconic representation of a billiards table.  It is non-dynamic and simplified.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Node, Rectangle } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';

class BilliardTableIcon extends Node {
  /**
   * @param {number} width - the width of the icon
   * @param {number} height - the height of the icon (called length in the model)
   * @param {Object} [options] - node options
   */
  constructor( width, height, options ) {
    const inset = width * 0.15;
    super( {
      children: [
        new Rectangle( -inset, -inset, width, height, {
          fill: ProportionPlaygroundColors.billiardsBorderProperty,
          cornerRadius: inset
        } ),
        new Rectangle( 0, 0, width - inset * 2, height - inset * 2, {
          fill: ProportionPlaygroundColors.billiardsInsideProperty
        } )
      ]
    } );
    this.mutate( options );
  }
}

proportionPlayground.register( 'BilliardTableIcon', BilliardTableIcon );

export default BilliardTableIcon;