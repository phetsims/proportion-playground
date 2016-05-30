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

  // constants
  var scale = 18; // from model units to pixels
  var whiteStrokeOptions = { stroke: 'white' };
  var movingLineOptions = { stroke: 'white', lineWidth: 2 };
  var ballDiameter = 10;

  /**
   *
   * @param {Vector2} center - position (in layout bounds) where the table should be centered
   * @param {BilliardsTableModel} billiardsTableModel - the model
   * @param {Object} [options]
   * @constructor
   */
  function BilliardsTableNode( center, billiardsTableModel, options ) {

    var gridLinesNode = new Node();
    var linesNode = new Node();
    var currentLineNode = new Line( 0, 0, 0, 0, movingLineOptions );

    // Model the edge outside of the green area (not as a stroke) since there is no way to do "outer" stroke
    var brownRectangle = new Rectangle( 0, 0, 0, 0, { fill: ProportionPlaygroundConstants.billiardsBrown } );
    var greenRectangle = new Rectangle( 0, 0, 0, 0, {
      fill: ProportionPlaygroundConstants.billiardsGreen
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

      // center the rectangles
      greenRectangle.center = center;
      brownRectangle.center = greenRectangle.center;

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
        lineLayer,
        topLeftHoleNode,
        topRightHoleNode,
        bottomRightHoleNode,
        ballNode
      ]
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

  return inherit( Node, BilliardsTableNode );
} );