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
  var ControllableSplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/ControllableSplotchNode' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/SplotchNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var GradientIndicatorNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/GradientIndicatorNode' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var ExploreSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/ExploreSceneNode' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );

  function PaintSceneNode( layoutBounds, paintSceneModel, predictMode ) {
    var paintSceneNode = this;
    var controllableSplotchNode1 = new ControllableSplotchNode( paintSceneModel.splotch1Model, paintSceneModel.grayscaleProperty, paintSceneModel.revealProperty );
    var controllableSplotchNode2 = new ControllableSplotchNode( paintSceneModel.splotch2Model, paintSceneModel.grayscaleProperty, paintSceneModel.revealProperty );
    var scaleOptions = { scale: 0.2 };
    var splotchNode = new SplotchNode( new Property( 1 ), new Property( 0 ), paintSceneModel.grayscaleProperty, scaleOptions );
    var abSwitch = new ABSwitch( paintSceneModel.showBothProperty,
      false, new HBox( {
        spacing: 10,
        children: [
          new HStrut( splotchNode.width ), // The spacer makes it easy to keep the ABSwitch centered
          splotchNode
        ]
      } ),
      true, new HBox( {
        spacing: 10,
        children: [
          new SplotchNode( new Property( 1 ), new Property( 0 ), paintSceneModel.grayscaleProperty, scaleOptions ),
          new SplotchNode( new Property( 1 ), new Property( 1 ), paintSceneModel.grayscaleProperty, scaleOptions )
        ]
      } )
    );

    ExploreSceneNode.call( this, layoutBounds, paintSceneModel, predictMode, 98, {
      children: [ controllableSplotchNode1, controllableSplotchNode2, abSwitch ]
    } );

    this.necklaceSceneModel = paintSceneModel;

    paintSceneModel.showBothProperty.link( function( showBoth ) {
      controllableSplotchNode2.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        controllableSplotchNode1.x = layoutBounds.width * 1 / 3;
        controllableSplotchNode2.x = layoutBounds.width * 2 / 3;

        paintSceneNode.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        controllableSplotchNode1.x = layoutBounds.width / 2;
        paintSceneNode.mutateRevealButton( { left: layoutBounds.centerX + 100 } );
      }
    } );
    this.moveABSwitchToBottomCenter( abSwitch );

    var grayscaleCheckBox = new CheckBox( new Text( 'Black & White', { fontSize: ProportionPlaygroundConstants.controlFontSize } ), paintSceneModel.grayscaleProperty, {
      left: layoutBounds.left + 5,
      bottom: layoutBounds.bottom - 5
    } );
    this.addChild( grayscaleCheckBox );

    var gradientIndicatorNode = new GradientIndicatorNode( layoutBounds, paintSceneModel, paintSceneModel.revealProperty );
    this.addChild( gradientIndicatorNode );
  }

  proportionPlayground.register( 'PaintSceneNode', PaintSceneNode );

  return inherit( ExploreSceneNode, PaintSceneNode );
} );