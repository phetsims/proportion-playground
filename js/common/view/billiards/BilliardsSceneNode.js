// Copyright 2016-2017, University of Colorado Boulder

/**
 * The node for the Billiards Scene, including two tables and spinners for each.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BilliardsTableControl = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableControl' );
  const BilliardTableIcon = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardTableIcon' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const SceneNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneNode' );
  const Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );

  // constants
  var ICON_SCALE_OPTIONS = { scale: 0.3 };

  /**
   * @constructor
   * @extends {SceneNode}
   *
   * @param {BilliardsScene} scene - the model
   * @param {Bounds2} layoutBounds - the region within which all visual components should be layed out
   */
  function BilliardsSceneNode( scene, layoutBounds ) {
    var self = this;

    var billiardsCenterY = layoutBounds.height * 0.45;

    // Create the left/right tables
    var billiardsTableLeftControl = new BilliardsTableControl( scene.leftTable, {
      centerY: billiardsCenterY,
      allowDragToResize: !scene.predictMode,
      side: Side.LEFT
    } );
    var billiardsTableRightControl = new BilliardsTableControl( scene.rightTable, {
      centerY: billiardsCenterY,
      allowDragToResize: !scene.predictMode,
      side: Side.RIGHT
    } );

    var iconBilliardsSize = 120;
    SceneNode.call( this, scene, layoutBounds, {
      sceneIcon: new BilliardTableIcon( iconBilliardsSize, iconBilliardsSize, { scale: 0.3 } ),
      leftControl: billiardsTableLeftControl,
      rightControl: billiardsTableRightControl,
      leftSwitchIcon: new BilliardTableIcon( iconBilliardsSize, iconBilliardsSize, ICON_SCALE_OPTIONS ),
      rightSwitchIcon: new HBox( {
        spacing: 10,
        children: [
          new BilliardTableIcon( iconBilliardsSize, iconBilliardsSize, ICON_SCALE_OPTIONS ),
          new BilliardTableIcon( iconBilliardsSize, iconBilliardsSize, ICON_SCALE_OPTIONS ) ]
      } ),
      controlLocation: 'bottom'
    } );

    // When the ABSwitch is toggled, show/hide the rightmost table and update the layout.
    scene.showBothProperty.link( function( showBoth ) {
      if ( showBoth ) {
        billiardsTableLeftControl.left = 20;
        billiardsTableRightControl.right = layoutBounds.right - 20;
      }
      else {
        billiardsTableLeftControl.setBilliardsCenter( layoutBounds.centerX );
      }
      self.updateControlButton();
    } );
  }

  proportionPlayground.register( 'BilliardsSceneNode', BilliardsSceneNode );

  return inherit( SceneNode, BilliardsSceneNode );
} );
