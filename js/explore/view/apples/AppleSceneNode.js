// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ControllableAppleGroupNode = require( 'PROPORTION_PLAYGROUND/explore/view/apples/ControllableAppleGroupNode' );
  var AppleGraphNode = require( 'PROPORTION_PLAYGROUND/explore/view/apples/AppleGraphNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var ExploreSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/ExploreSceneNode' );

  // images
  var redAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-red.png' );
  var greenAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-green.png' );

  function AppleSceneNode( layoutBounds, appleSceneModel, predictMode ) {
    var appleSceneNode = this;
    var redAppleGroupNode = new ControllableAppleGroupNode( appleSceneModel.redAppleGroup, redAppleImage, appleSceneModel.showCostPerAppleProperty, appleSceneModel.revealProperty );
    var greenAppleGroupNode = new ControllableAppleGroupNode( appleSceneModel.greenAppleGroup, greenAppleImage, appleSceneModel.showCostPerAppleProperty, appleSceneModel.revealProperty );
    var appleGraphNode = new AppleGraphNode( layoutBounds, appleSceneModel, appleSceneModel.revealProperty );
    var greenAppleImageNode = new Image( greenAppleImage, { scale: 0.2 } );
    var redAppleImageNode = new Image( redAppleImage, { scale: 0.2 } );
    var abSwitch = new ABSwitch( appleSceneModel.showBothProperty,
      false, new HBox( {
        children: [
          new HStrut( greenAppleImageNode.width ),
          redAppleImageNode
        ]
      } ),
      true, new HBox( {
        children: [
          new Image( redAppleImage, { scale: 0.2 } ),
          greenAppleImageNode
        ]
      } )
    );
    var showCostPerAppleCheckBox = new CheckBox( new Text( 'Cost per apple', {
      fontSize: ProportionPlaygroundConstants.controlFontSize
    } ), appleSceneModel.showCostPerAppleProperty );
    ExploreSceneNode.call( this, layoutBounds, appleSceneModel, predictMode, 60, {
      children: [ redAppleGroupNode, greenAppleGroupNode, abSwitch, showCostPerAppleCheckBox, appleGraphNode ]
    } );
    this.necklaceSceneModel = appleSceneModel;

    appleSceneModel.showBothProperty.link( function( showBoth ) {
      greenAppleGroupNode.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        redAppleGroupNode.x = layoutBounds.width * 1 / 3;
        greenAppleGroupNode.x = layoutBounds.width * 0.85; // TODO: Redo layout with less composition, more fine-grained control over position of components

        appleSceneNode.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        redAppleGroupNode.x = layoutBounds.width / 2;

        appleSceneNode.mutateRevealButton( { centerX: layoutBounds.centerX + 200 } );
      }
    } );
    this.moveABSwitchToBottomCenter( abSwitch );
    var checkBoxInset = 10;
    showCostPerAppleCheckBox.leftBottom = layoutBounds.leftBottom.plusXY( checkBoxInset, -checkBoxInset );
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( ExploreSceneNode, AppleSceneNode );
} );