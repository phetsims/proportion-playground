// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays everything for the Apple scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ControllableAppleGroupNode = require( 'PROPORTION_PLAYGROUND/common/view/apples/ControllableAppleGroupNode' );
  var AppleGraphNode = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleGraphNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var SceneNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneNode' );

  // images
  var redAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-red.png' );
  var greenAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-green.png' );

  // strings
  var costPerAppleString = require( 'string!PROPORTION_PLAYGROUND/costPerApple' );

  /**
   * @constructor
   *
   * @param {AppleScene} scene - the model
   * @param {Bounds2} layoutBounds - the box within which to lay out all components
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function AppleSceneNode( scene, layoutBounds, predictMode ) {
    var self = this;

    // Create child nodes to be displayed
    var redAppleGroupNode = new ControllableAppleGroupNode( scene.redAppleGroup, redAppleImage, scene.showCostPerAppleProperty, scene.revealProperty );
    var greenAppleGroupNode = new ControllableAppleGroupNode( scene.greenAppleGroup, greenAppleImage, scene.showCostPerAppleProperty, scene.revealProperty );
    var appleGraphNode = new AppleGraphNode( scene, {
      centerY: 250
    } );

    // Create icons for the ABSwitch
    var iconScaleOptions = { scale: 0.2 };
    var greenAppleImageNode = new Image( greenAppleImage, iconScaleOptions );
    var redAppleImageNode = new Image( redAppleImage, iconScaleOptions );

    // Create the switch that toggles between showing 1 and 2 groups
    var abSwitch = new ABSwitch( scene.showBothProperty,
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
    } ), scene.showCostPerAppleProperty );

    // Super call and add children
    SceneNode.call( this, scene, layoutBounds, predictMode, 60, {
      children: [ redAppleGroupNode, greenAppleGroupNode, abSwitch, showCostPerAppleCheckBox, appleGraphNode ]
    } );

    // When the "show both" ABSwitch is toggled, change which apple groups are displayed and update their layouts
    scene.showBothProperty.link( function( showBoth ) {
      greenAppleGroupNode.visible = showBoth;

      if ( showBoth ) {
        redAppleGroupNode.x = layoutBounds.width * 1 / 3;
        greenAppleGroupNode.x = layoutBounds.width * 0.85;
        appleGraphNode.x = layoutBounds.centerX;

        self.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        redAppleGroupNode.x = layoutBounds.width / 2;
        appleGraphNode.x = layoutBounds.right * 0.7;

        self.mutateRevealButton( { centerX: layoutBounds.centerX + 200 } );
      }
    } );

    // Align the ABSwitch at the bottom center of the screen
    this.moveABSwitchToBottomCenter( abSwitch );

    // Price tag checkbox goes in the bottom left
    var checkBoxInset = 10;
    showCostPerAppleCheckBox.leftBottom = layoutBounds.leftBottom.plusXY( checkBoxInset, -checkBoxInset );
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( SceneNode, AppleSceneNode );
} );
