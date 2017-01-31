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
  var Matrix3 = require( 'DOT/Matrix3' );
  var Vector2 = require( 'DOT/Vector2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );

  // constants
  var DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;
  var RADIUS = DIAMETER / 2;
  var GRADIENT_OFFSET = RADIUS * 0.6;
  var ROUND = RADIUS / 5;
  var colorProperty = ProportionPlaygroundColorProfile.necklaceSquareBeadProperty;
  // TODO: add a function like this to Color
  function adjustedColor( amount ) {
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
  var dark7 = adjustedColor( -0.7 );
  var dark4 = adjustedColor( -0.4 );
  var gradientProperty = new DerivedProperty( [ colorProperty ], function( color ) {
    return new RadialGradient( 0, 0, 0, 0, 0, DIAMETER + GRADIENT_OFFSET )
      .addColorStop( 0, color.colorUtilsBrighter( 0.2 ) )
      .addColorStop( 0.3, color )
      .addColorStop( 0.5, color.colorUtilsDarker( 0.1 ) )
      .addColorStop( 0.8, color.colorUtilsDarker( 0.3 ) );
  } );

  var scratchMatrix3 = new Matrix3();

  /**
   * @constructor
   *
   * @param {number} rotation - How the generated node should be rotated
   * @param {Object} [options] - node options
   */
  function SquareBeadNode( rotation, options ) {
    Node.call( this );

    var container = new Node( {
      scale: 0.95
    } );

    this.backRectangle = new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: dark7,
      rotation: rotation,
      x: -DIAMETER / 15,
      y: DIAMETER / 15
    } );
    container.addChild( this.backRectangle );

    this.middleRectangle = new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: dark4,
      rotation: rotation,
      scale: 20/21,
      x: -DIAMETER / 30,
      y: DIAMETER / 30
    } );
    container.addChild( this.middleRectangle );

    var gradientAngle = -Math.PI / 4;
    var gradientX = GRADIENT_OFFSET * Math.cos( gradientAngle - rotation );
    var gradientY = GRADIENT_OFFSET * Math.sin( gradientAngle - rotation );

    this.frontRectangle = new Rectangle( -RADIUS - gradientX, -RADIUS - gradientY, DIAMETER, DIAMETER, ROUND, ROUND, {
      scale: 10 / 11,
      x: gradientX,
      y: gradientY
    } );
    this.frontRectangle.rotateAround( new Vector2(), rotation );
    gradientProperty.linkAttribute( this.frontRectangle, 'fill' ); // TODO: better support for gradient properties
    container.addChild( this.frontRectangle );

    this.mutate( _.extend( {
      children: [ container ],
      rotation: -Math.PI / 2
    }, options ) );
  }

  proportionPlayground.register( 'SquareBeadNode', SquareBeadNode );

  return inherit( Node, SquareBeadNode, {
    setBeadRotation: function( rotation ) {
      this.backRectangle.rotation = rotation;
      this.middleRectangle.rotation = rotation;
      this.frontRectangle.prependMatrix( scratchMatrix3.setToRotationZ( rotation - this.frontRectangle.getRotation() ) );
    }
  } );
} );
