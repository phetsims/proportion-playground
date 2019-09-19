// Copyright 2016-2017, University of Colorado Boulder

/**
 * In the Predict screen, the user can press the RevealButton to show the items.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BooleanRoundToggleButton = require( 'SUN/buttons/BooleanRoundToggleButton' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );

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

  return inherit( MutableOptionsNode, RevealButton );
} );
