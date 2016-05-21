// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var GameModel = require( 'PROPORTION_PLAYGROUND/game/model/GameModel' );
  var GameScreenView = require( 'PROPORTION_PLAYGROUND/game/view/GameScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // strings
  var gameString = require( 'string!PROPORTION_PLAYGROUND/game' );

  /**
   * @constructor
   */
  function GameScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = new Rectangle( 0, 0, 548, 373, { fill: 'view' } );

    Screen.call( this, gameString, icon,
      function() { return new GameModel(); },
      function( model ) { return new GameScreenView( model ); },
      { backgroundColor: '#fcf3eb' }
    );
  }

  proportionPlayground.register( 'GameScreen', GameScreen );

  return inherit( Screen, GameScreen );
} );