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
  var ControllableSplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/ControllableSplotchNode' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/SplotchNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var GradientIndicatorNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/GradientIndicatorNode' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var RevealButton = require( 'PROPORTION_PLAYGROUND/explore/view/RevealButton' );

  function PaintSceneNode( layoutBounds, paintSceneModel, predictMode ) {
    var controllableSplotchNode1 = new ControllableSplotchNode( paintSceneModel.splotch1Model, paintSceneModel.grayscaleProperty, paintSceneModel.revealProperty );
    var controllableSplotchNode2 = new ControllableSplotchNode( paintSceneModel.splotch2Model, paintSceneModel.grayscaleProperty, paintSceneModel.revealProperty );
    var abSwitch = new ABSwitch( paintSceneModel.showBothProperty,
      false, new HBox( {
        spacing: 10,
        children: [
          new SplotchNode( new Property( 0 ), new Property( 1 ), paintSceneModel.grayscaleProperty, {
            scale: 0.2,
            visible: false
          } ),// TODO: spacer instead
          new SplotchNode( new Property( 1 ), new Property( 0 ), paintSceneModel.grayscaleProperty, { scale: 0.2 } )
        ]
      } ), // TODO move options to parameter
      true, new HBox( {
        spacing: 10,
        children: [
          new SplotchNode( new Property( 1 ), new Property( 0 ), paintSceneModel.grayscaleProperty, { scale: 0.2 } ),
          new SplotchNode( new Property( 1 ), new Property( 1 ), paintSceneModel.grayscaleProperty, { scale: 0.2 } )
        ]
      } )
    );

    Node.call( this, {
      children: [ controllableSplotchNode1, controllableSplotchNode2, abSwitch ]
    } );

    if ( predictMode ) { // TODO: Factor out of scene nodes
      var revealButton = new RevealButton( paintSceneModel.revealProperty, {
        bottom: layoutBounds.maxY - 98
      } );
      this.addChild( revealButton );
    }
    this.necklaceSceneModel = paintSceneModel;

    paintSceneModel.showBothProperty.link( function( showBoth ) {
      controllableSplotchNode2.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        controllableSplotchNode1.x = layoutBounds.width * 1 / 3;
        controllableSplotchNode2.x = layoutBounds.width * 2 / 3;

        revealButton && revealButton.mutate( { centerX: layoutBounds.centerX } );
      }
      else {
        controllableSplotchNode1.x = layoutBounds.width / 2;
        revealButton && revealButton.mutate( { left: layoutBounds.centerX + 100 } );
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 );

    var grayscaleCheckBox = new CheckBox( new Text( 'Black & White', { fontSize: 22 } ), paintSceneModel.grayscaleProperty, {
      left: layoutBounds.left + 5,
      bottom: layoutBounds.bottom - 5
    } );
    this.addChild( grayscaleCheckBox );

    var gradientIndicatorNode = new GradientIndicatorNode( layoutBounds, paintSceneModel, paintSceneModel.revealProperty );
    this.addChild( gradientIndicatorNode );
  }

  proportionPlayground.register( 'PaintSceneNode', PaintSceneNode );

  return inherit( Node, PaintSceneNode );
} );