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
  var Node = require( 'SCENERY/nodes/Node' );
  var ControllableAppleGroupNode = require( 'PROPORTION_PLAYGROUND/explore/view/apples/ControllableAppleGroupNode' );
  var AppleGraphNode = require( 'PROPORTION_PLAYGROUND/explore/view/apples/AppleGraphNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var RevealButton = require( 'PROPORTION_PLAYGROUND/explore/view/RevealButton' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // images
  var redAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-red.png' );
  var greenAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-green.png' );

  function AppleSceneNode( layoutBounds, appleSceneModel, predictMode ) {
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
    } ), appleSceneModel.showCostPerAppleProperty ); // TODO: standardize and factor out font size
    Node.call( this, {
      children: [ redAppleGroupNode, greenAppleGroupNode, abSwitch, showCostPerAppleCheckBox, appleGraphNode ]
    } );
    this.necklaceSceneModel = appleSceneModel;

    if ( predictMode ) { // TODO: Factor out of scene nodes
      var revealButton = new RevealButton( appleSceneModel.revealProperty, {
        bottom: layoutBounds.maxY - 60
      } );
      this.addChild( revealButton );
    }

    appleSceneModel.showBothProperty.link( function( showBoth ) {
      greenAppleGroupNode.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        redAppleGroupNode.x = layoutBounds.width * 1 / 3;
        greenAppleGroupNode.x = layoutBounds.width * 0.85; // TODO: Redo layout with less composition, more fine-grained control over position of components

        revealButton && revealButton.mutate( { centerX: layoutBounds.centerX } );
      }
      else {
        redAppleGroupNode.x = layoutBounds.width / 2;

        revealButton && revealButton.mutate( { centerX: layoutBounds.centerX + 200 } );
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 ); // TODO: Factor out
    showCostPerAppleCheckBox.leftBottom = layoutBounds.leftBottom.plusXY( 10, -10 ); // TODO: factor out insets
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( Node, AppleSceneNode );
} );