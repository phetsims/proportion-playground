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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Vector2 = require( 'DOT/Vector2' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  var DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;
  var colorProperty = ProportionPlaygroundColorProfile.necklaceRoundBeadProperty;
  // TODO: add a function like this to Color
  function adjustedColorUtilsBrightness( amount ) {
    return new DerivedProperty( [ colorProperty ], function( color ) {
      if ( amount > 0 ) {
        return color.colorUtilsBrighter( amount );
      }
      else if ( amount < 0 ) {
        return color.colorUtilsDarker( -amount );
      }
      else {
        return color;
      }
    } );
  }

  var shadedNode = new MutableOptionsNode( ShadedSphereNode, [ DIAMETER ], {
    highlightDiameter: DIAMETER * 0.3,
    highlightXOffset: -0.3,
    highlightYOffset: -0.3
  }, {
    mainColor: adjustedColorUtilsBrightness( -0.1 ),
    shadowColor: adjustedColorUtilsBrightness( -0.5 ),
    highlightColor: adjustedColorUtilsBrightness( 0.5 ),
  } );
  var backgroundNode = new Circle( DIAMETER * 0.51, {
    fill: adjustedColorUtilsBrightness( -0.6 ),
    x: DIAMETER / 30,
    y: DIAMETER / 30
  } );
  var containerNode = new Node( {
    children: [ backgroundNode, shadedNode ],
    center: Vector2.ZERO
  } );

  /**
   * @constructor
   *
   * @param {Object} [options] - node options
   */
  function RoundBeadNode( options ) {
    Node.call( this, _.extend( { children: [ containerNode ] }, options ) );
  }

  proportionPlayground.register( 'RoundBeadNode', RoundBeadNode );

  return inherit( Node, RoundBeadNode );
} );
