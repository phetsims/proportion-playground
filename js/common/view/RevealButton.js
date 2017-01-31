// Copyright 2016, University of Colorado Boulder

/**
 * In the Predict screen, the user can press the RevealButton to show the items.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var BooleanRoundToggleButton = require( 'SUN/buttons/BooleanRoundToggleButton' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {Property.<boolean>} revealingProperty - true if the answer should be shown.
   * @param {Object} [options]
   */
  function RevealButton( revealingProperty, options ) {
    var revealedNode = new FontAwesomeNode( 'eye_open' );
    var hiddenNode = new FontAwesomeNode( 'eye_close' );
    BooleanRoundToggleButton.call( this, revealedNode, hiddenNode, revealingProperty, {
      minXMargin: 10,
      minYMargin: 10
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'RevealButton', RevealButton );

  return inherit( BooleanRoundToggleButton, RevealButton );
} );
