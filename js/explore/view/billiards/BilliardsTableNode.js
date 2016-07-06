// Copyright 2016, University of Colorado Boulder

/**
 * Shows a single Billiards table, with a moving ball and holes in the top left, top right and bottom right corners.
 * Includes nodes that let you drag the sides of the table to change the size
 * 
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Property = require( 'AXON/Property' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );

  // constants
  var SCALE = 18; // from model units to pixels
  var WHITE_STROKE_OPTIONS = { stroke: 'white' };
  var MOVING_LINE_OPTIONS = { stroke: 'white', lineWidth: 2 };
  var BALL_DIAMETER = 10;
  var DRAGGER_OPTIONS = {
    cursor: 'pointer',
    pickable: true
  };

  /**
   *
   * @param {Vector2} center - position (in layout bounds) where the table should be centered
   * @param {BilliardsTableModel} billiardsTableModel - the model
   * @param {Object} [options]
   * @constructor
   */
  function BilliardsTableNode( center, billiardsTableModel, options ) {

    var billiardsTableNode = this;

    var gridLinesNode = new Node();
    var linesNode = new Node();
    var currentLineNode = new Line( 0, 0, 0, 0, MOVING_LINE_OPTIONS );

    // Model the edge outside of the green area (not as a stroke) since there is no way to do "outer" stroke
    var brownRectangle = new Rectangle( 0, 0, 0, 0, { fill: ProportionPlaygroundConstants.BILLIARDS_BROWN } );
    var greenRectangle = new Rectangle( 0, 0, 0, 0, {
      fill: ProportionPlaygroundConstants.BILLIARDS_GREEN
    } );

    // invisible rectangles used to drag the sides of the table to change the dimensions
    var leftDragger = new Rectangle( 0, 0, 0, 0, DRAGGER_OPTIONS );
    var rightDragger = new Rectangle( 0, 0, 0, 0, DRAGGER_OPTIONS );
    var topDragger = new Rectangle( 0, 0, 0, 0, DRAGGER_OPTIONS );
    var bottomDragger = new Rectangle( 0, 0, 0, 0, DRAGGER_OPTIONS );

    // Layer containing draggers
    var draggersLayer = new Node( {
      children: [
        leftDragger,
        rightDragger,
        topDragger,
        bottomDragger
      ]
    } );

    // Layer containing the grid lines and ball lines.  When these were children of the greenRectangle, it caused #19
    // so they have been moved to a separate node
    var lineLayer = new Node( {
      children: [ gridLinesNode, linesNode, currentLineNode ]
    } );

    // The moving ball node
    var ballNode = new ShadedSphereNode( BALL_DIAMETER, { mainColor: 'white', highlightColor: 'yellow' } );

    // Create the holes for top-left, top-right and bottom-right
    var createCircle = function() {
      return new Circle( BALL_DIAMETER / 2, { fill: 'black' } );
    };
    var topLeftHoleNode = createCircle();
    var topRightHoleNode = createCircle();
    var bottomRightHoleNode = createCircle();

    // When the ball restarts, clear the history of lines
    billiardsTableModel.restartEmitter.addListener( function() {
      linesNode.children = [];
    } );

    // When the ball bounces, add a new line to the static array of lines.
    billiardsTableModel.collisionPoints.addItemAddedListener( function( currentPoint ) {
      var a = billiardsTableModel.collisionPoints.getArray();
      var previousPoint = a[ a.length - 2 ];
      if ( previousPoint ) {
        linesNode.addChild( new Line(
          previousPoint.x * SCALE, previousPoint.y * SCALE,
          currentPoint.x * SCALE, currentPoint.y * SCALE,
          MOVING_LINE_OPTIONS
        ) );
      }
    } );

    // When the ball moves, update the live (unbounced) line streaming from the ball and update the ball's location
    billiardsTableModel.ball.positionProperty.link( function( position ) {
      var a = billiardsTableModel.collisionPoints.getArray();
      var previousPoint = a[ a.length - 1 ];
      if ( previousPoint ) {
        currentLineNode.setLine( previousPoint.x * SCALE, previousPoint.y * SCALE, position.x * SCALE, position.y * SCALE );
      }

      ballNode.center = position.times( SCALE ).plus( greenRectangle.translation );
    } );

    // When the left dragger is dragged, change the width
    leftDragger.addInputListener( new SimpleDragHandler( {
        allowTouchSnag: true,

        drag: function( event ) {

          // Convert to parent coordinates for dragging billiard table node, so the mouse stays at the right relative position, see #26
          var parentPoint = leftDragger.globalToParentPoint( event.pointer.point );
          var newWidth = Util.roundSymmetric( ( center.x - parentPoint.x ) * 2 / SCALE );

          // change width so its within the acceptable range
          billiardsTableModel.width = Util.clamp(
            newWidth,
            billiardsTableModel.range.min,
            billiardsTableModel.range.max
          );
        }
      } )
    );

    // When the right dragger is dragged, change the width
    rightDragger.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,

      drag: function( event ) {
        // Convert to parent coordinates for dragging billiard table node, so the mouse stays at the right relative position, see #26
        var parentPoint = rightDragger.globalToParentPoint( event.pointer.point );
        var newWidth = Util.roundSymmetric( ( parentPoint.x - center.x ) * 2 / SCALE );

        // change width so its within the acceptable range
        billiardsTableModel.width = Util.clamp(
          newWidth,
          billiardsTableModel.range.min,
          billiardsTableModel.range.max
        );
      }
    } ) );

    // When the top dragger is dragged, change the length
    topDragger.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,

      drag: function( event ) {
        // Convert to parent coordinates for dragging billiard table node, so the mouse stays at the right relative position, see #26
        var parentPoint = topDragger.globalToParentPoint( event.pointer.point );
        var newLength = Util.roundSymmetric( ( center.y - parentPoint.y ) * 2 / SCALE );

        // change length so its within the acceptable range
        billiardsTableModel.length = Util.clamp(
          newLength,
          billiardsTableModel.range.min,
          billiardsTableModel.range.max
        );
      }
    } ) );

    // When the bottom dragger is dragged, change the length
    bottomDragger.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,

      drag: function( event ) {
        // Convert to parent coordinates for dragging billiard table node, so the mouse stays at the right relative position, see #26
        var parentPoint = bottomDragger.globalToParentPoint( event.pointer.point );
        var newLength = Util.roundSymmetric( ( parentPoint.y - center.y ) * 2 / SCALE );

        // change length so its within the acceptable range
        billiardsTableModel.length = Util.clamp(
          newLength,
          billiardsTableModel.range.min,
          billiardsTableModel.range.max
        );
      }
    } ) );

    // When the table is resized, redraw it.
    Property.multilink( [
      billiardsTableModel.lengthProperty,
      billiardsTableModel.widthProperty
    ], function() {
      var length = billiardsTableModel.length;
      var width = billiardsTableModel.width;

      var brownEdgeLineWidth = 8;
      var scaledWidth = width * SCALE;
      var scaledHeight = length * SCALE;
      var lineWidthAmount = brownEdgeLineWidth * 2;

      brownRectangle.setRect( 0, 0, scaledWidth + lineWidthAmount, scaledHeight + lineWidthAmount );
      greenRectangle.setRect( 0, 0, scaledWidth, scaledHeight );

      leftDragger.setRect( 0, 0, lineWidthAmount / 2, scaledHeight );
      rightDragger.setRect( 0, 0, lineWidthAmount / 2, scaledHeight );
      topDragger.setRect( 0, 0, scaledWidth, lineWidthAmount / 2 );
      bottomDragger.setRect( 0, 0, scaledWidth, lineWidthAmount / 2 );

      var createGridLines = function() {
        var gridLines = [];

        // vertical lines
        for ( var i = 0; i <= width; i++ ) {
          gridLines.push( new Line( i * SCALE, 0, i * SCALE, scaledHeight, WHITE_STROKE_OPTIONS ) );
        }

        // horizontal lines
        for ( var k = 0; k <= length; k++ ) {
          gridLines.push( new Line( 0, k * SCALE, scaledWidth, k * SCALE, WHITE_STROKE_OPTIONS ) );
        }
        return gridLines;
      };

      // grid lines
      gridLinesNode.children = createGridLines();

      // center the rectangles
      greenRectangle.center = center;
      brownRectangle.center = greenRectangle.center;

      // center the draggers
      leftDragger.center = greenRectangle.center.plusXY( -( scaledWidth / 2 + lineWidthAmount / 4 ), 0 );
      rightDragger.center = greenRectangle.center.plusXY( scaledWidth / 2 + lineWidthAmount / 4, 0 );
      topDragger.center = greenRectangle.center.plusXY( 0, -( scaledHeight / 2 + lineWidthAmount / 4 ) );
      bottomDragger.center = greenRectangle.center.plusXY( 0, scaledHeight / 2 + lineWidthAmount / 4 );

      // Position the lines layer
      lineLayer.translation = greenRectangle.translation;

      // Position the holes.
      bottomRightHoleNode.translation = greenRectangle.translation.plusXY( width * SCALE, length * SCALE );
      topLeftHoleNode.translation = greenRectangle.translation.plusXY( 0, 0 );
      topRightHoleNode.translation = greenRectangle.translation.plusXY( width * SCALE, 0 );
    } );

    Node.call( billiardsTableNode, {
      children: [
        brownRectangle,
        greenRectangle,
        draggersLayer,
        lineLayer,
        topLeftHoleNode,
        topRightHoleNode,
        bottomRightHoleNode,
        ballNode
      ]
    } );
    billiardsTableNode.mutate( options );
  }

  proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

  return inherit( Node, BilliardsTableNode );
} );

