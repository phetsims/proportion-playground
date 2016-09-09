// Copyright 2016, University of Colorado Boulder

/**
 * The explore screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ExploreModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreModel' );
  var ExploreScreenView = require( 'PROPORTION_PLAYGROUND/explore/view/ExploreScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // strings
  var exploreString = require( 'string!PROPORTION_PLAYGROUND/explore' );

  /**
   * @constructor
   */
  function ExploreScreen() {

    var options = {
      name: exploreString,
      backgroundColor: ProportionPlaygroundConstants.SCREEN_BACKGROUND_COLOR
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new ExploreModel( false ); },
      function( model ) { return new ExploreScreenView( model ); },
      options );
  }

  proportionPlayground.register( 'ExploreScreen', ExploreScreen );

  return inherit( Screen, ExploreScreen );
} );