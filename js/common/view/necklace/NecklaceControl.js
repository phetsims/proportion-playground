// Copyright 2016-2020, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with NumberPickers to change the amount of each type of bead.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from '../ProportionPlaygroundColorProfile.js';
import SceneRatioControl from '../SceneRatioControl.js';
import NecklaceNode from './NecklaceNode.js';
import RoundBeadNode from './RoundBeadNode.js';
import SquareBeadNode from './SquareBeadNode.js';

class NecklaceControl extends SceneRatioControl {
  /**
   * @param {Necklace} necklace - the model
   * @param {Tandem} tandem
   */
  constructor( necklace, tandem ) {
    assert && assert( tandem );

    super(
      necklace,
      ProportionPlaygroundColorProfile.necklaceRoundBeadProperty,
      ProportionPlaygroundColorProfile.necklaceSquareBeadProperty,
      tandem,
      {
        leftPickerLabel: new RoundBeadNode(),
        rightPickerLabel: new SquareBeadNode( 0 )
      }
    );

    // The necklace itself
    this.addChild( new NecklaceNode( necklace ) );
    this.addBottomPickers();
  }
}

proportionPlayground.register( 'NecklaceControl', NecklaceControl );

export default NecklaceControl;