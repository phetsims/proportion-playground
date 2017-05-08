// Copyright 2016-2017, University of Colorado Boulder

/**
 * A balloon filled with paint.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var Vector2 = require( 'DOT/Vector2' );

  // Balloon images (color and orientation)
  var blackBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/black-balloon-1.png' );
  var blackBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/black-balloon-2.png' );
  var blackBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/black-balloon-3.png' );
  var blueBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/blue-balloon-1.png' );
  var blueBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/blue-balloon-2.png' );
  var blueBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/blue-balloon-3.png' );
  var redBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/red-balloon-1.png' );
  var redBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/red-balloon-2.png' );
  var redBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/red-balloon-3.png' );
  var whiteBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/white-balloon-1.png' );
  var whiteBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/white-balloon-2.png' );
  var whiteBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/white-balloon-3.png' );
  var yellowBalloon1Image = require( 'mipmap!PROPORTION_PLAYGROUND/yellow-balloon-1.png' );
  var yellowBalloon2Image = require( 'mipmap!PROPORTION_PLAYGROUND/yellow-balloon-2.png' );
  var yellowBalloon3Image = require( 'mipmap!PROPORTION_PLAYGROUND/yellow-balloon-3.png' );

  // Persistent {Vector2} instances, so that we don't churn GC as much
  var scratchStartVector = new Vector2();
  var scratchEndVector = new Vector2();
  var scratchPosition = new Vector2();

  // {number}
  var SPLOTCH_AREA = SplotchNode.getSingleSplotchArea();
  var BALLOON_RADIUS = Math.sqrt( SPLOTCH_AREA / Math.PI ); // A = pi * r^2, r = sqrt( A / pi )
  var BALLON_IMAGE_SCALE = 2 * BALLOON_RADIUS / 130; // Assuming the balloons in the images have a diameter of 130px

  // After construction, will map color.paintId => scenery.Image, which will be scaled and centered around the origin.
  var balloonImageMap = {};
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
  var HALF_ROTATION = Math.PI / 8;

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
      var ratio = this.paintBalloon.getRatioToEnd();

      // rotate from -half to half, possibly reversed
      this.rotation = this.rotationDirection * ( -HALF_ROTATION + ratio * 2 * HALF_ROTATION );

      // random offsets to the start/end for realism
      startPosition = scratchStartVector.set( startPosition ).add( this.startOffset );
      endPosition = scratchEndVector.set( endPosition ).add( this.endOffset );

      // pseudo gravity-like acceleration
      var baseX = startPosition.x + Math.pow( ratio, 0.8 ) * ( endPosition.x - startPosition.x );
      var baseY = startPosition.y + ratio * ( endPosition.y - startPosition.y );
      var elevationY = ratio - ratio * ratio;
      scratchPosition.setXY( baseX, baseY + -600 * elevationY );

      this.center = scratchPosition;

      // fake "make the balloon look farther away", from 1/4 distance to full distance
      var distanceRatio = 0.25 + 0.75 * ratio;
      this.setScaleMagnitude( 1 / distanceRatio );
    },

    /**
     * Updates the balloon's color based on the paintChoice
     * @private
     *
     * @param {PaintChoice} paintChoice
     */
    updateBalloonColor: function( paintChoice ) {
      var colorProperty = paintChoice.getColorProperty( this.paintBalloon.side );
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
