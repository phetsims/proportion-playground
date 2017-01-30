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
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var BilliardsTable = require( 'PROPORTION_PLAYGROUND/common/model/billiards/BilliardsTable' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );
  var Util = require( 'DOT/Util' );

  // constants
  var SCALE = 18; // from model units to view units   TODO: why don't we scale up after? Seems simpler
  var MOVING_LINE_OPTIONS = { stroke: 'white', lineWidth: 2 };
  var BALL_DIAMETER = 10;
  var DRAGGER_OPTIONS = {
    cursor: 'pointer',
    pickable: true
  };

  var GRID_LINE_WIDTH = 0.5;

  /**
   * @constructor
   *
   * @param {BilliardsTable} billiardsTable - the model
   * @param {Object} [options] - See options below. Also passed to Node's mutate.
   */
  function BilliardsTableNode( billiardsTable, options ) {
    SceneRatioNode.call( this, billiardsTable );

    options = _.extend( {
      // {boolean} - Whether this node should always take up the bounds for a full-size (20x20) billiards table.
      fullSizeBounds: true,

      // {boolean} - Whether to allow dragging the borders of the table to resize it. If true, it will show some
      //             "grippy dots" to indicate it is draggable.
      allowDragToResize: true
    }, options );

    var self = this;

    var linesNode = new Node();
    var currentLineNode = new Line( 0, 0, 0, 0, MOVING_LINE_OPTIONS );

    // Model the edge outside of the green area (not as a stroke) since there is no way to do "outer" stroke
    var blackRectangle = new Rectangle( 0, 0, 0, 0, { fill: ProportionPlaygroundConstants.BILLIARDS_BROWN } );
    var greenRectangle = new Rectangle( 0, 0, 0, 0, {
      fill: ProportionPlaygroundConstants.BILLIARDS_GREEN
    } );

    var dragHandle = new HBox( {
      spacing: 1.3,
      children: [ 0, 1, 2 ].map( function() {
        return new Circle( 1.2, {
          fill: 'rgb(102,102,102)'
        } );
      } )
    } );

    var leftDragHandle = new Node( { children: [ dragHandle ], rotation: Math.PI / 2 } );
    var rightDragHandle = new Node( { children: [ dragHandle ], rotation: Math.PI / 2 } );
    var topDragHandle = new Node( { children: [ dragHandle ] } );
    var bottomDragHandle = new Node( { children: [ dragHandle ] } );

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

    var gridLinesNode = this.createGridLinesNode();

    // Layer containing the grid lines and ball lines.  When these were children of the greenRectangle, it caused #19
    // so they have been moved to a separate node
    var lineLayer = new Node( {
      children: [
        gridLinesNode,
        linesNode,
        currentLineNode
      ]
    } );

    // The moving ball node
    var ballNode = new ShadedSphereNode( BALL_DIAMETER, { mainColor: 'white', highlightColor: 'yellow' } );

    // Create the holes for top-left, top-right and bottom-right
    var createCircle = function() {
      return new Circle( BALL_DIAMETER / 2, { fill: 'rgb(102,102,102)' } );
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
    createDragListener( topDragger, billiardsTable.lengthProperty, 'y', -1 );
    createDragListener( bottomDragger, billiardsTable.lengthProperty, 'y', 1 );

    // When the table is resized, redraw it.
    Property.multilink( [
      billiardsTable.lengthProperty,
      billiardsTable.widthProperty
    ], function() {
      var length = billiardsTable.lengthProperty.value;
      var width = billiardsTable.widthProperty.value;

      var brownEdgeLineWidth = 11;
      var scaledWidth = width * SCALE;
      var scaledHeight = length * SCALE;
      var lineWidthAmount = brownEdgeLineWidth * 2;

      blackRectangle.setRect( 0, 0, scaledWidth + lineWidthAmount, scaledHeight + lineWidthAmount );
      //TODO: cleanup?
      if ( options.fullSizeBounds ) {
        self.localBounds = Bounds2.point( 0, 0 ).dilatedXY(
          billiardsTable.range.max * SCALE / 2 + brownEdgeLineWidth,
          billiardsTable.range.max * SCALE / 2 + brownEdgeLineWidth );
      }
      greenRectangle.setRect( 0, 0, scaledWidth, scaledHeight );

      leftDragger.setRect( 0, 0, lineWidthAmount / 2, scaledHeight );
      rightDragger.setRect( 0, 0, lineWidthAmount / 2, scaledHeight );
      topDragger.setRect( 0, 0, scaledWidth, lineWidthAmount / 2 );
      bottomDragger.setRect( 0, 0, scaledWidth, lineWidthAmount / 2 );

      // Change the area of the grid lines that is shown
      gridLinesNode.clipArea = Shape.bounds( new Bounds2( 0, 0, scaledWidth, scaledHeight ).dilated( GRID_LINE_WIDTH / 2 ) );

      // center the rectangles
      greenRectangle.center = new Vector2( 0, 0 );
      blackRectangle.center = greenRectangle.center;

      // center the draggers
      leftDragger.center = greenRectangle.center.plusXY( -( scaledWidth / 2 + lineWidthAmount / 4 ), 0 );
      rightDragger.center = greenRectangle.center.plusXY( scaledWidth / 2 + lineWidthAmount / 4, 0 );
      topDragger.center = greenRectangle.center.plusXY( 0, -( scaledHeight / 2 + lineWidthAmount / 4 ) );
      bottomDragger.center = greenRectangle.center.plusXY( 0, scaledHeight / 2 + lineWidthAmount / 4 );

      leftDragHandle.center = leftDragger.center;
      rightDragHandle.center = rightDragger.center;
      topDragHandle.center = topDragger.center;
      bottomDragHandle.center = bottomDragger.center;

      // Position the lines layer
      lineLayer.translation = greenRectangle.translation;

      // Position the holes.
      bottomRightHoleNode.translation = greenRectangle.translation.plusXY( width * SCALE, length * SCALE );
      topLeftHoleNode.translation = greenRectangle.translation.plusXY( 0, 0 );
      topRightHoleNode.translation = greenRectangle.translation.plusXY( width * SCALE, 0 );
    } );

    //TODO: cleanup
    if ( options.allowDragToResize ) {
      this.children = [
        blackRectangle,
        greenRectangle,
        draggersLayer,
        lineLayer,
        topLeftHoleNode,
        topRightHoleNode,
        bottomRightHoleNode,
        leftDragHandle,
        rightDragHandle,
        topDragHandle,
        bottomDragHandle,
        ballNode
      ];
    }
    else {
      this.children = [
        blackRectangle,
        greenRectangle,
        lineLayer,
        topLeftHoleNode,
        topRightHoleNode,
        bottomRightHoleNode,
        ballNode
      ];
    }

    this.mutate( options );
  }

  proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

  return inherit( SceneRatioNode, BilliardsTableNode, {
    // TODO: doc
    createGridLinesNode: function() {
      var min = -1;
      var max = BilliardsTable.BILLIARDS_RANGE.max + 1;
      var shape = new Shape();

      // TODO: ditch scale in a bit
      _.range( min, max + 1 ).forEach( function( n ) {
        shape.moveTo( n * SCALE, min * SCALE )
             .lineTo( n * SCALE, max * SCALE );
        shape.moveTo( min * SCALE, n * SCALE )
             .lineTo( max * SCALE, n * SCALE );
      } );

      return new Path( shape, {
        stroke: 'rgb(168,168,168)', // TODO: common color profile
        lineWidth: GRID_LINE_WIDTH
      } );
    }
  } );
} );
