// Copyright 2016-2018, University of Colorado Boulder

/**
 * Node that displays everything for the Apple scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AppleGraphNode = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleGraphNode' );
  var AppleGroupControl = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleGroupControl' );
  var Checkbox = require( 'SUN/Checkbox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  var SceneNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneNode' );
  var Text = require( 'SCENERY/nodes/Text' );

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
    var leftAppleGroupControl = new AppleGroupControl( scene.leftAppleGroup, scene.showCostPerAppleProperty );
    var rightAppleGroupControl = new AppleGroupControl( scene.rightAppleGroup, scene.showCostPerAppleProperty );
    var appleGraphNode = new AppleGraphNode( scene, {
      y: 150
    } );

    // Create icons for the ABSwitch
    var appleImageNode = new Image( redAppleImage, { scale: 0.2 } );

    // Checkbox that shows the cost per apple in a price tag
    var showCostPerAppleCheckbox = new Checkbox( new Text( costPerAppleString, {
      maxWidth: 293, // ceiling value from ?stringTest=double for English
      font: ProportionPlaygroundConstants.CONTROL_FONT
    } ), scene.showCostPerAppleProperty );

    // Super call and add children
    SceneNode.call( this, scene, layoutBounds, {
      sceneIcon: new Image( redAppleImage, { scale: 0.25 } ),
      leftControl: leftAppleGroupControl,
      rightControl: rightAppleGroupControl,
      leftSwitchIcon: new Node( { children: [ appleImageNode ] } ),
      rightSwitchIcon: new HBox( {
        children: [
          new Node( { children: [ appleImageNode ] } ),
          new Node( { children: [ appleImageNode ] } )
        ]
      } )
    } );

    this.addChild( showCostPerAppleCheckbox );
    this.addChild( appleGraphNode );

    // When the "show both" ABSwitch is toggled, change which apple groups are displayed and update their layouts
    scene.showBothProperty.link( function( showBoth ) {
      if ( showBoth ) {
        leftAppleGroupControl.right = layoutBounds.width * 0.465;
        rightAppleGroupControl.left = layoutBounds.width * 0.535;
        appleGraphNode.x = layoutBounds.centerX;
      }
      else {
        leftAppleGroupControl.centerX = layoutBounds.width / 2;
        appleGraphNode.left = leftAppleGroupControl.right + layoutBounds.width * 0.05;
      }
      self.updateControlButton();
    } );

    // Price tag checkbox goes in the bottom left
    var checkboxInset = 10;
    showCostPerAppleCheckbox.leftBottom = layoutBounds.leftBottom.plusXY( checkboxInset, -checkboxInset );
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( SceneNode, AppleSceneNode );
} );
