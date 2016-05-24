// Copyright 2016, University of Colorado Boulder

/**
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
  var SceneSelectionRadioButtonGroup = require( 'PROPORTION_PLAYGROUND/explore/view/SceneSelectionRadioButtonGroup' );
  var NecklaceSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/NecklaceSceneNode' );
  var PaintSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/PaintSceneNode' );
  var BilliardsSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/billiards/BilliardsSceneNode' );
  var AppleSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/apples/AppleSceneNode' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {ExploreModel} exploreModel
   * @constructor
   */
  function ExploreScreenView( exploreModel ) {

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

    this.sceneSelectionRadioButtonGroup = new SceneSelectionRadioButtonGroup( exploreModel.sceneProperty, {
      centerX: this.layoutBounds.centerX,
      top: 5
    } );
    this.addChild( this.sceneSelectionRadioButtonGroup );

    var necklaceSceneNode = new NecklaceSceneNode( this.layoutBounds, exploreModel.necklaceSceneModel, exploreModel.predictMode );
    var paintSceneNode = new PaintSceneNode( this.layoutBounds, exploreModel.paintSceneModel, exploreModel.predictMode );
    var billiardsSceneNode = new BilliardsSceneNode( this.layoutBounds, exploreModel.billiardsSceneModel, exploreModel.predictMode );
    var appleSceneNode = new AppleSceneNode( this.layoutBounds, exploreModel.appleSceneModel, exploreModel.predictMode );

    var sceneParent = new Node();
    this.addChild( sceneParent );

    exploreModel.sceneProperty.link( function( scene ) {

      // TODO: indices seem brittle
      var sceneNode = scene === 0 ? necklaceSceneNode :
                      scene === 1 ? paintSceneNode :
                      scene === 2 ? billiardsSceneNode :
                      scene === 3 ? appleSceneNode :
                      new Node();
      sceneParent.children = [ sceneNode ];
    } );
  }

  proportionPlayground.register( 'ExploreScreenView', ExploreScreenView );

  return inherit( ScreenView, ExploreScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );