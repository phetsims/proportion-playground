// Copyright 2016, University of Colorado Boulder

/**
 * Shows a single Billiards table, draggable by its sides, with a moving ball and holes in the
 * top left, top right and bottom right corners.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );
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
   * @constructor
   *
   * @param {Vector2} center - position (in layout bounds) where the table should be centered
   * @param {BilliardsTable} billiardsTable - the model
   * @param {Object} [options]
   */
  function BilliardsTableNode( center, billiardsTable, options ) {
    SceneRatioNode.call( this, billiardsTable );

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
    billiardsTable.restartEmitter.addListener( function() {
      linesNode.children = [];
    } );

    // When the ball bounces, add a new line to the static array of lines.
    billiardsTable.collisionPoints.addItemAddedListener( function( currentPoint ) {
      var a = billiardsTable.collisionPoints.getArray();
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
    billiardsTable.ballPositionProperty.link( function( position ) {
      var a = billiardsTable.collisionPoints.getArray();
      var previousPoint = a[ a.length - 1 ];
      if ( previousPoint ) {
        currentLineNode.setLine( previousPoint.x * SCALE, previousPoint.y * SCALE, position.x * SCALE, position.y * SCALE );
      }

      ballNode.center = position.times( SCALE ).plus( greenRectangle.translation );
    } );

    /**
     * Auxiliary function that adds a drag handler as an input listener for a given side of the rectangle
     * @param {Rectangle} dragger - the dragger node on the side of a table
     * @param {Property.<number>} property - the width or length property of the table
     * @param {string} xOrY - the axis, x or y, to use. Corresponds with width or length, respectively.
     * @param {number} changeSign - -1 or 1, designates whether its the left or right, top or bottom dragger
     * @returns NumberPicker
     */
    var createDragListener = function( dragger, property, xOrY, changeSign ) {

      var startPoint; // track where the mouse drag starts
      var startProperty; // track the beginning width
      var mousePoint; // where the mouse is currently

      dragger.addInputListener( new SimpleDragHandler( {
        start: function( event ) {
          startPoint = dragger.globalToParentPoint( event.pointer.point );
          startProperty = property.value;
        },

        drag: function( event ) {
          // Convert to parent coordinates for dragging billiard table node, so the mouse stays at the right relative position, see #26
          mousePoint = leftDragger.globalToParentPoint( event.pointer.point );
          var change = Util.roundSymmetric( changeSign * ( mousePoint[ xOrY ] - startPoint[ xOrY ] ) * 2 / SCALE );

          // change width so its within the acceptable range
          property.value = Util.clamp(
            startProperty + change,
            billiardsTable.range.min,
            billiardsTable.range.max
          );
        }

      } ) );
    };

    // When a side of the table is dragged, the appropriate width or length changes.
    createDragListener( leftDragger, billiardsTable.widthProperty, 'x', -1 );
    createDragListener( rightDragger, billiardsTable.widthProperty, 'x', 1 );
    createDragListener( topDragger, billiardsTable.heightProperty, 'y', -1 );
    createDragListener( bottomDragger, billiardsTable.heightProperty, 'y', 1 );

    // When the table is resized, redraw it.
    Property.multilink( [
      billiardsTable.heightProperty,
      billiardsTable.widthProperty
    ], function() {
      var length = billiardsTable.heightProperty.value;
      var width = billiardsTable.widthProperty.value;

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

    this.mutate( _.extend( {
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
    }, options ) );
  }

  proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

  return inherit( SceneRatioNode, BilliardsTableNode );
} );
