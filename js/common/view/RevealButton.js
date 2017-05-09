// Copyright 2016-2017, University of Colorado Boulder

/**
 * In the Predict screen, the user can press the RevealButton to show the items.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanRoundToggleButton = require( 'SUN/buttons/BooleanRoundToggleButton' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );

  /**
   * @constructor
   * @extends {BooleanRoundToggleButton}
   *
   * @param {Property.<boolean>} revealingProperty - true if the answer should be shown.
   * @param {Object} [options]
   */
  function RevealButton( revealingProperty, options ) {
    var revealedNode = new FontAwesomeNode( 'eye_open' );
    var hiddenNode = new FontAwesomeNode( 'eye_close' );
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
