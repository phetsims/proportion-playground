// Copyright 2016-2019, University of Colorado Boulder

/**
 * The node for the Billiards Scene, including two tables and spinners for each.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import proportionPlayground from '../../../proportionPlayground.js';
import Side from '../../model/Side.js';
import SceneNode from '../SceneNode.js';
import BilliardsTableControl from './BilliardsTableControl.js';
import BilliardTableIcon from './BilliardTableIcon.js';

// constants
const ICON_SCALE_OPTIONS = { scale: 0.3 };

/**
 * @constructor
 * @extends {SceneNode}
 *
 * @param {BilliardsScene} scene - the model
 * @param {Bounds2} layoutBounds - the region within which all visual components should be layed out
 */
function BilliardsSceneNode( scene, layoutBounds ) {
  const self = this;

  const billiardsCenterY = layoutBounds.height * 0.45;

  // Create the left/right tables
  const billiardsTableLeftControl = new BilliardsTableControl( scene.leftTable, {
    centerY: billiardsCenterY,
    allowDragToResize: !scene.predictMode,
    side: Side.LEFT
  } );
  const billiardsTableRightControl = new BilliardsTableControl( scene.rightTable, {
    centerY: billiardsCenterY,
    allowDragToResize: !scene.predictMode,
    side: Side.RIGHT
  } );

  const iconBilliardsSize = 120;
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

inherit( SceneNode, BilliardsSceneNode );
export default BilliardsSceneNode;