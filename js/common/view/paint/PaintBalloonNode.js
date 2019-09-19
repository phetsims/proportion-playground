// Copyright 2016-2019, University of Colorado Boulder

/**
 * A balloon filled with paint.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  const Vector2 = require( 'DOT/Vector2' );

  // Balloon images (color and orientation)
  const blackBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/black-balloon-1.png' );
  const blackBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/black-balloon-2.png' );
  const blackBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/black-balloon-3.png' );
  const blueBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/blue-balloon-1.png' );
  const blueBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/blue-balloon-2.png' );
  const blueBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/blue-balloon-3.png' );
  const redBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/red-balloon-1.png' );
  const redBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/red-balloon-2.png' );
  const redBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/red-balloon-3.png' );
  const whiteBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/white-balloon-1.png' );
  const whiteBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/white-balloon-2.png' );
  const whiteBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/white-balloon-3.png' );
  const yellowBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/yellow-balloon-1.png' );
  const yellowBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/yellow-balloon-2.png' );
  const yellowBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/yellow-balloon-3.png' );

  // Persistent {Vector2} instances, so that we don't churn GC as much
  const scratchStartVector = new Vector2( 0, 0 );
  const scratchEndVector = new Vector2( 0, 0 );
  const scratchPosition = new Vector2( 0, 0 );

  // {number}
  const SPLOTCH_AREA = SplotchNode.getSingleSplotchArea();
  const BALLOON_RADIUS = Math.sqrt( SPLOTCH_AREA / Math.PI ); // A = pi * r^2, r = sqrt( A / pi )
  const BALLON_IMAGE_SCALE = 2 * BALLOON_RADIUS / 130; // Assuming the balloons in the images have a diameter of 130px

  // After construction, will map color.paintId => scenery.Image, which will be scaled and centered around the origin.
  const balloonImageMap = {};
  balloonImageMap[ PaintChoice.BLACK.paintId ] = [ blackBalloon1Image, blackBalloon2Image, blackBalloon3Image ];
  balloonImageMap[ PaintChoice.BLUE.paintId ] = [ blueBalloon1Image, blueBalloon2Image, blueBalloon3Image ];
  balloonImageMap[ PaintChoice.RED.paintId ] = [ redBalloon1Image, redBalloon2Image, redBalloon3Image ];
  balloonImageMap[ PaintChoice.WHITE.paintId ] = [ whiteBalloon1Image, whiteBalloon2Image, whiteBalloon3Image ];
  balloonImageMap[ PaintChoice.YELLOW.paintId ] = [ yellowBalloon1Image, yellowBalloon2Image, yellowBalloon3Image ];
  _.each( PaintChoice.COLORS, function( paintColor ) {
    balloonImageMap[ paintColor.paintId ] = balloonImageMap[ paintColor.paintId ].map( function( imageElement ) {
      return new Image( imageElement, {
        centerX: 0,
        centerY: 0,
        scale: BALLON_IMAGE_SCALE
      } );
    } );
  } );

  // {number} Controls how the balloons rotate (from +halfRotation to -halfRotation or the opposite)
  const HALF_ROTATION = Math.PI / 8;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {PaintBalloon} paintBalloon - Our paint balloon
   * @param {Property.<PaintChoice>} paintChoiceProperty - The current paint choice
   * @param {Vector2} startOffset - Offset from the typical starting location
   * @param {Vector2} endOffset - Offset from the typical ending location
   */
  function PaintBalloonNode( paintBalloon, paintChoiceProperty, startOffset, endOffset ) {
    Node.call( this );

    // @public {PaintBalloon}
    this.paintBalloon = paintBalloon;

    // @private
    this.paintChoiceProperty = paintChoiceProperty;
    this.startOffset = startOffset;
    this.endOffset = endOffset;

    // @private {boolean} - Which direction should this balloon rotate?
    this.rotationDirection = phet.joist.random.nextBoolean() ? -1 : 1;

    // @private - Stored for disposal
    this.colorChoiceListener = this.updateBalloonColor.bind( this );
    this.paintChoiceProperty.link( this.colorChoiceListener );
  }

  proportionPlayground.register( 'PaintBalloonNode', PaintBalloonNode );

  return inherit( Node, PaintBalloonNode, {
    /**
     * Positions the balloon given its start (off the screen) and end (center of splotch), with a gravity-like arc
     * @public
     *
     * @param {Vector2} startPosition
     * @param {Vector2} endPosition
     */
    position: function( startPosition, endPosition ) {
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
    },

    /**
     * Updates the balloon's color based on the paintChoice
     * @private
     *
     * @param {PaintChoice} paintChoice
     */
    updateBalloonColor: function( paintChoice ) {
      const colorProperty = paintChoice.getColorProperty( this.paintBalloon.side );
      this.children = [ balloonImageMap[ colorProperty.paintId ][ this.paintBalloon.balloonType ] ];
    },

    /**
     * Releases references.
     * @public
     * @override
     */
    dispose: function() {
      this.paintChoiceProperty.unlink( this.colorChoiceListener );
      Node.prototype.dispose.call( this );
    }
  } );
} );
