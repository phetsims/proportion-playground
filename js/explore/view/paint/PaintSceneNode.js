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
  var ControllableNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/ControllableNecklaceNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/SplotchNode' );

  function PaintSceneNode( layoutBounds, paintSceneModel ) {
    var firstControllableNecklaceNode = new ControllableNecklaceNode( paintSceneModel.necklace1Model );
    var secondControllableNecklaceNode = new ControllableNecklaceNode( paintSceneModel.necklace2Model );
    var createText = function( text ) {
      return new Text( text, { fontSize: 22 } );
    };
    var abSwitch = new ABSwitch( paintSceneModel.showBothNecklacesProperty, false, createText( 'one' ), true, createText( 'two' ) );

    Node.call( this, {
      children: [ firstControllableNecklaceNode, secondControllableNecklaceNode, abSwitch ]
    } );
    this.necklaceSceneModel = paintSceneModel;

    paintSceneModel.showBothNecklacesProperty.link( function( showBothNecklaces ) {
      secondControllableNecklaceNode.visible = showBothNecklaces;

      // Controllable necklace nodes have x=0 at their center
      if ( showBothNecklaces ) {
        firstControllableNecklaceNode.x = layoutBounds.width * 1 / 3;
        secondControllableNecklaceNode.x = layoutBounds.width * 2 / 3;
      }
      else {
        firstControllableNecklaceNode.x = layoutBounds.width / 2;
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom;
    this.addChild( new SplotchNode() );
  }

  proportionPlayground.register( 'PaintSceneNode', PaintSceneNode );

  return inherit( Node, PaintSceneNode, {} );
} );