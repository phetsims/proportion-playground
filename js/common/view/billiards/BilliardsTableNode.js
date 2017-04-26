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
  var BilliardsPath = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsPath' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var SCALE = 18; // from model units to view units   TODO: why don't we scale up after? Seems simpler
  var BALL_DIAMETER = 10;
  var GRID_LINE_WIDTH = 0.5;

  /**
   * @constructor
   * @extends {SceneRatioNode}
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
      pickable: false, // use the mouse/touch areas directly, don't test these
      spacing: 1.3,
      children: [ 0, 1, 2 ].map( function() {
        return new Circle( 1.2, {
          fill: ProportionPlaygroundColorProfile.billiardsGripDotsProperty
        } );
      } ),
      center: Vector2.ZERO
    } );
    var rotatedGripDots = new Node( { children: [ dragGripDots ], rotation: Math.PI / 2 } );

    var leftDragHandle = new Node( { cursor: 'pointer', children: [ rotatedGripDots ] } );
    var rightDragHandle = new Node( { cursor: 'pointer', children: [ rotatedGripDots ] } );
    var topDragHandle = new Node( { cursor: 'pointer', children: [ dragGripDots ] } );
    var bottomDragHandle = new Node( { cursor: 'pointer', children: [ dragGripDots ] } );

    var gridLinesNode = BilliardsTableNode.createGridLinesNode();
    var pathNode = new BilliardsPath( modelViewTransform, billiardsTable.collisionPoints, billiardsTable.ballPositionProperty );
    billiardsTable.restartEmitter.addListener( function() {
      pathNode.reset();
    } );

    // The moving ball node
    var ballNode = new MutableOptionsNode( ShadedSphereNode, [ BALL_DIAMETER ], {
      pickable: false
    }, {
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
     * @param {Rectangle} dragHandle - the dragHandle node on the side of a table
     * @param {Property.<number>} property - the width or length property of the table
     * @param {string} coordinate - the axis, 'x' or 'y', to use. Corresponds with width or length, respectively.
     * @param {number} changeSign - -1 or 1, designates whether its the left or right, top or bottom dragHandle
     */
    var createDragListener = function( dragHandle, property, coordinate, changeSign ) {

      var startPoint; // track where the mouse drag starts
      var startProperty; // track the beginning width

      dragHandle.addInputListener( new SimpleDragHandler( {
        // Help touch a bit more
        allowTouchSnag: true,

        start: function( event ) {
          startPoint = dragHandle.globalToParentPoint( event.pointer.point );
          startProperty = property.value;
        },

        drag: function( event ) {
          var mousePoint = self.globalToLocalPoint( event.pointer.point );
          var change = Util.roundSymmetric( changeSign * ( mousePoint[ coordinate ] - startPoint[ coordinate ] ) * 2 / SCALE );

          // change width so its within the acceptable range
          property.value = ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE.constrainValue( startProperty + change );
        }

      } ) );
    };

    // When a side of the table is dragged, the appropriate width or length changes.
    createDragListener( leftDragHandle, billiardsTable.widthProperty, 'x', -1 );
    createDragListener( rightDragHandle, billiardsTable.widthProperty, 'x', 1 );
    createDragListener( topDragHandle, billiardsTable.lengthProperty, 'y', -1 );
    createDragListener( bottomDragHandle, billiardsTable.lengthProperty, 'y', 1 );

    // When the table is resized, redraw it.
    Property.multilink( [
      billiardsTable.lengthProperty,
      billiardsTable.widthProperty
    ], function() {
      var length = billiardsTable.lengthProperty.value;
      var width = billiardsTable.widthProperty.value;

      modelViewTransform.setMatrix( self.computeModelViewMatrix() );

      var viewEdgeWidth = 11;
      var modelEdgeWidth = viewEdgeWidth / SCALE;

      if ( options.fullSizeBounds ) {
        self.localBounds =  Bounds2.point( 0, 0 ).dilatedXY(
          ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE.max * SCALE / 2 + viewEdgeWidth,
          ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE.max * SCALE / 2 + viewEdgeWidth );
      }
      var viewBounds = new Bounds2( modelViewTransform.modelToViewX( 0 ),
                                    modelViewTransform.modelToViewY( length ), // since this gets mapped to the min
                                    modelViewTransform.modelToViewX( width ),
                                    modelViewTransform.modelToViewY( 0 ) );
      insideRectangle.setRectBounds( viewBounds );
      borderRectangle.setRectBounds( viewBounds.dilated( viewEdgeWidth ) );

      leftDragHandle.center = modelViewTransform.modelToViewPosition( new Vector2( -modelEdgeWidth / 2, length / 2 ) );
      rightDragHandle.center = modelViewTransform.modelToViewPosition( new Vector2( width + modelEdgeWidth / 2, length / 2 ) );
      topDragHandle.center = modelViewTransform.modelToViewPosition( new Vector2( width / 2, length + modelEdgeWidth / 2 ) );
      bottomDragHandle.center = modelViewTransform.modelToViewPosition( new Vector2( width / 2, -modelEdgeWidth / 2 ) );

      function setMouseTouchAreas( dragHandle, width, length, rotation ) {
        dragHandle.mouseArea = new Shape().polygon( [
          new Vector2( -width / 2, -length / 2 ),
          new Vector2( -width / 2, length / 2 ),
          new Vector2( width / 2, length / 2 + width ),
          new Vector2( width / 2, -length / 2 - width )
        ] ).transformed( Matrix3.rotation2( rotation ) );

        var touchOffset = 0.6 * width;
        dragHandle.touchArea = new Shape().polygon( [
          new Vector2( -width / 2 - touchOffset, -length / 2 + touchOffset ),
          new Vector2( -width / 2 - touchOffset, length / 2 - touchOffset ),
          new Vector2( width / 2 + touchOffset, length / 2 + width + touchOffset ),
          new Vector2( width / 2 + touchOffset, -length / 2 - width - touchOffset )
        ] ).transformed( Matrix3.rotation2( rotation ) );
      }
      setMouseTouchAreas( leftDragHandle, viewEdgeWidth, -modelViewTransform.modelToViewDeltaY( length ), Math.PI );
      setMouseTouchAreas( rightDragHandle, viewEdgeWidth, -modelViewTransform.modelToViewDeltaY( length ), 0 );
      setMouseTouchAreas( topDragHandle, viewEdgeWidth, modelViewTransform.modelToViewDeltaX( width ), -Math.PI / 2 );
      setMouseTouchAreas( bottomDragHandle, viewEdgeWidth, modelViewTransform.modelToViewDeltaX( width ), Math.PI / 2 );

      // Position and clip the grid lines (positioning is relevant, can't use view bounds above)
      gridLinesNode.clipArea = Shape.bounds( new Bounds2( 0, 0, width * SCALE, length * SCALE ).dilated( GRID_LINE_WIDTH / 2 ) );
      gridLinesNode.translation = new Vector2( -width * SCALE / 2, -length * SCALE / 2 );

      // Position the holes.
      bottomRightHoleNode.translation = modelViewTransform.modelToViewPosition( new Vector2( width, 0 ) );
      topLeftHoleNode.translation = modelViewTransform.modelToViewPosition( new Vector2( 0, length ) );
      topRightHoleNode.translation = modelViewTransform.modelToViewPosition( new Vector2( width, length ) );
    } );


    var rectangles = [ borderRectangle, insideRectangle ];
    var paths = [ gridLinesNode, pathNode, topLeftHoleNode, topRightHoleNode, bottomRightHoleNode ];
    var handles = [ leftDragHandle, rightDragHandle, topDragHandle, bottomDragHandle ];

    if ( options.allowDragToResize ) {
      this.children = rectangles.concat( paths )
                                .concat( handles )
                                .concat( [ ballNode ] );
    }
    else {
      this.children = rectangles.concat( paths )
                                .concat( [ ballNode ] );
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
      var max = ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE.max + 1;
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
