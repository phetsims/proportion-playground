// Copyright 2016-2017, University of Colorado Boulder

/**
 * Shows a single round bead.  Used in the necklace as well as in the NumberPicker icons.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const Node = require( 'SCENERY/nodes/Node' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  const RadialGradient = require( 'SCENERY/util/RadialGradient' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  var DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;
  var RADIUS = DIAMETER / 2;
  var GRADIENT_OFFSET = RADIUS * 0.6;
  var ROUND = RADIUS / 5;
  var colorProperty = ProportionPlaygroundColorProfile.necklaceSquareBeadProperty;

  var dark7Property = ProportionPlaygroundColorProfile.adjustedNecklaceSquareBeadProperty( -0.7 );
  var dark4Property = ProportionPlaygroundColorProfile.adjustedNecklaceSquareBeadProperty( -0.4 );

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

    // @private {Rectangle}
    this.backRectangle = new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: dark7Property,
      x: -DIAMETER / 15,
      y: DIAMETER / 15
    } );
    this.container.addChild( this.backRectangle );

    // @private {Rectangle}
    this.middleRectangle = new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: dark4Property,
      scale: 20 / 21,
      x: -DIAMETER / 30,
      y: DIAMETER / 30
    } );
    this.container.addChild( this.middleRectangle );

    // @private {Rectangle}
    this.frontRectangle = new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      scale: 10 / 11
    } );
    gradientProperty.linkAttribute( this.frontRectangle, 'fill' );
    this.container.addChild( this.frontRectangle );

    this.setBeadRotation( rotation );

    this.mutate( _.extend( {
      children: [ this.container ],
      rotation: -Math.PI / 2
    }, options ) );
  }

  proportionPlayground.register( 'SquareBeadNode', SquareBeadNode );

  return inherit( Node, SquareBeadNode, {
    /**
     * Changes the desired visual rotation. Due to lighting/shadowing effects, we can't just rotate the node.
     * @public
     *
     * @param {number} rotation - In radians
     */
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
