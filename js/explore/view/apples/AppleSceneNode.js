// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays everything for the Apple scene
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

  // strings
  var costPerAppleString = require( 'string!PROPORTION_PLAYGROUND/costPerApple' );

  // constants
  var CHECK_BOX_INSET = 10;
  var ICON_SCALE_OPTIONS = { scale: 0.2 };

  /**
   *
   * @param {Bounds2} layoutBounds - the box within which to lay out all components
   * @param {AppleSceneModel} appleSceneModel - the model
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function AppleSceneNode( layoutBounds, appleSceneModel, predictMode ) {
    var self = this;

    // Create child nodes to be displayed
    var redAppleGroupNode = new ControllableAppleGroupNode( appleSceneModel.redAppleGroup, redAppleImage, appleSceneModel.showCostPerAppleProperty, appleSceneModel.revealProperty );
    var greenAppleGroupNode = new ControllableAppleGroupNode( appleSceneModel.greenAppleGroup, greenAppleImage, appleSceneModel.showCostPerAppleProperty, appleSceneModel.revealProperty );
    var appleGraphNode = new AppleGraphNode( layoutBounds, appleSceneModel, appleSceneModel.revealProperty );

    // Create icons for the ABSwitch
    var greenAppleImageNode = new Image( greenAppleImage, ICON_SCALE_OPTIONS );
    var redAppleImageNode = new Image( redAppleImage, ICON_SCALE_OPTIONS );

    // Create the switch that toggles between showing 1 and 2 groups
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

    // Check box that shows the cost per apple in a price tag
    var showCostPerAppleCheckBox = new CheckBox( new Text( costPerAppleString, {
      maxWidth: 293, // ceiling value from ?stringTest=double for English
      fontSize: ProportionPlaygroundConstants.CONTROL_FONT_SIZE
    } ), appleSceneModel.showCostPerAppleProperty );

    // Super call and add children
    ExploreSceneNode.call( this, layoutBounds, appleSceneModel.revealProperty, predictMode, 60, {
      children: [ redAppleGroupNode, greenAppleGroupNode, abSwitch, showCostPerAppleCheckBox, appleGraphNode ]
    } );

    // When the "show both" ABSwitch is toggled, change which apple groups are displayed and update their layouts
    appleSceneModel.showBothProperty.link( function( showBoth ) {
      greenAppleGroupNode.visible = showBoth;

      if ( showBoth ) {
        redAppleGroupNode.x = layoutBounds.width * 1 / 3;
        greenAppleGroupNode.x = layoutBounds.width * 0.85;

        self.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        redAppleGroupNode.x = layoutBounds.width / 2;

        self.mutateRevealButton( { centerX: layoutBounds.centerX + 200 } );
      }
    } );

    // Align the ABSwitch at the bottom center of the screen
    this.moveABSwitchToBottomCenter( abSwitch );

    // Price tag checkbox goes in the bottom left
    showCostPerAppleCheckBox.leftBottom = layoutBounds.leftBottom.plusXY( CHECK_BOX_INSET, -CHECK_BOX_INSET );
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( ExploreSceneNode, AppleSceneNode );
} );
