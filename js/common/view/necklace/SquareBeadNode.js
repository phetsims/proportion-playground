// Copyright 2016, University of Colorado Boulder

/**
 * Shows a single round bead.  Used in the necklace as well as in the NumberPicker icons.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // constants
  var WIDTH = ProportionPlaygroundConstants.BEAD_DIAMETER;
  var BLUE = ProportionPlaygroundConstants.BEADS_BLUE;

  /**
   *
   * @param {Object} [options] - node options
   * @constructor
   */
  function SquareBeadNode( options ) {
    Node.call( this, {
      children: [ new Rectangle( -WIDTH / 2, -WIDTH / 2, WIDTH, WIDTH, { fill: BLUE } ) ]
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'SquareBeadNode', SquareBeadNode );

  return inherit( Node, SquareBeadNode );
} );
