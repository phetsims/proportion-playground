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

  // images
  var redAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-red.png' );
  var greenAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-green.png' );

  function AppleSceneNode( layoutBounds, appleSceneModel ) {
    var redAppleGroupNode = new ControllableAppleGroupNode( appleSceneModel.redAppleGroup, redAppleImage, appleSceneModel.showCostPerAppleProperty );
    var greenAppleGroupNode = new ControllableAppleGroupNode( appleSceneModel.greenAppleGroup, greenAppleImage, appleSceneModel.showCostPerAppleProperty );
    var appleGraphNode = new AppleGraphNode( layoutBounds, appleSceneModel );
    var greenAppleImageNode = new Image( greenAppleImage, { scale: 0.2 } );
    var redAppleImageNode = new Image( redAppleImage, { scale: 0.2 } );
    var abSwitch = new ABSwitch( appleSceneModel.showBothAppleGroupsProperty,
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
      fontSize: 22
    } ), appleSceneModel.showCostPerAppleProperty ); // TODO: standardize and factor out font size
    Node.call( this, {
      children: [ redAppleGroupNode, greenAppleGroupNode, abSwitch, showCostPerAppleCheckBox, appleGraphNode ]
    } );
    this.necklaceSceneModel = appleSceneModel;

    appleSceneModel.showBothAppleGroupsProperty.link( function( showBothAppleGroups ) {
      greenAppleGroupNode.visible = showBothAppleGroups;

      // Controllable necklace nodes have x=0 at their center
      if ( showBothAppleGroups ) {
        redAppleGroupNode.x = layoutBounds.width * 1 / 3;
        greenAppleGroupNode.x = layoutBounds.width * 0.85; // TODO: Redo layout with less composition, more fine-grained control over position of components
      }
      else {
        redAppleGroupNode.x = layoutBounds.width / 2;
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 ); // TODO: Factor out
    showCostPerAppleCheckBox.leftBottom = layoutBounds.leftBottom.plusXY( 10, -10 ); // TODO: factor out insets
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( Node, AppleSceneNode, {} );
} );