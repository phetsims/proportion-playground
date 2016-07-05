// Copyright 2016, University of Colorado Boulder

/**
 * Shows a single Billiards table, with a moving ball and holes in the top left, top right and bottom right corners.
 *
 * @author Sam Reid (PhET Interactive Simulations)
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
  var scale = 18; // from model units to pixels
  var whiteStrokeOptions = { stroke: 'white' };
  var movingLineOptions = { stroke: 'white', lineWidth: 2 };
  var ballDiameter = 10;
  var draggerOptions = {
    fill: 'rgba(255,255,103,0.5)',
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
    var currentLineNode = new Line( 0, 0, 0, 0, movingLineOptions );

    // draw rectangles to help me see the coordinates, will remove
    var centerRectangle = new Rectangle( center.x, center.y, 5, 5, { fill: 'red' } );
    var zeroRectangle = new Rectangle( 0, 0, 5, 5, { fill: 'blue' } );
    var startMouseRectangle = new Rectangle( 0, 0, 100, 5, { fill: 'black' } );
    var mouseRectangle = new Rectangle( 0, 0, 5, 20, { fill: 'orange' } );

    var helpLayer = new Node( {
      children: [
        centerRectangle,
        zeroRectangle,
        startMouseRectangle,
        mouseRectangle
      ]
    } );

    // Model the edge outside of the green area (not as a stroke) since there is no way to do "outer" stroke
    var brownRectangle = new Rectangle( 0, 0, 0, 0, { fill: ProportionPlaygroundConstants.billiardsBrown } );
    var greenRectangle = new Rectangle( 0, 0, 0, 0, {
      fill: ProportionPlaygroundConstants.billiardsGreen
    } );

    // nodes used to drag the sides of the table
    var leftDragger = new Rectangle( 0, 0, 0, 0, draggerOptions );
    var rightDragger = new Rectangle( 0, 0, 0, 0, draggerOptions );
    var topDragger = new Rectangle( 0, 0, 0, 0, draggerOptions );
    var bottomDragger = new Rectangle( 0, 0, 0, 0, draggerOptions );

    // separate layer for draggers
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
    var ballNode = new ShadedSphereNode( ballDiameter, { mainColor: 'white', highlightColor: 'yellow' } );

    // Create the holes for top-left, top-right and bottom-right
    var createCircle = function() {
      return new Circle( ballDiameter / 2, { fill: 'black' } );
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
          previousPoint.x * scale, previousPoint.y * scale,
          currentPoint.x * scale, currentPoint.y * scale,
          movingLineOptions
        ) );
      }
    } );

    // When the ball moves, update the live (unbounced) line streaming from the ball and update the ball's location
    billiardsTableModel.ball.positionProperty.link( function( position ) {
      var a = billiardsTableModel.collisionPoints.getArray();
      var previousPoint = a[ a.length - 1 ];
      if ( previousPoint ) {
        currentLineNode.setLine( previousPoint.x * scale, previousPoint.y * scale, position.x * scale, position.y * scale );
      }

      ballNode.center = position.times( scale ).plus( greenRectangle.translation );
    } );

    var startX; // where the drag started
    var startWidth; // the table width when drag started
    var mouseX; // where the mouse is right now

    // When the dragger is dragged, change the width
    rightDragger.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,

      // note where drag started
      start: function( event ) {

        // Convert to parent coordinates for dragging billiard table node, so the mouse stays at the right relative position, see #26
        var parentPoint = billiardsTableNode.globalToParentPoint( event.pointer.point );
        startX = parentPoint.x;
        startWidth = billiardsTableModel.width;
        mouseX = startX;

        helpLayer.removeChild( startMouseRectangle );
        startMouseRectangle = new Rectangle( startX, event.pointer.point.y, 100, 5, { fill: 'black' } );
        helpLayer.addChild( startMouseRectangle );

        helpLayer.removeChild( mouseRectangle );
        mouseRectangle = new Rectangle( mouseX, event.pointer.point.y, 5, 20, { fill: 'orange' } );
        helpLayer.addChild( mouseRectangle );
      },

      drag: function( event ) {

        // would want something like this, if mouse drag could match with view
        // var matchedMouseX = undefined; // figure this out
        // var newWidth = Util.roundSymmetric( ( matchedMouseX - center.x ) * 2 / scale );
        // and then use newWidth instead of startWidth + widthChange below

        // Convert to parent coordinates for dragging billiard table node, so the mouse stays at the right relative position, see #26
        var parentPoint = billiardsTableNode.globalToParentPoint( event.pointer.point );

        mouseX = parentPoint.x;
        var widthChange = Util.roundSymmetric( ( mouseX - startX ) * 2 / scale );

        // change the width, making sure its within the acceptable range
        billiardsTableModel.width = Util.clamp(
          startWidth + widthChange,
          billiardsTableModel.range.min,
          billiardsTableModel.range.max
        );

        helpLayer.removeChild( mouseRectangle );
        mouseRectangle = new Rectangle( mouseX, event.pointer.point.y, 5, 20, { fill: 'orange' } );
        helpLayer.addChild( mouseRectangle );
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
      var scaledWidth = width * scale;
      var scaledHeight = length * scale;
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
          gridLines.push( new Line( i * scale, 0, i * scale, scaledHeight, whiteStrokeOptions ) );
        }

        // horizontal lines
        for ( var k = 0; k <= length; k++ ) {
          gridLines.push( new Line( 0, k * scale, scaledWidth, k * scale, whiteStrokeOptions ) );
        }
        return gridLines;
      };

      // grid lines
      gridLinesNode.children = createGridLines();

      // set the mouse and touch areas
      // var hitBound = 2;
      // rightDragger.mouseArea = rightDragger.bounds.dilated( hitBound );
      // rightDragger.touchArea = rightDragger.mouseArea;

      // center the rectangles
      greenRectangle.center = center;
      brownRectangle.center = greenRectangle.center;
      leftDragger.center = greenRectangle.center.plusXY( -( scaledWidth / 2 + lineWidthAmount / 4 ), 0 );
      rightDragger.center = greenRectangle.center.plusXY( scaledWidth / 2 + lineWidthAmount / 4, 0 );
      topDragger.center = greenRectangle.center.plusXY( 0, -( scaledHeight / 2 + lineWidthAmount / 4 ) );
      bottomDragger.center = greenRectangle.center.plusXY( 0, scaledHeight / 2 + lineWidthAmount / 4 );

      // Position the lines layer
      lineLayer.translation = greenRectangle.translation;

      // Position the holes.
      bottomRightHoleNode.translation = greenRectangle.translation.plusXY( width * scale, length * scale );
      topLeftHoleNode.translation = greenRectangle.translation.plusXY( 0, 0 );
      topRightHoleNode.translation = greenRectangle.translation.plusXY( width * scale, 0 );
    } );

    Node.call( this, {
      children: [
        brownRectangle,
        greenRectangle,
        draggersLayer,
        lineLayer,
        topLeftHoleNode,
        topRightHoleNode,
        bottomRightHoleNode,
        ballNode,
        helpLayer
      ]
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

  return inherit( Node, BilliardsTableNode );
} );

