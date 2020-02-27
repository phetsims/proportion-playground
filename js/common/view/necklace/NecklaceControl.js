// Copyright 2016-2019, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with NumberPickers to change the amount of each type of bead.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from '../ProportionPlaygroundColorProfile.js';
import SceneRatioControl from '../SceneRatioControl.js';
import NecklaceNode from './NecklaceNode.js';
import RoundBeadNode from './RoundBeadNode.js';
import SquareBeadNode from './SquareBeadNode.js';

/**
 * @constructor
 * @extends {SceneRatioControl}
 *
 * @param {Necklace} necklace - the model
 */
function NecklaceControl( necklace ) {
  SceneRatioControl.call( this, necklace, ProportionPlaygroundColorProfile.necklaceRoundBeadProperty,
    ProportionPlaygroundColorProfile.necklaceSquareBeadProperty, {
      leftPickerLabel: new RoundBeadNode(),
      rightPickerLabel: new SquareBeadNode( 0 )
    } );

  // The necklace itself
  this.addChild( new NecklaceNode( necklace ) );
  this.addBottomPickers();
}

proportionPlayground.register( 'NecklaceControl', NecklaceControl );

inherit( SceneRatioControl, NecklaceControl );
export default NecklaceControl;