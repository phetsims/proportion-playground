// Copyright 2016-2020, University of Colorado Boulder

/**
 * View for scene-based
 * View node for the Explore screen, or for Predict screen if the model has predictMode set to true.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../ProportionPlaygroundConstants.js';
import AppleSceneNode from './apples/AppleSceneNode.js';
import BilliardsSceneNode from './billiards/BilliardsSceneNode.js';
import NecklaceSceneNode from './necklace/NecklaceSceneNode.js';
import PaintSceneNode from './paint/PaintSceneNode.js';
import SceneSelectionControls from './SceneSelectionControls.js';

/**
 * @constructor
 * @extends {ScreenView}
 *
 * @param {ProportionModel} model - the model
 */
function ProportionScreenView( model ) {
  const self = this;

  ScreenView.call( this, {
    layoutBounds: new Bounds2( 0, 0, 1024, 618 )
  } );

  // Reset All button
  this.addChild( new ResetAllButton( {
    listener: function() {
      model.reset();
    },
    centerX: this.layoutBounds.right - ProportionPlaygroundConstants.BUTTON_RIGHT_CENTER_OFFSET,
    bottom: this.layoutBounds.maxY - 10
  } ) );

  // @private {Array.<SceneNode>} - Store by index for lookup by radio button index
  this.sceneNodes = [
    new NecklaceSceneNode( model.necklaceScene, this.layoutBounds ),
    new PaintSceneNode( model.paintScene, this.layoutBounds ),
    new BilliardsSceneNode( model.billiardsScene, this.layoutBounds ),
    new AppleSceneNode( model.appleScene, this.layoutBounds )
  ];

  // Scene selection radio buttons
  this.addChild( new SceneSelectionControls( model.sceneProperty, this.sceneNodes, {
    centerX: this.layoutBounds.centerX,
    top: 5
  } ) );

  this.sceneNodes.forEach( function( scene ) {
    scene.addShowBothSwitch();
  } );

  const sceneContainer = new Node( {
    children: this.sceneNodes
  } );
  this.addChild( sceneContainer );

  // When the scene radio button is selected, show the selected scene
  model.sceneProperty.link( function( scene ) {
    for ( let i = 0; i < self.sceneNodes.length; i++ ) {
      const sceneNode = self.sceneNodes[ i ];

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

proportionPlayground.register( 'ProportionScreenView', ProportionScreenView );

export default inherit( ScreenView, ProportionScreenView, {
  /**
   * Steps forward in time.
   * @public
   *
   * @param {number} dt - In seconds
   */
  step: function( dt ) {
    // NOTE: uncapped dt in the view so that the transient animations finish when someone tabs out. See
    // https://github.com/phetsims/proportion-playground/issues/87 for more information.

    const visibleBounds = this.visibleBoundsProperty.value;
    for ( let i = 0; i < this.sceneNodes.length; i++ ) {
      this.sceneNodes[ i ].step( dt, visibleBounds );
    }
  }
} );