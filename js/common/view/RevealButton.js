// Copyright 2016-2019, University of Colorado Boulder

/**
 * In the Predict screen, the user can press the RevealButton to show the items.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import BooleanRoundToggleButton from '../../../../sun/js/buttons/BooleanRoundToggleButton.js';
import FontAwesomeNode from '../../../../sun/js/FontAwesomeNode.js';
import MutableOptionsNode from '../../../../sun/js/MutableOptionsNode.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from './ProportionPlaygroundColorProfile.js';

/**
 * @constructor
 * @extends {BooleanRoundToggleButton}
 *
 * @param {Property.<boolean>} revealingProperty - true if the answer should be shown.
 * @param {Object} [options]
 */
function RevealButton( revealingProperty, options ) {
  const revealedNode = new FontAwesomeNode( 'eye_open' );
  const hiddenNode = new FontAwesomeNode( 'eye_close' );
  MutableOptionsNode.call( this, BooleanRoundToggleButton, [ revealedNode, hiddenNode, revealingProperty ], {
    minXMargin: 10,
    minYMargin: 10
  }, {
    baseColor: ProportionPlaygroundColorProfile.revealButtonProperty
  }, options );
}

proportionPlayground.register( 'RevealButton', RevealButton );

inherit( MutableOptionsNode, RevealButton );
export default RevealButton;