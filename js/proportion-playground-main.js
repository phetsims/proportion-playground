// Copyright 2016-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const ExploreScreen = require( 'PROPORTION_PLAYGROUND/explore/ExploreScreen' );
  const PredictScreen = require( 'PROPORTION_PLAYGROUND/predict/PredictScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  const proportionPlaygroundTitleString = require( 'string!PROPORTION_PLAYGROUND/proportion-playground.title' );

  const simOptions = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Andrea Lin, Sam Reid, Jonathan Olson',
      team: 'Karina K. R. Hensberry, Ariel Paul, Kathy Perkins, Beth Stade, Ian Whitacre',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Ethan Johnson, Ben Roberts, Maggie Wiseman',
      graphicArts: 'Mariah Hermsmeyer',
      thanks: 'This sim builds (in part) on prior work by our colleagues at SRI and the SunBay team (http://sunbay.sri.com/).'
    }
  };

  SimLauncher.launch( function() {
    const sim = new Sim( proportionPlaygroundTitleString, [
      new ExploreScreen(),
      new PredictScreen()
    ], simOptions );
    sim.start();
  } );
} );
