// Copyright 2016-2021, University of Colorado Boulder

/**
 * In the Predict screen, the user can press the RevealButton to show the items.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import eyeRegularShape from '../../../../sherpa/js/fontawesome-5/eyeRegularShape.js';
import eyeSlashRegularShape from '../../../../sherpa/js/fontawesome-5/eyeSlashRegularShape.js';
import BooleanRoundToggleButton from '../../../../sun/js/buttons/BooleanRoundToggleButton.js';
import proportionPlayground from '../../proportionPlayground.js';
import proportionPlaygroundColorProfile from './proportionPlaygroundColorProfile.js';

class RevealButton extends BooleanRoundToggleButton {
  /**
   * @param {Property.<boolean>} revealingProperty - true if the answer should be shown.
   * @param {Object} [options]
   */
  constructor( revealingProperty, options ) {
    const revealedNode = new Path( eyeRegularShape, { scale: 0.07, fill: 'black' } );
    const hiddenNode = new Path( eyeSlashRegularShape, { scale: 0.07, fill: 'black' } );

    options = merge( {
      xMargin: 10,
      yMargin: 10,
      baseColor: proportionPlaygroundColorProfile.revealButtonProperty
    }, options );

    super( revealedNode, hiddenNode, revealingProperty, options );
  }
}

proportionPlayground.register( 'RevealButton', RevealButton );

export default RevealButton;