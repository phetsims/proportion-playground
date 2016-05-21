// Copyright 2016, University of Colorado Boulder

/**
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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  
  // strings
  var exploreString = require( 'string!PROPORTION_PLAYGROUND/explore' );

  /**
   * @constructor
   */
  function ExploreScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = new Rectangle( 0, 0, 548, 373, { fill: 'red' } );

    Screen.call( this, exploreString, icon,
      function() { return new ExploreModel(); },
      function( model ) { return new ExploreScreenView( model ); },
      { backgroundColor: '#fcf3eb' }
    );
  }

  proportionPlayground.register( 'ExploreScreen', ExploreScreen );

  return inherit( Screen, ExploreScreen );
} );