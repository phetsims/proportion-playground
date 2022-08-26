// Copyright 2016-2022, University of Colorado Boulder

/**
 * View for scene-based
 * View node for the Explore screen, or for Predict screen if the model has predictMode set to true.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { Node } from '../../../../scenery/js/imports.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../ProportionPlaygroundConstants.js';
import AppleSceneNode from './apples/AppleSceneNode.js';
import BilliardsSceneNode from './billiards/BilliardsSceneNode.js';
import NecklaceSceneNode from './necklace/NecklaceSceneNode.js';
import PaintSceneNode from './paint/PaintSceneNode.js';
import SceneSelectionControls from './SceneSelectionControls.js';

class ProportionScreenView extends ScreenView {

  /**
   * @param {BarModel} model - the model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    super( {
      tandem: tandem
    } );

    // Reset All button
    this.addChild( new ResetAllButton( {
      listener: () => {
        model.reset();
      },
      centerX: this.layoutBounds.right - ProportionPlaygroundConstants.BUTTON_RIGHT_CENTER_OFFSET,
      bottom: this.layoutBounds.maxY - 10,
      tandem: tandem.createTandem( 'resetAllButton' )
    } ) );

    // @private {Array.<SceneNode>} - Store by index for lookup by radio button index
    this.sceneNodes = [
      new NecklaceSceneNode( model.necklaceScene, this.layoutBounds, tandem.createTandem( 'necklaceScene' ) ),
      new PaintSceneNode( model.paintScene, this.layoutBounds, tandem.createTandem( 'paintScene' ) ),
      new BilliardsSceneNode( model.billiardsScene, this.layoutBounds, tandem.createTandem( 'billiardsScene' ) ),
      new AppleSceneNode( model.appleScene, this.layoutBounds, tandem.createTandem( 'appleScene' ) )
    ];

    // Scene selection radio buttons
    this.addChild( new SceneSelectionControls( model.sceneProperty, this.sceneNodes, tandem.createTandem( 'sceneSelectionButtonGroup' ), {
      centerX: this.layoutBounds.centerX,
      top: 5
    } ) );

    this.sceneNodes.forEach( scene => {
      scene.addShowBothSwitch();
    } );

    const sceneContainer = new Node( {
      children: this.sceneNodes
    } );
    this.addChild( sceneContainer );

    // When the scene radio button is selected, show the selected scene
    model.sceneProperty.link( scene => {
      for ( let i = 0; i < this.sceneNodes.length; i++ ) {
        const sceneNode = this.sceneNodes[ i ];

        const shouldBeVisible = sceneNode.scene === scene;
        const isCurrentlyVisible = sceneNode.visible;

        // Interrupt
        if ( !shouldBeVisible && isCurrentlyVisible ) {
          sceneNode.interruptSubtreeInput();
        }
        sceneNode.visible = shouldBeVisible;
      }
    } );
  }

  /**
   * Steps forward in time.
   * @public
   *
   * @param {number} dt - In seconds
   */
  step( dt ) {
    // NOTE: uncapped dt in the view so that the transient animations finish when someone tabs out. See
    // https://github.com/phetsims/proportion-playground/issues/87 for more information.

    const visibleBounds = this.visibleBoundsProperty.value;
    for ( let i = 0; i < this.sceneNodes.length; i++ ) {
      this.sceneNodes[ i ].step( dt, visibleBounds );
    }
  }
}

proportionPlayground.register( 'ProportionScreenView', ProportionScreenView );
export default ProportionScreenView;