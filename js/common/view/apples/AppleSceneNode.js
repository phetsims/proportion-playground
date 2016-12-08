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
  var AppleGroupControl = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleGroupControl' );
  var AppleGraphNode = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleGraphNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HBox = require( 'SCENERY/nodes/HBox' );
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
   */
  function AppleSceneNode( scene, layoutBounds ) {
    var self = this;

    // Create child nodes to be displayed
    //TODO: simplify what is passed?
    var redAppleGroupNode = new AppleGroupControl( scene.redAppleGroup, redAppleImage, scene.showCostPerAppleProperty, scene.revealProperty );
    var greenAppleGroupNode = new AppleGroupControl( scene.greenAppleGroup, greenAppleImage, scene.showCostPerAppleProperty, scene.revealProperty );
    var appleGraphNode = new AppleGraphNode( scene, {
      centerY: 250
    } );

    // Create icons for the ABSwitch
    var iconScaleOptions = { scale: 0.2 };
    var greenAppleImageNode = new Image( greenAppleImage, iconScaleOptions );
    var redAppleImageNode = new Image( redAppleImage, iconScaleOptions );

    // Check box that shows the cost per apple in a price tag
    var showCostPerAppleCheckBox = new CheckBox( new Text( costPerAppleString, {
      maxWidth: 293, // ceiling value from ?stringTest=double for English
      fontSize: ProportionPlaygroundConstants.CONTROL_FONT_SIZE
    } ), scene.showCostPerAppleProperty );

    // Super call and add children
    SceneNode.call( this, scene, layoutBounds, {
      leftSwitchIcon: new Node( { children: [ redAppleImageNode ] } ),
      rightSwitchIcon: new HBox( { children: [
        new Node( { children: [ redAppleImageNode ] } ),
        new Node( { children: [ greenAppleImageNode ] } )
      ] } ),
      children: [ redAppleGroupNode, greenAppleGroupNode, showCostPerAppleCheckBox, appleGraphNode ]
    } );

    // When the "show both" ABSwitch is toggled, change which apple groups are displayed and update their layouts
    scene.showBothProperty.link( function( showBoth ) {
      greenAppleGroupNode.visible = showBoth;

      if ( showBoth ) {
        redAppleGroupNode.right = layoutBounds.width * 0.45;
        greenAppleGroupNode.left = layoutBounds.width * 0.55;
        appleGraphNode.x = layoutBounds.centerX;

        self.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        redAppleGroupNode.centerX = layoutBounds.width / 2;
        appleGraphNode.left = redAppleGroupNode.right + layoutBounds.width * 0.05;

        self.mutateRevealButton( { centerX: layoutBounds.centerX + 200 } );
      }
    } );

    redAppleGroupNode.bottom = layoutBounds.bottom - 60;
    greenAppleGroupNode.bottom = layoutBounds.bottom - 60;

    // Price tag checkbox goes in the bottom left
    var checkBoxInset = 10;
    showCostPerAppleCheckBox.leftBottom = layoutBounds.leftBottom.plusXY( checkBoxInset, -checkBoxInset );
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( SceneNode, AppleSceneNode );
} );
