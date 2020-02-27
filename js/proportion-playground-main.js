// Copyright 2016-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import ExploreScreen from './explore/ExploreScreen.js';
import PredictScreen from './predict/PredictScreen.js';
import proportionPlaygroundStrings from './proportion-playground-strings.js';

const proportionPlaygroundTitleString = proportionPlaygroundStrings[ 'proportion-playground' ].title;

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