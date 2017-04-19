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

  // strings
  var costPerAppleString = require( 'string!PROPORTION_PLAYGROUND/costPerApple' );

  /**
   * @constructor
   * @extends {SceneNode}
   *
   * @param {AppleScene} scene - the model
   * @param {Bounds2} layoutBounds - the box within which to lay out all components
   */
  function AppleSceneNode( scene, layoutBounds ) {
    var self = this;

    // Create child nodes to be displayed
    //TODO: simplify what is passed?
    var redAppleGroupControl = new AppleGroupControl( scene.redAppleGroup, scene.showCostPerAppleProperty, scene.revealProperty );
    var greenAppleGroupControl = new AppleGroupControl( scene.greenAppleGroup, scene.showCostPerAppleProperty, scene.revealProperty );
    var appleGraphNode = new AppleGraphNode( scene, {
      y: 150
    } );

    // Create icons for the ABSwitch
    var appleImageNode = new Image( redAppleImage, { scale: 0.2 } );

    // Check box that shows the cost per apple in a price tag
    var showCostPerAppleCheckBox = new CheckBox( new Text( costPerAppleString, {
      maxWidth: 293, // ceiling value from ?stringTest=double for English
      font: ProportionPlaygroundConstants.CONTROL_FONT
    } ), scene.showCostPerAppleProperty );

    // Super call and add children
    SceneNode.call( this, scene, layoutBounds, {
      sceneIcon: new Image( redAppleImage, { scale: 0.25 } ),
      leftControl: redAppleGroupControl,
      rightControl: greenAppleGroupControl,
      leftSwitchIcon: new Node( { children: [ appleImageNode ] } ),
      rightSwitchIcon: new HBox( { children: [
        new Node( { children: [ appleImageNode ] } ),
        new Node( { children: [ appleImageNode ] } )
      ] } )
    } );

    this.addChild( showCostPerAppleCheckBox );
    this.addChild( appleGraphNode );

    // When the "show both" ABSwitch is toggled, change which apple groups are displayed and update their layouts
    scene.showBothProperty.link( function( showBoth ) {
      if ( showBoth ) {
        redAppleGroupControl.right = layoutBounds.width * 0.465;
        greenAppleGroupControl.left = layoutBounds.width * 0.535;
        appleGraphNode.x = layoutBounds.centerX;
      }
      else {
        redAppleGroupControl.centerX = layoutBounds.width / 2;
        appleGraphNode.left = redAppleGroupControl.right + layoutBounds.width * 0.05;
      }
      self.updateControlButton();
    } );

    // Price tag checkbox goes in the bottom left
    var checkBoxInset = 10;
    showCostPerAppleCheckBox.leftBottom = layoutBounds.leftBottom.plusXY( checkBoxInset, -checkBoxInset );
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( SceneNode, AppleSceneNode );
} );
