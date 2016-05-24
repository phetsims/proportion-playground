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
  var BooleanRoundStickyToggleButton = require( 'SUN/buttons/BooleanRoundStickyToggleButton' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function RevealButton( revealingProperty, options ) {
    BooleanRoundStickyToggleButton.call( this, revealingProperty, {
      content: new FontAwesomeNode( 'eye_open' ),
      minXMargin: 10,
      minYMargin: 10
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'RevealButton', RevealButton );

  return inherit( BooleanRoundStickyToggleButton, RevealButton, {} );
} );