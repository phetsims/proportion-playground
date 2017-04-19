// Copyright 2016, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ExploreScreen = require( 'PROPORTION_PLAYGROUND/explore/ExploreScreen' );
  var PredictScreen = require( 'PROPORTION_PLAYGROUND/predict/PredictScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var proportionPlaygroundTitleString = require( 'string!PROPORTION_PLAYGROUND/proportion-playground.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Andrea Lin, Sam Reid, Jonathan Olson',
      team: 'Karina Hensberry, Ariel Paul, Kathy Perkins, Beth Stade, Ian Whitacre',
      qualityAssurance: '', // TODO
      graphicArts: 'Mariah Hermsmeyer',
      thanks: 'This sim builds (in part) on prior work by our colleagues at SRI and the SunBay team (http://sunbay.sri.com/).'
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( proportionPlaygroundTitleString, [
      new ExploreScreen(),
      new PredictScreen()
    ], simOptions );
    sim.start();
  } );
} );
