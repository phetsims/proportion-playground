// Copyright 2016-2022, University of Colorado Boulder

/**
 * Shows a single round bead.  Used in the necklace as well as in the NumberPicker icons.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import merge from '../../../../../phet-core/js/merge.js';
import ShadedSphereNode from '../../../../../scenery-phet/js/ShadedSphereNode.js';
import { Circle, Node } from '../../../../../scenery/js/imports.js';
import MutableOptionsNode from '../../../../../sun/js/MutableOptionsNode.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';

// constants
const DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;

// {Node} - Our colors need to be updated on the shaded sphere, so it's wrapped in a MutableOptionsNode.
const shadedNode = new MutableOptionsNode( ShadedSphereNode, [ DIAMETER ], {
  highlightDiameterRatio: 0.3,
  highlightXOffset: -0.3,
  highlightYOffset: -0.3
}, {
  mainColor: ProportionPlaygroundColors.adjustedNecklaceRoundBeadProperty( -0.1 ),
  shadowColor: ProportionPlaygroundColors.adjustedNecklaceRoundBeadProperty( -0.5 ),
  highlightColor: ProportionPlaygroundColors.adjustedNecklaceRoundBeadProperty( 0.5 )
} );

// {Node} - Background
const backgroundNode = new Circle( DIAMETER * 0.51, {
  fill: ProportionPlaygroundColors.adjustedNecklaceRoundBeadProperty( -0.6 ),
  x: DIAMETER / 30,
  y: DIAMETER / 30
} );

// {Node} - Shared child node that will have a parent for every display of this node.
// Presumably should not memory-leak, as we save and re-use references.
const containerNode = new Node( {
  children: [ backgroundNode, shadedNode ],
  center: Vector2.ZERO
} );

class RoundBeadNode extends Node {
  /**
   * @param {Object} [options] - node options
   */
  constructor( options ) {
    super( merge( { children: [ containerNode ] }, options ) );
  }
}

proportionPlayground.register( 'RoundBeadNode', RoundBeadNode );

export default RoundBeadNode;