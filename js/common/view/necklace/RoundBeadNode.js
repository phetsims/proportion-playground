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
  var Color = require( 'SCENERY/util/Color' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  var DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;
  var COLOR = new Color( ProportionPlaygroundConstants.BEADS_PINK );
  var shadedNode = new ShadedSphereNode( DIAMETER, {
    highlightDiameter: DIAMETER * 0.3,
    mainColor: COLOR.colorUtilsDarker( 0.1 ),
    shadowColor: COLOR.colorUtilsDarker( 0.5 ),
    highlightColor: COLOR.colorUtilsBrighter( 0.5 ),
    highlightXOffset: -0.3,
    highlightYOffset: -0.3
  } );
  var backgroundNode = new Circle( DIAMETER * 0.51, {
    fill: COLOR.colorUtilsDarker( 0.6 ),
    x: DIAMETER / 30,
    y: DIAMETER / 30
  } );

  /**
   * @constructor
   *
   * @param {Object} [options] - node options
   */
  function RoundBeadNode( options ) {
    Node.call( this, _.extend( { children: [ backgroundNode, shadedNode ] }, options ) );
  }

  proportionPlayground.register( 'RoundBeadNode', RoundBeadNode );

  return inherit( Node, RoundBeadNode );
} );
