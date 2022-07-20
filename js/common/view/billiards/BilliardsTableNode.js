// Copyright 2016-2022, University of Colorado Boulder

/**
 * Shows a single Billiards table, draggable by its sides, with a moving ball and holes in the
 * top left, top right and bottom right corners.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrea Lin
 */

import Multilink from '../../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../../dot/js/Bounds2.js';
import Matrix3 from '../../../../../dot/js/Matrix3.js';
import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { Shape } from '../../../../../kite/js/imports.js';
import merge from '../../../../../phet-core/js/merge.js';
import ModelViewTransform2 from '../../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShadedSphereNode from '../../../../../scenery-phet/js/ShadedSphereNode.js';
import { Circle, DragListener, HBox, Node, Path, Rectangle } from '../../../../../scenery/js/imports.js';
import MutableOptionsNode from '../../../../../sun/js/MutableOptionsNode.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';
import SceneRatioNode from '../SceneRatioNode.js';
import BilliardsPath from './BilliardsPath.js';

// constants
const MODEL_VIEW_SCALE = 18;
const BALL_DIAMETER = 10;
const GRID_LINE_WIDTH = 0.028;

class BilliardsTableNode extends SceneRatioNode {
  /**
   * @param {BilliardsTable} billiardsTable - the model
   * @param {Object} [options] - See options below. Also passed to Node's mutate.
   */
  constructor( billiardsTable, tandem, options ) {

    super( billiardsTable );

    // {ModelViewTransform2} - Will be updated when the width/length changes.
    const modelViewTransform = new ModelViewTransform2( BilliardsTableNode.computeModelViewMatrix( billiardsTable.lengthProperty.value,
      billiardsTable.widthProperty.value ) );

    options = merge( {
      // {boolean} - Whether this node should always take up the bounds for a full-size (20x20) billiards table.
      fullSizeBounds: true,

      // {boolean} - Whether to allow dragging the borders of the table to resize it. If true, it will show some
      //             "grippy dots" to indicate it is draggable.
      allowDragToResize: true,

      tandem: tandem
    }, options );

    // Model the edge outside of the green area (not as a stroke) since there is no way to do "outer" stroke
    const borderRectangle = new Rectangle( {
      fill: ProportionPlaygroundColors.billiardsBorderProperty,
      cornerRadius: 9
    } );
    const insideRectangle = new Rectangle( {
      fill: ProportionPlaygroundColors.billiardsInsideProperty
    } );

    // Create drag-handle parts to be used as children.
    const dragGripDots = new HBox( {
      pickable: false, // use the mouse/touch areas directly, don't test these
      spacing: 1.3,
      children: [ 0, 1, 2 ].map( () => new Circle( 1.2, {
        fill: ProportionPlaygroundColors.billiardsGripDotsProperty
      } ) ),
      center: Vector2.ZERO
    } );
    const rotatedGripDots = new Node( { children: [ dragGripDots ], rotation: Math.PI / 2 } );

    // Drag handles (with grippy dots). These will live on the 4 borders, and can be dragged to resize the table.
    const leftDragHandle = new Node( { cursor: 'pointer', children: [ rotatedGripDots ] } );
    const rightDragHandle = new Node( { cursor: 'pointer', children: [ rotatedGripDots ] } );
    const topDragHandle = new Node( { cursor: 'pointer', children: [ dragGripDots ] } );
    const bottomDragHandle = new Node( { cursor: 'pointer', children: [ dragGripDots ] } );

    // Grid lines for in the inner rectangle. Clipping will be used instead of redrawing when width/length changes.
    const gridLinesNode = BilliardsTableNode.createGridLinesNode();

    // The path shows the trail of where the ball has been
    const pathNode = new BilliardsPath( modelViewTransform, billiardsTable.collisionPoints, billiardsTable.ballPositionProperty );
    billiardsTable.restartEmitter.addListener( () => {
      pathNode.reset();
    } );

    // The moving ball node
    const ballNode = new MutableOptionsNode( ShadedSphereNode, [ BALL_DIAMETER ], {
      pickable: false
    }, {
      mainColor: ProportionPlaygroundColors.billiardsBallMainProperty,
      highlightColor: ProportionPlaygroundColors.billiardsBallHighlightProperty
    } );
    billiardsTable.ballPositionProperty.link( ballModelPosition => {
      ballNode.translation = modelViewTransform.modelToViewPosition( ballModelPosition );
    } );

    // Create the holes for top-left, top-right and bottom-right
    const createCircle = () => new Circle( BALL_DIAMETER / 2, { fill: ProportionPlaygroundColors.billiardsPocketProperty } );
    const topLeftHoleNode = createCircle();
    const topRightHoleNode = createCircle();
    const bottomRightHoleNode = createCircle();

    /**
     * Hook up the drag listener for each drag handle.
     *
     * @param {Node} dragHandle
     * @param {Property.<number>} property - The width or length property of the table
     * @param {string} coordinate - the axis, 'x' or 'y', to use. Corresponds with width or length, respectively.
     * @param {number} changeSign - -1 or 1, designates whether its the left or right, top or bottom dragHandle
     * @param {Tandem} tandem
     */
    const createDragListener = ( dragHandle, property, coordinate, changeSign, tandem ) => {

      let startPoint; // track where the mouse drag starts
      let startProperty; // track the beginning width

      dragHandle.addInputListener( new DragListener( {
        tandem: tandem,
        applyOffset: false,
        start: ( event, listener ) => {
          startPoint = listener.parentPoint;
          startProperty = property.value;
        },

        drag: ( event, listener ) => {
          const change = Utils.roundSymmetric( changeSign * ( listener.parentPoint[ coordinate ] - startPoint[ coordinate ] ) * 2 / MODEL_VIEW_SCALE );

          // change width so its within the acceptable range
          property.value = ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE.constrainValue( startProperty + change );
        }

      } ) );
    };
    // When a side of the table is dragged, the appropriate width or length changes.
    createDragListener( leftDragHandle, billiardsTable.widthProperty, 'x', -1, tandem.createTandem( 'leftDragListener' ) );
    createDragListener( rightDragHandle, billiardsTable.widthProperty, 'x', 1, tandem.createTandem( 'rightDragListener' ) );
    createDragListener( topDragHandle, billiardsTable.lengthProperty, 'y', -1, tandem.createTandem( 'topDragListener' ) );
    createDragListener( bottomDragHandle, billiardsTable.lengthProperty, 'y', 1, tandem.createTandem( 'bottomDragListener' ) );

    // When the table is resized, redraw it.
    Multilink.multilink( [
      billiardsTable.lengthProperty,
      billiardsTable.widthProperty
    ], () => {
      const length = billiardsTable.lengthProperty.value;
      const width = billiardsTable.widthProperty.value;

      // Recompute the model-view transform.
      modelViewTransform.setMatrix( BilliardsTableNode.computeModelViewMatrix( billiardsTable.lengthProperty.value,
        billiardsTable.widthProperty.value ) );

      const viewEdgeWidth = 11;
      const modelEdgeWidth = modelViewTransform.viewToModelDeltaX( viewEdgeWidth );

      // Compute the full bounds (and set as local bounds) if the option is provided.
      if ( options.fullSizeBounds ) {
        this.localBounds = Bounds2.point( 0, 0 ).dilatedXY(
          ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE.max * MODEL_VIEW_SCALE / 2 + viewEdgeWidth,
          ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE.max * MODEL_VIEW_SCALE / 2 + viewEdgeWidth );
      }

      // Determine the view bounds of the area where the ball can be.
      const viewBounds = new Bounds2( modelViewTransform.modelToViewX( 0 ),
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
        // Quadrilateral that covers the border in the specified quadrant
        dragHandle.mouseArea = new Shape().polygon( [
          new Vector2( -width / 2, -length / 2 ),
          new Vector2( -width / 2, length / 2 ),
          new Vector2( width / 2, length / 2 + width ),
          new Vector2( width / 2, -length / 2 - width )
        ] ).transformed( Matrix3.rotation2( rotation ) );

        // Apply an additional offset for touch
        const touchOffset = 0.6 * width;
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
      gridLinesNode.clipArea = Shape.bounds( new Bounds2( 0, 0, width, length ).dilated( GRID_LINE_WIDTH / 2 ) );
      gridLinesNode.translation = new Vector2( -width * MODEL_VIEW_SCALE / 2, -length * MODEL_VIEW_SCALE / 2 );

      // Position the holes.
      bottomRightHoleNode.translation = modelViewTransform.modelToViewPosition( new Vector2( width, 0 ) );
      topLeftHoleNode.translation = modelViewTransform.modelToViewPosition( new Vector2( 0, length ) );
      topRightHoleNode.translation = modelViewTransform.modelToViewPosition( new Vector2( width, length ) );
    } );

    // Set up child order, with the drag handles (if added) under the ball, but over everything else.
    const baseNodes = [
      borderRectangle, insideRectangle,
      gridLinesNode,
      pathNode,
      topLeftHoleNode, topRightHoleNode, bottomRightHoleNode
    ];
    const dragHandles = [
      leftDragHandle, rightDragHandle, topDragHandle, bottomDragHandle
    ];
    this.children = baseNodes.concat( options.allowDragToResize ? dragHandles : [], [ ballNode ] );

    this.mutate( options );
  }


  /**
   * Computes what the current model-view transform should be (depends on length/width).
   * @private
   *
   * @returns {Matrix3}
   */
  static computeModelViewMatrix( length, width ) {
    return new Matrix3().rowMajor( MODEL_VIEW_SCALE, 0, -MODEL_VIEW_SCALE * width / 2,
      0, -MODEL_VIEW_SCALE, MODEL_VIEW_SCALE * length / 2,
      0, 0, 1 );
  }

  /**
   * Creates a node that contains all of the potentially required grid lines.
   * @private
   *
   * @returns {Node}
   */
  static createGridLinesNode() {
    const min = -1;
    const max = ProportionPlaygroundConstants.BILLIARDS_COUNT_RANGE.max + 1;
    const shape = new Shape();

    _.range( min, max + 1 ).forEach( n => {
      shape.moveTo( n, min )
        .lineTo( n, max );
      shape.moveTo( min, n )
        .lineTo( max, n );
    } );

    return new Path( shape, {
      scale: MODEL_VIEW_SCALE,
      stroke: ProportionPlaygroundColors.billiardsGridLineProperty,
      lineWidth: GRID_LINE_WIDTH
    } );
  }
}

proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

export default BilliardsTableNode;