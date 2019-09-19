// Copyright 2016-2017, University of Colorado Boulder

/**
 * View for scene-based
 * View node for the Explore screen, or for Predict screen if the model has predictMode set to true.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AppleSceneNode = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleSceneNode' );
  const BilliardsSceneNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsSceneNode' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NecklaceSceneNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceSceneNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PaintSceneNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/PaintSceneNode' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const SceneSelectionControls = require( 'PROPORTION_PLAYGROUND/common/view/SceneSelectionControls' );
  const ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @constructor
   * @extends {ScreenView}
   *
   * @param {ProportionModel} model - the model
   */
  function ProportionScreenView( model ) {
    var self = this;

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

    var sceneContainer = new Node( {
      children: this.sceneNodes
    } );
    this.addChild( sceneContainer );

    // When the scene radio button is selected, show the selected scene
    model.sceneProperty.link( function( scene ) {
      for ( var i = 0; i < self.sceneNodes.length; i++ ) {
        var sceneNode = self.sceneNodes[ i ];

        var shouldBeVisible = sceneNode.scene === scene;
        var isCurrentlyVisible = sceneNode.visible;

        // Interrupt
        if ( !shouldBeVisible && isCurrentlyVisible ) {
          sceneNode.interruptSubtreeInput();
        }
        sceneNode.visible = shouldBeVisible;
      }
    } );
  }

  proportionPlayground.register( 'ProportionScreenView', ProportionScreenView );

  return inherit( ScreenView, ProportionScreenView, {
    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt - In seconds
     */
    step: function( dt ) {
      // NOTE: uncapped dt in the view so that the transient animations finish when someone tabs out. See
      // https://github.com/phetsims/proportion-playground/issues/87 for more information.

      var visibleBounds = this.visibleBoundsProperty.value;
      for ( var i = 0; i < this.sceneNodes.length; i++ ) {
        this.sceneNodes[ i ].step( dt, visibleBounds );
      }
    }
  } );
} );
