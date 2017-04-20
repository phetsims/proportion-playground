// Copyright 2016, University of Colorado Boulder

/**
 * Shows a single round bead.  Used in the necklace as well as in the NumberPicker icons.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;
  var RADIUS = DIAMETER / 2;
  var GRADIENT_OFFSET = RADIUS * 0.6;
  var ROUND = RADIUS / 5;
  var colorProperty = ProportionPlaygroundColorProfile.necklaceSquareBeadProperty;

  var dark7 = ProportionPlaygroundColorProfile.adjustedNecklaceSquareBeadProperty( -0.7 );
  var dark4 = ProportionPlaygroundColorProfile.adjustedNecklaceSquareBeadProperty( -0.4 );
  var gradientProperty = new DerivedProperty( [ colorProperty ], function( color ) {
    return new RadialGradient( 0, 0, 0, 0, 0, DIAMETER + GRADIENT_OFFSET )
      .addColorStop( 0, color.colorUtilsBrighter( 0.3 ) )
      .addColorStop( 0.3, color )
      .addColorStop( 0.5, color.colorUtilsDarker( 0.1 ) )
      .addColorStop( 0.8, color.colorUtilsDarker( 0.3 ) );
  } );

  var scratchMatrix3 = new Matrix3();

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {number} rotation - How the generated node should be rotated
   * @param {Object} [options] - node options
   */
  function SquareBeadNode( rotation, options ) {
    Node.call( this );

    // @private {Node} - Contains all of our content, so we can properly center ourselves when needed
    this.container = new Node( {
      scale: 0.95
    } );

    this.backRectangle = new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: dark7,
      x: -DIAMETER / 15,
      y: DIAMETER / 15
    } );
    this.container.addChild( this.backRectangle );

    this.middleRectangle = new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: dark4,
      scale: 20/21,
      x: -DIAMETER / 30,
      y: DIAMETER / 30
    } );
    this.container.addChild( this.middleRectangle );

    this.frontRectangle = new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      scale: 10 / 11
    } );
    gradientProperty.linkAttribute( this.frontRectangle, 'fill' ); // TODO: better support for gradient properties
    this.container.addChild( this.frontRectangle );

    this.setBeadRotation( rotation );

    this.mutate( _.extend( {
      children: [ this.container ],
      rotation: -Math.PI / 2
    }, options ) );
  }

  proportionPlayground.register( 'SquareBeadNode', SquareBeadNode );

  return inherit( Node, SquareBeadNode, {
    // TODO: docs
    setBeadRotation: function( rotation ) {

      var gradientAngle = -Math.PI / 4;
      var gradientX = GRADIENT_OFFSET * Math.cos( gradientAngle - rotation );
      var gradientY = GRADIENT_OFFSET * Math.sin( gradientAngle - rotation );

      this.backRectangle.rotation = rotation;
      this.middleRectangle.rotation = rotation;
      this.frontRectangle.setRect( -RADIUS - gradientX, -RADIUS - gradientY, DIAMETER, DIAMETER, ROUND, ROUND );

      this.frontRectangle.setMatrix( scratchMatrix3.setToRotationZ( rotation ) );
      this.frontRectangle.translate( gradientX, gradientY, false );
      this.frontRectangle.scale( 10 / 11 );

      this.container.center = Vector2.ZERO;
    }
  } );
} );
