// Copyright 2016, University of Colorado Boulder

/**
 * The explore screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  var ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Property = require( 'AXON/Property' );
  var Color = require( 'SCENERY/util/Color' );

  // strings
  var exploreString = require( 'string!PROPORTION_PLAYGROUND/explore' );

  /**
   * @constructor
   */
  function ExploreScreen() {

    var options = {
      name: exploreString,
      backgroundColorProperty: new Property( Color.toColor( ProportionPlaygroundConstants.SCREEN_BACKGROUND_COLOR ) )
      //TODO add homeScreenIcon
    };

    Screen.call( this,
      function() { return new ProportionModel( false ); },
      function( model ) { return new ProportionScreenView( model ); },
      options );
  }

  proportionPlayground.register( 'ExploreScreen', ExploreScreen );

  return inherit( Screen, ExploreScreen );
} );
