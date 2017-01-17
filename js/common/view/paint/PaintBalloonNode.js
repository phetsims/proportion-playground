// Copyright 2014-2015, University of Colorado Boulder

/**
 * A balloon filled with paint.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );

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

  var scratchStartVector = new Vector2();
  var scratchEndVector = new Vector2();
  var scratchPosition = new Vector2();

  var SPLOTCH_AREA = SplotchNode.getSingleSplotchArea();
  // A = pi * r^2, r = sqrt( A / pi )
  var BALLOON_RADIUS = Math.sqrt( SPLOTCH_AREA / Math.PI );
  var BALLON_IMAGE_SCALE = 2 * BALLOON_RADIUS / 130; // Assuming the balloons in the images have a diameter of 130px

  // After construction, will map color.toCSS() => scenery.Image, which will be scaled and centered around the origin.
  var balloonImageMap = {};
  balloonImageMap[ PaintChoice.BLACK.toCSS() ] = [ blackBalloon1Image, blackBalloon2Image, blackBalloon3Image ];
  balloonImageMap[ PaintChoice.BLUE.toCSS() ] = [ blueBalloon1Image, blueBalloon2Image, blueBalloon3Image ];
  balloonImageMap[ PaintChoice.RED.toCSS() ] = [ redBalloon1Image, redBalloon2Image, redBalloon3Image ];
  balloonImageMap[ PaintChoice.WHITE.toCSS() ] = [ whiteBalloon1Image, whiteBalloon2Image, whiteBalloon3Image ];
  balloonImageMap[ PaintChoice.YELLOW.toCSS() ] = [ yellowBalloon1Image, yellowBalloon2Image, yellowBalloon3Image ];
  var cssColors = [ PaintChoice.BLACK.toCSS(), PaintChoice.BLUE.toCSS(), PaintChoice.RED.toCSS(), PaintChoice.WHITE.toCSS(), PaintChoice.YELLOW.toCSS() ];
  _.each( cssColors, function( cssColor ) {
    balloonImageMap[ cssColor ] = balloonImageMap[ cssColor ].map( function( imageElement ) {
      return new Image( imageElement, {
        centerX: 0,
        centerY: 0,
        scale: BALLON_IMAGE_SCALE
      } );
    } );
  } );

  // Controls how the balloons rotate
  var HALF_ROTATION = Math.PI / 8;

  /**
   * @constructor
   *
   * @param {PaintBalloon} paintBalloon - Our paint balloon
   * @param {Property.<PaintChoice>} paintChoiceProperty - The current paint choice
   * @param {Vector2} startOffset - Offset from the typical starting location
   * @param {Vector2} endOffset - Offset from the typical ending location
   */
  function PaintBalloonNode( paintBalloon, paintChoiceProperty, startOffset, endOffset ) {
    Node.call( this );

    // TODO: hopefully these are private?
    this.paintBalloon = paintBalloon;
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
     * TODO: doc
     * @public
     */
    position: function( startPosition, endPosition ) {
      var ratio = this.paintBalloon.getRatioToEnd();

      // rotate from -half to half, possibly reversed
      this.rotation = this.rotationDirection * ( -HALF_ROTATION + ratio * 2 * HALF_ROTATION );

      startPosition = scratchStartVector.set( startPosition ).add( this.startOffset );
      endPosition = scratchEndVector.set( endPosition ).add( this.endOffset );

      //TODO: doc
      var baseX = startPosition.x + Math.pow( ratio, 0.8 ) * ( endPosition.x - startPosition.x );
      var baseY = startPosition.y + ratio * ( endPosition.y - startPosition.y );
      var elevationY = ratio - ratio * ratio;
      scratchPosition.setXY( baseX,
                             baseY + -600 * elevationY );

      this.center = scratchPosition;

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
      var color = this.paintBalloon.isLeft ? paintChoice.leftColor : paintChoice.rightColor;
      this.children = [ balloonImageMap[ color.toCSS() ][ this.paintBalloon.balloonType ] ];
    },

    /**
     * Releases references.
     * @public
     */
    dispose: function() {
      this.paintChoiceProperty.unlink( this.colorChoiceListener );
    }
  } );
} );
