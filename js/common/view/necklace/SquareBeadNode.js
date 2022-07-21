// Copyright 2016-2022, University of Colorado Boulder

/**
 * Shows a single round bead.  Used in the necklace as well as in the NumberPicker icons.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import Matrix3 from '../../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import merge from '../../../../../phet-core/js/merge.js';
import { Node, RadialGradient, Rectangle } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';

// constants
const DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;
const RADIUS = DIAMETER / 2;
const GRADIENT_OFFSET = RADIUS * 0.6;
const ROUND = RADIUS / 5;
const colorProperty = ProportionPlaygroundColors.necklaceSquareBeadProperty;

const dark7Property = ProportionPlaygroundColors.adjustedNecklaceSquareBeadProperty( -0.7 );
const dark4Property = ProportionPlaygroundColors.adjustedNecklaceSquareBeadProperty( -0.4 );

const gradientProperty = new DerivedProperty( [ colorProperty ], color => new RadialGradient( 0, 0, 0, 0, 0, DIAMETER + GRADIENT_OFFSET )
  .addColorStop( 0, color.colorUtilsBrighter( 0.3 ) )
  .addColorStop( 0.3, color )
  .addColorStop( 0.5, color.colorUtilsDarker( 0.1 ) )
  .addColorStop( 0.8, color.colorUtilsDarker( 0.3 ) ) );

const scratchMatrix3 = new Matrix3();

class SquareBeadNode extends Node {
  /**
   * @param {number} rotation - How the generated node should be rotated
   * @param {Object} [options] - node options
   */
  constructor( rotation, options ) {
    super();

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

    this.mutate( merge( {
      children: [ this.container ],
      rotation: -Math.PI / 2
    }, options ) );
  }

  /**
   * Changes the desired visual rotation. Due to lighting/shadowing effects, we can't just rotate the node.
   * @public
   *
   * @param {number} rotation - In radians
   */
  setBeadRotation( rotation ) {

    const gradientAngle = -Math.PI / 4;
    const gradientX = GRADIENT_OFFSET * Math.cos( gradientAngle - rotation );
    const gradientY = GRADIENT_OFFSET * Math.sin( gradientAngle - rotation );

    this.backRectangle.rotation = rotation;
    this.middleRectangle.rotation = rotation;
    this.frontRectangle.setRect( -RADIUS - gradientX, -RADIUS - gradientY, DIAMETER, DIAMETER, ROUND, ROUND );

    this.frontRectangle.setMatrix( scratchMatrix3.setToRotationZ( rotation ) );
    this.frontRectangle.translate( gradientX, gradientY, false );
    this.frontRectangle.scale( 10 / 11 );

    this.container.center = Vector2.ZERO;
  }
}

proportionPlayground.register( 'SquareBeadNode', SquareBeadNode );

export default SquareBeadNode;