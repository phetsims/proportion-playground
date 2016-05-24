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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/StaticNecklaceNode' );

  function NecklaceSceneNode( layoutBounds, necklaceSceneModel ) {
    var firstControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace1Model );
    var secondControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace2Model );
    var options = { scale: 0.3 };
    var abSwitch = new ABSwitch( necklaceSceneModel.showBothNecklacesProperty,
      false, new StaticNecklaceNode( 14, 7 ).mutate( options ),
      true, new HBox( {
        children: [
          new StaticNecklaceNode( 10, 5 ).mutate( options ), new StaticNecklaceNode( 14, 7 ).mutate( options ) ]
      } ) );

    Node.call( this, {
      children: [ firstControllableNecklaceNode, secondControllableNecklaceNode, abSwitch ]
    } );
    this.necklaceSceneModel = necklaceSceneModel;

    necklaceSceneModel.showBothNecklacesProperty.link( function( showBothNecklaces ) {
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
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 ); // TODO: Factor out
  }

  proportionPlayground.register( 'NecklaceSceneNode', NecklaceSceneNode );

  return inherit( Node, NecklaceSceneNode, {} );
} );