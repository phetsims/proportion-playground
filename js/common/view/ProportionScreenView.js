// Copyright 2016, University of Colorado Boulder

/**
 * View for scene-based
 * View node for the Explore screen, or for Predict screen if the model has predictMode set to true.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SceneSelectionRadioButtonGroup = require( 'PROPORTION_PLAYGROUND/common/view/SceneSelectionRadioButtonGroup' );
  var NecklaceSceneNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceSceneNode' );
  var PaintSceneNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/PaintSceneNode' );
  var BilliardsSceneNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsSceneNode' );
  var AppleSceneNode = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleSceneNode' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @constructor
   *
   * @param {ProportionModel} model - the model
   */
  function ProportionScreenView( model ) {

    ScreenView.call( this );

    // Reset All button
    this.addChild( new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } ) );

    // Scene selection radio buttons
    this.addChild( new SceneSelectionRadioButtonGroup( model, {
      centerX: this.layoutBounds.centerX,
      top: 5
    } ) );

    // One node for each scene.
    var necklaceSceneNode = new NecklaceSceneNode( this.layoutBounds, model.necklaceScene, model.predictMode );
    var paintSceneNode = new PaintSceneNode( this.layoutBounds, model.paintScene, model.predictMode );
    var billiardsSceneNode = new BilliardsSceneNode( this.layoutBounds, model.billiardsScene, model.predictMode );
    var appleSceneNode = new AppleSceneNode( this.layoutBounds, model.appleScene, model.predictMode );

    // Store by index for lookup by radio button index
    var sceneNodes = [ necklaceSceneNode, paintSceneNode, billiardsSceneNode, appleSceneNode ];

    var sceneParent = new Node();
    this.addChild( sceneParent );

    // When the scene radio button is selected, show the selected scene
    model.sceneProperty.link( function( scene ) {
      var sceneNode = _.find( sceneNodes, function( sceneNode ) {
        return sceneNode.scene === scene;
      } );
      sceneParent.children = [ sceneNode ];
    } );
  }

  proportionPlayground.register( 'ProportionScreenView', ProportionScreenView );

  return inherit( ScreenView, ProportionScreenView );
} );
