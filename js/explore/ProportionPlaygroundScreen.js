// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ProportionPlaygroundModel = require( 'PROPORTION_PLAYGROUND/explore/model/ProportionPlaygroundModel' );
  var ProportionPlaygroundScreenView = require( 'PROPORTION_PLAYGROUND/explore/view/ProportionPlaygroundScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  // strings
  var exploreString = require( 'string!PROPORTION_PLAYGROUND/explore' );

  /**
   * @constructor
   */
  function ProportionPlaygroundScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this, exploreString, icon,
      function() { return new ProportionPlaygroundModel(); },
      function( model ) { return new ProportionPlaygroundScreenView( model ); },
      { backgroundColor: 'white' }
    );
  }

  proportionPlayground.register( 'ProportionPlaygroundScreen', ProportionPlaygroundScreen );

  return inherit( Screen, ProportionPlaygroundScreen );
} );