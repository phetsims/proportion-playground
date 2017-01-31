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
  var Matrix3 = require( 'DOT/Matrix3' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var BilliardsTable = require( 'PROPORTION_PLAYGROUND/common/model/billiards/BilliardsTable' );
  var BilliardsPath = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsPath' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );
  var Util = require( 'DOT/Util' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );

  // constants
  var SCALE = 18; // from model units to view units   TODO: why don't we scale up after? Seems simpler
  var BALL_DIAMETER = 10;
  var GRID_LINE_WIDTH = 0.5;

  /**
   * @constructor
   *
   * @param {BilliardsTable} billiardsTable - the model
   * @param {Object} [options] - See options below. Also passed to Node's mutate.
   */
  function BilliardsTableNode( billiardsTable, options ) {
    var self = this;


    SceneRatioNode.call( this, billiardsTable );

    // @private {BilliardsTable}
    this.billiardsTable = billiardsTable;

    var modelViewTransform = new ModelViewTransform2( this.computeModelViewMatrix() );

    options = _.extend( {
      // {boolean} - Whether this node should always take up the bounds for a full-size (20x20) billiards table.
      fullSizeBounds: true,

      // {boolean} - Whether to allow dragging the borders of the table to resize it. If true, it will show some
      //             "grippy dots" to indicate it is draggable.
      allowDragToResize: true
    }, options );

    // Model the edge outside of the green area (not as a stroke) since there is no way to do "outer" stroke
    var borderRectangle = new Rectangle( { fill: ProportionPlaygroundColorProfile.billiardsBorderProperty } );
    var insideRectangle = new Rectangle( { fill: ProportionPlaygroundColorProfile.billiardsInsideProperty } );

    var dragGripDots = new HBox( {
      spacing: 1.3,
      children: [ 0, 1, 2 ].map( function() {
        return new Circle( 1.2, {
          fill: ProportionPlaygroundColorProfile.billiardsGripDotsProperty
        } );
      } )
    } );

    var leftDragHandle = new Node( { children: [ dragGripDots ], rotation: Math.PI / 2 } );
    var rightDragHandle = new Node( { children: [ dragGripDots ], rotation: Math.PI / 2 } );
    var topDragHandle = new Node( { children: [ dragGripDots ] } );
    var bottomDragHandle = new Node( { children: [ dragGripDots ] } );

    // invisible rectangles used to drag the sides of the table to change the dimensions
    var draggerOptions = {
      cursor: 'pointer',
      pickable: true
    };
    var leftDragger = new Rectangle( draggerOptions );
    var rightDragger = new Rectangle( draggerOptions );
    var topDragger = new Rectangle( draggerOptions );
    var bottomDragger = new Rectangle( draggerOptions );

    var gridLinesNode = BilliardsTableNode.createGridLinesNode();
    var pathNode = new BilliardsPath( modelViewTransform, billiardsTable.collisionPoints, billiardsTable.ballPositionProperty );
    billiardsTable.restartEmitter.addListener( function() {
      pathNode.reset();
    } );

    // The moving ball node
    var ballNode = new MutableOptionsNode( ShadedSphereNode, [ BALL_DIAMETER ], {}, {
      mainColor: ProportionPlaygroundColorProfile.billiardsBallMainProperty,
      highlightColor: ProportionPlaygroundColorProfile.billiardsBallHighlightProperty
    } );
    billiardsTable.ballPositionProperty.link( function( ballModelPosition ) {
      ballNode.translation = modelViewTransform.modelToViewPosition( ballModelPosition );
    } );

    // Create the holes for top-left, top-right and bottom-right
    var createCircle = function() {
      return new Circle( BALL_DIAMETER / 2, { fill: ProportionPlaygroundColorProfile.billiardsPocketProperty } );
    };
    var topLeftHoleNode = createCircle();
    var topRightHoleNode = createCircle();
    var bottomRightHoleNode = createCircle();

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

      modelViewTransform.setMatrix( self.computeModelViewMatrix() );

      pathNode.reset();

      var brownEdgeLineWidth = 11;
      var scaledWidth = width * SCALE;
      var scaledHeight = length * SCALE;
      var lineWidthAmount = brownEdgeLineWidth * 2;

      borderRectangle.setRect( 0, 0, scaledWidth + lineWidthAmount, scaledHeight + lineWidthAmount );
      //TODO: cleanup?
      if ( options.fullSizeBounds ) {
        self.localBounds = Bounds2.point( 0, 0 ).dilatedXY(
          billiardsTable.range.max * SCALE / 2 + brownEdgeLineWidth,
          billiardsTable.range.max * SCALE / 2 + brownEdgeLineWidth );
      }
      insideRectangle.setRect( 0, 0, scaledWidth, scaledHeight );

      leftDragger.setRect( 0, 0, lineWidthAmount / 2, scaledHeight );
      rightDragger.setRect( 0, 0, lineWidthAmount / 2, scaledHeight );
      topDragger.setRect( 0, 0, scaledWidth, lineWidthAmount / 2 );
      bottomDragger.setRect( 0, 0, scaledWidth, lineWidthAmount / 2 );

      // Change the area of the grid lines that is shown
      gridLinesNode.clipArea = Shape.bounds( new Bounds2( 0, 0, scaledWidth, scaledHeight ).dilated( GRID_LINE_WIDTH / 2 ) );

      // center the rectangles
      insideRectangle.center = new Vector2( 0, 0 );
      borderRectangle.center = insideRectangle.center;

      // center the draggers
      leftDragger.center = insideRectangle.center.plusXY( -( scaledWidth / 2 + lineWidthAmount / 4 ), 0 );
      rightDragger.center = insideRectangle.center.plusXY( scaledWidth / 2 + lineWidthAmount / 4, 0 );
      topDragger.center = insideRectangle.center.plusXY( 0, -( scaledHeight / 2 + lineWidthAmount / 4 ) );
      bottomDragger.center = insideRectangle.center.plusXY( 0, scaledHeight / 2 + lineWidthAmount / 4 );

      leftDragHandle.center = leftDragger.center;
      rightDragHandle.center = rightDragger.center;
      topDragHandle.center = topDragger.center;
      bottomDragHandle.center = bottomDragger.center;

      // Position the lines layer
      gridLinesNode.translation = insideRectangle.translation;

      // Position the holes.
      bottomRightHoleNode.translation = insideRectangle.translation.plusXY( width * SCALE, length * SCALE );
      topLeftHoleNode.translation = insideRectangle.translation.plusXY( 0, 0 );
      topRightHoleNode.translation = insideRectangle.translation.plusXY( width * SCALE, 0 );
    } );

    //TODO: cleanup
    if ( options.allowDragToResize ) {
      this.children = [
        borderRectangle,
        insideRectangle,
        leftDragger, rightDragger, topDragger, bottomDragger,
        gridLinesNode,
        pathNode,
        topLeftHoleNode, topRightHoleNode, bottomRightHoleNode,
        leftDragHandle, rightDragHandle, topDragHandle, bottomDragHandle,
        ballNode
      ];
    }
    else {
      this.children = [
        borderRectangle,
        insideRectangle,
        gridLinesNode,
        pathNode,
        topLeftHoleNode, topRightHoleNode, bottomRightHoleNode,
        ballNode
      ];
    }

    this.mutate( options );
  }

  proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

  return inherit( SceneRatioNode, BilliardsTableNode, {
    /**
     * Computes what the current model-view transform should be (depends on length/width).
     * @private
     *
     * @returns {Matrix3}
     */
    computeModelViewMatrix: function() {
      // Long property names
      var length = this.billiardsTable.lengthProperty.value;
      var width = this.billiardsTable.widthProperty.value;

      return new Matrix3().rowMajor( SCALE, 0, -SCALE * width / 2,
                                     0, -SCALE, SCALE * length / 2,
                                     0, 0, 1 );
    }
  }, {
    /**
     * Creates a node that contains all of the potentially required grid lines.
     * @private
     *
     * @returns {Node}
     */
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
        stroke: ProportionPlaygroundColorProfile.billiardsGridLineProperty,
        lineWidth: GRID_LINE_WIDTH
      } );
    }
  } );
} );
