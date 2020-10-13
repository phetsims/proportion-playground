// Copyright 2016-2020, University of Colorado Boulder

/**
 * Model for the necklace scene, which contains two necklaces.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import proportionPlayground from '../../../proportionPlayground.js';
import Scene from '../Scene.js';
import Necklace from './Necklace.js';

class NecklaceScene extends Scene {
  /**
   * @param {boolean} predictMode - Whether there should be a 'reveal' button to help the user predict.
   */
  constructor( predictMode ) {
    super( predictMode );

    const initialCount = predictMode ? 5 : 0;

    // @public
    this.leftNecklace = new Necklace( initialCount, initialCount, this.leftVisibleProperty, this.leftControlsVisibleProperty );
    this.rightNecklace = new Necklace( initialCount, initialCount, this.rightVisibleProperty, this.rightControlsVisibleProperty );

    this.initializeRatios( this.leftNecklace, this.rightNecklace );
  }
}

proportionPlayground.register( 'NecklaceScene', NecklaceScene );

export default NecklaceScene;