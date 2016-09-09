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
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // strings
  var gameString = require( 'string!PROPORTION_PLAYGROUND/game' );

  /**
   * @constructor
   */
  function GameScreen() {

    var options = {
      name: gameString,
      backgroundColor: ProportionPlaygroundConstants.SCREEN_BACKGROUND_COLOR
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new GameModel(); },
      function( model ) { return new GameScreenView( model ); },
      options );
  }

  proportionPlayground.register( 'GameScreen', GameScreen );

  return inherit( Screen, GameScreen );
} );