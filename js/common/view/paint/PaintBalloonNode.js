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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );

  var scratchStartVector = new Vector2();
  var scratchEndVector = new Vector2();
  var scratchPosition = new Vector2();

  var SPLOTCH_AREA = SplotchNode.getSingleSplotchArea();
  // A = pi * r^2, r = sqrt( A / pi )
  var BALLOON_RADIUS = Math.sqrt( SPLOTCH_AREA / Math.PI );

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

    // @private
    this.circle = new Circle( BALLOON_RADIUS, {
      stroke: 'black'
    } );
    this.addChild( this.circle );

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
      this.circle.fill = this.paintBalloon.isLeft ? paintChoice.leftColor : paintChoice.rightColor;
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
