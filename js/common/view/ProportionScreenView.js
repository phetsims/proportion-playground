// Copyright 2016, University of Colorado Boulder

/**
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
   * @param {ProportionModel} exploreModel - the model
   * @constructor
   */
  function ProportionScreenView( exploreModel ) {

    ScreenView.call( this );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        exploreModel.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );

    // Radio buttons that choose between the scenes.
    this.sceneSelectionRadioButtonGroup = new SceneSelectionRadioButtonGroup( exploreModel.sceneProperty, {
      centerX: this.layoutBounds.centerX,
      top: 5
    } );
    this.addChild( this.sceneSelectionRadioButtonGroup );

    // One node for each scene.
    var necklaceSceneNode = new NecklaceSceneNode( this.layoutBounds, exploreModel.necklaceSceneModel, exploreModel.predictMode );
    var paintSceneNode = new PaintSceneNode( this.layoutBounds, exploreModel.paintSceneModel, exploreModel.predictMode );
    var billiardsSceneNode = new BilliardsSceneNode( this.layoutBounds, exploreModel.billiardsSceneModel, exploreModel.predictMode );
    var appleSceneNode = new AppleSceneNode( this.layoutBounds, exploreModel.appleSceneModel, exploreModel.predictMode );

    // Store by index for lookup by radio button index
    var sceneArray = [ necklaceSceneNode, paintSceneNode, billiardsSceneNode, appleSceneNode ];

    var sceneParent = new Node();
    this.addChild( sceneParent );

    // When the scene radio button is selected, show the selected scene
    exploreModel.sceneProperty.link( function( scene ) {
      var sceneNode = sceneArray[ scene ];
      sceneParent.children = [ sceneNode ];
    } );
  }

  proportionPlayground.register( 'ProportionScreenView', ProportionScreenView );

  return inherit( ScreenView, ProportionScreenView );
} );
