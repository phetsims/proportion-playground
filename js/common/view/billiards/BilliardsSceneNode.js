// Copyright 2016-2022, University of Colorado Boulder

/**
 * The node for the Billiards Scene, including two tables and spinners for each.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { HBox } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import Side from '../../model/Side.js';
import SceneNode from '../SceneNode.js';
import BilliardsTableControl from './BilliardsTableControl.js';
import BilliardTableIcon from './BilliardTableIcon.js';

// constants
const ICON_SCALE_OPTIONS = { scale: 0.3 };

class BilliardsSceneNode extends SceneNode {
  /**
   * @param {BilliardsScene} scene - the model
   * @param {Bounds2} layoutBounds - the region within which all visual components should be layed out
   * @param {Tandem} tandem
   */
  constructor( scene, layoutBounds, tandem ) {

    const billiardsCenterY = layoutBounds.height * 0.45;

    // Create the left/right tables
    const leftBilliardsTableControl = new BilliardsTableControl( scene.leftTable, tandem.createTandem( 'leftBilliardsTableControl' ), {
      centerY: billiardsCenterY,
      allowDragToResize: !scene.predictMode,
      side: Side.LEFT
    } );
    const rightBilliardsTableControl = new BilliardsTableControl( scene.rightTable, tandem.createTandem( 'rightBilliardsTableControl' ), {
      centerY: billiardsCenterY,
      allowDragToResize: !scene.predictMode,
      side: Side.RIGHT
    } );

    const iconBilliardsSize = 120;
    super( scene, layoutBounds, {
      sceneIcon: new BilliardTableIcon( iconBilliardsSize, iconBilliardsSize, { scale: 0.3 } ),
      leftControl: leftBilliardsTableControl,
      rightControl: rightBilliardsTableControl,
      leftSwitchIcon: new BilliardTableIcon( iconBilliardsSize, iconBilliardsSize, ICON_SCALE_OPTIONS ),
      rightSwitchIcon: new HBox( {
        spacing: 10,
        children: [
          new BilliardTableIcon( iconBilliardsSize, iconBilliardsSize, ICON_SCALE_OPTIONS ),
          new BilliardTableIcon( iconBilliardsSize, iconBilliardsSize, ICON_SCALE_OPTIONS ) ]
      } ),
      controlAlign: 'bottom',
      tandem: tandem
    } );

    // When the ABSwitch is toggled, show/hide the rightmost table and update the layout.
    scene.showBothProperty.link( showBoth => {
      if ( showBoth ) {
        leftBilliardsTableControl.left = 20;
        rightBilliardsTableControl.right = layoutBounds.right - 20;
      }
      else {
        leftBilliardsTableControl.setBilliardsCenter( layoutBounds.centerX );
      }
      this.updateControlButton();
    } );
  }
}

proportionPlayground.register( 'BilliardsSceneNode', BilliardsSceneNode );

export default BilliardsSceneNode;
