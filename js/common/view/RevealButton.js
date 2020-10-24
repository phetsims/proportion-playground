// Copyright 2016-2020, University of Colorado Boulder

/**
 * In the Predict screen, the user can press the RevealButton to show the items.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import FontAwesomeNode from '../../../../sun/js/FontAwesomeNode.js';
import MutableOptionsNode from '../../../../sun/js/MutableOptionsNode.js';
import BooleanRoundToggleButton from '../../../../sun/js/buttons/BooleanRoundToggleButton.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from './ProportionPlaygroundColorProfile.js';

class RevealButton extends MutableOptionsNode {
  /**
   * @param {Property.<boolean>} revealingProperty - true if the answer should be shown.
   * @param {Object} [options]
   */
  constructor( revealingProperty, options ) {
    const revealedNode = new FontAwesomeNode( 'eye_open' );
    const hiddenNode = new FontAwesomeNode( 'eye_close' );
    super( BooleanRoundToggleButton, [ revealedNode, hiddenNode, revealingProperty ], {
      xMargin: 10,
      yMargin: 10
    }, {
      baseColor: ProportionPlaygroundColorProfile.revealButtonProperty
    }, options );
  }
}

proportionPlayground.register( 'RevealButton', RevealButton );

export default RevealButton;