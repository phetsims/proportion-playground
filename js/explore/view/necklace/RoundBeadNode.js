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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // constants
  var PINK = ProportionPlaygroundConstants.BEADS_PINK;

  /**
   *
   * @param {Object} [options] - node options
   * @constructor
   */
  function RoundBeadNode( options ) {
    Node.call( this, { children: [ new Circle( ProportionPlaygroundConstants.BEAD_DIAMETER / 2, { fill: PINK } ) ] } );
    this.mutate( options );
  }

  proportionPlayground.register( 'RoundBeadNode', RoundBeadNode );

  return inherit( Node, RoundBeadNode );
} );