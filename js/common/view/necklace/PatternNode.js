// Copyright 2016-2022, University of Colorado Boulder

/**
 * Displays a single instance of the repeating pattern for a single necklace.
 * @public
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Multilink from '../../../../../axon/js/Multilink.js';
import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { Circle, Node, Rectangle } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';

// constants
const BEAD_SIZE = 9;

// {Node} - Will have multiple parents, used as a single graphic node
const roundBeadNode = new Circle( BEAD_SIZE / 2, {
  fill: ProportionPlaygroundColors.necklaceRoundBeadProperty
} );

// {Node} - Will have multiple parents, used as a single graphic node
const squareBeadNode = new Rectangle( 0, 0, BEAD_SIZE, BEAD_SIZE, {
  fill: ProportionPlaygroundColors.necklaceSquareBeadProperty,
  center: Vector2.ZERO
} );

// {number} - Vertical offset between nodes
const NODE_OFFSET = roundBeadNode.height + 1.5;

// {number} - Maximum number of beads visible in a pattern (20,20 will reduce to 1,1)
const MAX_BEADS = 2 * ProportionPlaygroundConstants.BEAD_COUNT_RANGE.max - 1;

class PatternNode extends Node {
  /**
   * @param {Necklace} necklace
   * @param {Object} [options]
   */
  constructor( necklace, options ) {
    super();

    // Construct nodes for every possible bead
    const roundBeadNodes = _.range( 0, MAX_BEADS ).map( n => new Node( {
      children: [ roundBeadNode ],
      y: NODE_OFFSET * n
    } ) );
    const squareBeadNodes = _.range( 0, MAX_BEADS ).map( n => new Node( {
      children: [ squareBeadNode ],
      y: NODE_OFFSET * n
    } ) );
    roundBeadNodes.forEach( this.addChild.bind( this ) );
    squareBeadNodes.forEach( this.addChild.bind( this ) );

    // Toggle visibility based on current counts
    Multilink.multilink( [ necklace.roundBeadCountProperty, necklace.squareBeadCountProperty ], ( roundBeadCount, squareBeadCount ) => {
      const gcd = Utils.gcd( roundBeadCount, squareBeadCount );
      if ( gcd !== 0 ) {
        roundBeadCount /= gcd;
        squareBeadCount /= gcd;
      }
      for ( let i = 0; i < MAX_BEADS; i++ ) {
        roundBeadNodes[ i ].visible = i < roundBeadCount;
        squareBeadNodes[ i ].visible = ( i >= roundBeadCount ) && ( i < squareBeadCount + roundBeadCount );
      }
    } );

    this.mutate( options );
  }
}

proportionPlayground.register( 'PatternNode', PatternNode );

export default PatternNode;