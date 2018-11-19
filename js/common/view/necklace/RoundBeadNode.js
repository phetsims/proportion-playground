// Copyright 2016-2018, University of Colorado Boulder

/**
 * Shows a single round bead.  Used in the necklace as well as in the NumberPicker icons.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;

  // {Node} - Our colors need to be updated on the shaded sphere, so it's wrapped in a MutableOptionsNode.
  var shadedNode = new MutableOptionsNode( ShadedSphereNode, [ DIAMETER ], {
    highlightDiameter: DIAMETER * 0.3,
    highlightXOffset: -0.3,
    highlightYOffset: -0.3
  }, {
    mainColor: ProportionPlaygroundColorProfile.adjustedNecklaceRoundBeadProperty( -0.1 ),
    shadowColor: ProportionPlaygroundColorProfile.adjustedNecklaceRoundBeadProperty( -0.5 ),
    highlightColor: ProportionPlaygroundColorProfile.adjustedNecklaceRoundBeadProperty( 0.5 )
  } );

  // {Node} - Background
  var backgroundNode = new Circle( DIAMETER * 0.51, {
    fill: ProportionPlaygroundColorProfile.adjustedNecklaceRoundBeadProperty( -0.6 ),
    x: DIAMETER / 30,
    y: DIAMETER / 30
  } );

  // {Node} - Shared child node that will have a parent for every display of this node.
  // Presumably should not memory-leak, as we save and re-use references.
  var containerNode = new Node( {
    children: [ backgroundNode, shadedNode ],
    center: Vector2.ZERO
  } );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {Object} [options] - node options
   */
  function RoundBeadNode( options ) {
    Node.call( this, _.extend( { children: [ containerNode ] }, options ) );
  }

  proportionPlayground.register( 'RoundBeadNode', RoundBeadNode );

  return inherit( Node, RoundBeadNode );
} );
