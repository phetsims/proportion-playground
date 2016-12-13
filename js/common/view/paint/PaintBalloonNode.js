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

  var scratchStartVector = new Vector2();
  var scratchEndVector = new Vector2();
  var scratchPosition = new Vector2();

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

    this.paintBalloon = paintBalloon;
    this.startOffset = startOffset;
    this.endOffset = endOffset;

    var body = new Circle( 20, {
      stroke: 'black'
    } );
    function updateBalloonColor( colorChoice ) {
      body.fill = paintBalloon.isLeft ? colorChoice.leftColor : colorChoice.rightColor;
    }
    paintChoiceProperty.link( updateBalloonColor );

    // @private
    this.disposeBalloonNode = function() {
      paintChoiceProperty.unlink( updateBalloonColor );
    };

    this.addChild( body );
  }

  proportionPlayground.register( 'PaintBalloonNode', PaintBalloonNode );

  return inherit( Node, PaintBalloonNode, {
    /**
     * TODO: doc
     * @public
     */
    position: function( startPosition, endPosition ) {
      startPosition = scratchStartVector.set( startPosition ).add( this.startOffset );
      endPosition = scratchEndVector.set( endPosition ).add( this.endOffset );

      // TODO: arc
      var ratio = this.paintBalloon.getRatioToEnd();
      scratchPosition.setXY( startPosition.x + ratio * ( endPosition.x - startPosition.x ),
                             startPosition.y + ratio * ( endPosition.y - startPosition.y ) );

      this.center = scratchPosition;
    },

    /**
     * Releases references.
     * @public
     */
    dispose: function() {
      this.disposeBalloonNode();
    }
  } );
} );
