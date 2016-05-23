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
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );

  // images
  var redAppleImage = require( 'image!PROPORTION_PLAYGROUND/apple-red.png' );
  var greenAppleImage = require( 'image!PROPORTION_PLAYGROUND/apple-green.png' );

  function AppleSceneNode( layoutBounds, appleSceneModel ) {
    var redAppleGroupNode = new ControllableAppleGroupNode( appleSceneModel.redAppleGroup, redAppleImage );
    var greenAppleGroupNode = new ControllableAppleGroupNode( appleSceneModel.greenAppleGroup, greenAppleImage );
    var createText = function( text ) {
      return new Text( text, { fontSize: 22 } );
    };
    var abSwitch = new ABSwitch( appleSceneModel.showBothAppleGroupsProperty, false, createText( 'one' ), true, createText( 'two' ) );

    Node.call( this, {
      children: [ redAppleGroupNode, greenAppleGroupNode, abSwitch ]
    } );
    this.necklaceSceneModel = appleSceneModel;

    appleSceneModel.showBothAppleGroupsProperty.link( function( showBothAppleGroups ) {
      greenAppleGroupNode.visible = showBothAppleGroups;

      // Controllable necklace nodes have x=0 at their center
      if ( showBothAppleGroups ) {
        redAppleGroupNode.x = layoutBounds.width * 1 / 3;
        greenAppleGroupNode.x = layoutBounds.width * 4 / 5; // TODO: Redo layout with less composition, more fine-grained control over position of components
      }
      else {
        redAppleGroupNode.x = layoutBounds.width / 2;
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 ); // TODO: Factor out
  }

  proportionPlayground.register( 'AppleSceneNode', AppleSceneNode );

  return inherit( Node, AppleSceneNode, {} );
} );