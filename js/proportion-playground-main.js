// Copyright 2016-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import ExploreScreen from './explore/ExploreScreen.js';
import PredictScreen from './predict/PredictScreen.js';
import ProportionPlaygroundStrings from './ProportionPlaygroundStrings.js';

const proportionPlaygroundTitleStringProperty = ProportionPlaygroundStrings[ 'proportion-playground' ].titleStringProperty;

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

simLauncher.launch( () => {
  const sim = new Sim( proportionPlaygroundTitleStringProperty, [
    new ExploreScreen( Tandem.ROOT.createTandem( 'exporeScreen' ) ),
    new PredictScreen( Tandem.ROOT.createTandem( 'predictScreen' ) )
  ], simOptions );
  sim.start();
} );