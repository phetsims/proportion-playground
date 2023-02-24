// Copyright 2016-2023, University of Colorado Boulder

/**
 * A balloon filled with paint.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import dotRandom from '../../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { Image, Node } from '../../../../../scenery/js/imports.js';
import blackBalloon1_png from '../../../../mipmaps/blackBalloon1_png.js';
import blackBalloon2_png from '../../../../mipmaps/blackBalloon2_png.js';
import blackBalloon3_png from '../../../../mipmaps/blackBalloon3_png.js';
import blueBalloon1_png from '../../../../mipmaps/blueBalloon1_png.js';
import blueBalloon2_png from '../../../../mipmaps/blueBalloon2_png.js';
import blueBalloon3_png from '../../../../mipmaps/blueBalloon3_png.js';
import redBalloon1_png from '../../../../mipmaps/redBalloon1_png.js';
import redBalloon2_png from '../../../../mipmaps/redBalloon2_png.js';
import redBalloon3_png from '../../../../mipmaps/redBalloon3_png.js';
import whiteBalloon1_png from '../../../../mipmaps/whiteBalloon1_png.js';
import whiteBalloon2_png from '../../../../mipmaps/whiteBalloon2_png.js';
import whiteBalloon3_png from '../../../../mipmaps/whiteBalloon3_png.js';
import yellowBalloon1_png from '../../../../mipmaps/yellowBalloon1_png.js';
import yellowBalloon2_png from '../../../../mipmaps/yellowBalloon2_png.js';
import yellowBalloon3_png from '../../../../mipmaps/yellowBalloon3_png.js';
import proportionPlayground from '../../../proportionPlayground.js';
import PaintChoice from '../../model/paint/PaintChoice.js';
import SplotchNode from './SplotchNode.js';

// Balloon images (color and orientation)

// Persistent {Vector2} instances, so that we don't churn GC as much
const scratchStartVector = new Vector2( 0, 0 );
const scratchEndVector = new Vector2( 0, 0 );
const scratchPosition = new Vector2( 0, 0 );

// {number}
const SPLOTCH_AREA = SplotchNode.getSingleSplotchArea();
const BALLOON_RADIUS = Math.sqrt( SPLOTCH_AREA / Math.PI ); // A = pi * r^2, r = sqrt( A / pi )
const BALLON_IMAGE_SCALE = 2 * BALLOON_RADIUS / 130; // Assuming the balloons in the images have a diameter of 130px

// After construction, will map color.paintId => phet.scenery.Image, which will be scaled and centered around the origin.
const balloonImageMap = {};
balloonImageMap[ PaintChoice.BLACK.paintId ] = [ blackBalloon1_png, blackBalloon2_png, blackBalloon3_png ];
balloonImageMap[ PaintChoice.BLUE.paintId ] = [ blueBalloon1_png, blueBalloon2_png, blueBalloon3_png ];
balloonImageMap[ PaintChoice.RED.paintId ] = [ redBalloon1_png, redBalloon2_png, redBalloon3_png ];
balloonImageMap[ PaintChoice.WHITE.paintId ] = [ whiteBalloon1_png, whiteBalloon2_png, whiteBalloon3_png ];
balloonImageMap[ PaintChoice.YELLOW.paintId ] = [ yellowBalloon1_png, yellowBalloon2_png, yellowBalloon3_png ];
_.each( PaintChoice.COLORS, paintColor => {
  balloonImageMap[ paintColor.paintId ] = balloonImageMap[ paintColor.paintId ].map( imageElement => new Image( imageElement, {
    centerX: 0,
    centerY: 0,
    scale: BALLON_IMAGE_SCALE
  } ) );
} );

// {number} Controls how the balloons rotate (from +halfRotation to -halfRotation or the opposite)
const HALF_ROTATION = Math.PI / 8;

class PaintBalloonNode extends Node {
  /**
   * @param {PaintBalloon} paintBalloon - Our paint balloon
   * @param {Property.<PaintChoice>} paintChoiceProperty - The current paint choice
   * @param {Vector2} startOffset - Offset from the typical starting position
   * @param {Vector2} endOffset - Offset from the typical ending position
   */
  constructor( paintBalloon, paintChoiceProperty, startOffset, endOffset ) {
    super();

    // @public {PaintBalloon}
    this.paintBalloon = paintBalloon;

    // @private
    this.paintChoiceProperty = paintChoiceProperty;
    this.startOffset = startOffset;
    this.endOffset = endOffset;

    // @private {boolean} - Which direction should this balloon rotate?
    this.rotationDirection = dotRandom.nextBoolean() ? -1 : 1;

    // @private - Stored for disposal
    this.colorChoiceListener = this.updateBalloonColor.bind( this );
    this.paintChoiceProperty.link( this.colorChoiceListener );
  }

  /**
   * Positions the balloon given its start (off the screen) and end (center of splotch), with a gravity-like arc
   * @public
   *
   * @param {Vector2} startPosition
   * @param {Vector2} endPosition
   */
  position( startPosition, endPosition ) {
    const ratio = this.paintBalloon.getRatioToEnd();

    // rotate from -half to half, possibly reversed
    this.rotation = this.rotationDirection * ( -HALF_ROTATION + ratio * 2 * HALF_ROTATION );

    // random offsets to the start/end for realism
    startPosition = scratchStartVector.set( startPosition ).add( this.startOffset );
    endPosition = scratchEndVector.set( endPosition ).add( this.endOffset );

    // pseudo gravity-like acceleration
    const baseX = startPosition.x + Math.pow( ratio, 0.8 ) * ( endPosition.x - startPosition.x );
    const baseY = startPosition.y + ratio * ( endPosition.y - startPosition.y );
    const elevationY = ratio - ratio * ratio;
    scratchPosition.setXY( baseX, baseY + -600 * elevationY );

    this.center = scratchPosition;

    // fake "make the balloon look farther away", from 1/4 distance to full distance
    const distanceRatio = 0.25 + 0.75 * ratio;
    this.setScaleMagnitude( 1 / distanceRatio );
  }

  /**
   * Updates the balloon's color based on the paintChoice
   * @private
   *
   * @param {PaintChoice} paintChoice
   */
  updateBalloonColor( paintChoice ) {
    const colorProperty = paintChoice.getColorProperty( this.paintBalloon.side );
    this.children = [ balloonImageMap[ colorProperty.paintId ][ this.paintBalloon.balloonType ] ];
  }

  /**
   * Releases references.
   * @public
   * @override
   */
  dispose() {
    this.paintChoiceProperty.unlink( this.colorChoiceListener );
    super.dispose();
  }
}

proportionPlayground.register( 'PaintBalloonNode', PaintBalloonNode );

export default PaintBalloonNode;
