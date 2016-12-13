// Copyright 2016, University of Colorado Boulder

/**
 * Node that shows everything for a paint scene (including NumberPickers and paint splotches and gradient).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchControl = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchControl' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var Splotch = require( 'PROPORTION_PLAYGROUND/common/model/paint/Splotch' );
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );
  var GradientIndicatorNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/GradientIndicatorNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var SceneNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneNode' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  var GradientNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/GradientNode' );

  // constants
  var ICON_SCALE_OPTIONS = { scale: 0.7 };

  /**
   *
   * @param {PaintScene} scene
   * @param {Bounds2} layoutBounds - bounds withing which the scene will be shown
   * @constructor
   */
  function PaintSceneNode( scene, layoutBounds ) {
    var self = this;

    var blueSplotch = new Splotch( new BooleanProperty( true ), new BooleanProperty( true ) );
    blueSplotch.leftColorCountProperty.value = 1;
    var greenSplotch = new Splotch( new BooleanProperty( true ), new BooleanProperty( true ) );
    greenSplotch.leftColorCountProperty.value = 1;
    greenSplotch.rightColorCountProperty.value = 1;

    // Create the left/right splotches and their NumberPickers
    var leftSplotchControl = new SplotchControl( scene.leftSplotch, scene.paintChoiceProperty, scene.revealProperty );
    var rightSplotchControl = new SplotchControl( scene.rightSplotch, scene.paintChoiceProperty, scene.revealProperty );

    // Create the ABSwitch that chooses 1 or 2 splotches
    var splotchNode = new SplotchNode( blueSplotch, scene.paintChoiceProperty, ICON_SCALE_OPTIONS );

    SceneNode.call( this, scene, layoutBounds, {
      leftControl: leftSplotchControl,
      rightControl: rightSplotchControl,
      leftSwitchIcon: new HBox( {
        spacing: 10,
        children: [
          new HStrut( splotchNode.width ), // The spacer makes it easy to keep the ABSwitch centered
          splotchNode
        ]
      } ),
      rightSwitchIcon: new HBox( {
        spacing: 10,
        children: [
          new SplotchNode( blueSplotch, scene.paintChoiceProperty, ICON_SCALE_OPTIONS ),
          new SplotchNode( greenSplotch, scene.paintChoiceProperty, ICON_SCALE_OPTIONS )
        ]
      } )
    } );

    // When the ABSwitch is toggled, show one/both of the splotches.
    scene.showBothProperty.link( function( showBoth ) {
      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        var ratio = 4 / 13;
        leftSplotchControl.x = layoutBounds.width * ratio;
        rightSplotchControl.x = layoutBounds.width * ( 1 - ratio );
      }
      else {
        leftSplotchControl.x = layoutBounds.width / 2;
      }
      self.updateRevealButton();
    } );

    this.addChild( new VerticalAquaRadioButtonGroup(
      PaintChoice.CHOICES.map( function( paintChoice ) {
        var gradientNode = new GradientNode( 25, 220, paintChoice.getColor.bind( paintChoice ), {
          rotation: -Math.PI / 2, scale: 0.5
        } );
        return {
          node: new AlignBox( gradientNode, { leftMargin: 5 } ),
          property: scene.paintChoiceProperty,
          value: paintChoice
        };
      } ), {
      // options
      spacing: 10,
      left: layoutBounds.left + 15,
      bottom: layoutBounds.bottom - 15
    } ) );

    // The vertical gradient indicator
    var gradientIndicatorNode = new GradientIndicatorNode( layoutBounds, scene, scene.revealProperty );
    this.addChild( gradientIndicatorNode );
  }

  proportionPlayground.register( 'PaintSceneNode', PaintSceneNode );

  return inherit( SceneNode, PaintSceneNode );
} );
