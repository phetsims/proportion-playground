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
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ControllableSplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/ControllableSplotchNode' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var GradientIndicatorNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/GradientIndicatorNode' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var SceneNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneNode' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );

  // strings
  var blackAndWhiteString = require( 'string!PROPORTION_PLAYGROUND/blackAndWhite' );

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

    // Create the left/right splotches and their NumberPickers
    var controllableSplotchNode1 = new ControllableSplotchNode( scene.leftSplotch, scene.grayscaleProperty, scene.revealProperty );
    var controllableSplotchNode2 = new ControllableSplotchNode( scene.rightSplotch, scene.grayscaleProperty, scene.revealProperty );

    // Create the ABSwitch that chooses 1 or 2 splotches
    var splotchNode = new SplotchNode( new Property( 1 ), new Property( 0 ), scene.grayscaleProperty, ICON_SCALE_OPTIONS );
    var abSwitch = new ABSwitch( scene.showBothProperty,
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
          new SplotchNode( new Property( 1 ), new Property( 0 ), scene.grayscaleProperty, ICON_SCALE_OPTIONS ),
          new SplotchNode( new Property( 1 ), new Property( 1 ), scene.grayscaleProperty, ICON_SCALE_OPTIONS )
        ]
      } )
    );

    SceneNode.call( this, scene, layoutBounds, {
      children: [ controllableSplotchNode1, controllableSplotchNode2, abSwitch ]
    } );

    // When the ABSwitch is toggled, show one/both of the splotches.
    scene.showBothProperty.link( function( showBoth ) {
      controllableSplotchNode2.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        controllableSplotchNode1.x = layoutBounds.width * 1 / 3;
        controllableSplotchNode2.x = layoutBounds.width * 2 / 3;

        self.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        controllableSplotchNode1.x = layoutBounds.width / 2;
        self.mutateRevealButton( { left: layoutBounds.centerX + 100 } );
      }
    } );
    this.moveABSwitchToBottomCenter( abSwitch );

    // CheckBox to choose between colorized or black and white
    var grayscaleCheckBox = new CheckBox( new Text( blackAndWhiteString, {
      maxWidth: 280, // ceiling value from ?stringTest=double for English
      fontSize: ProportionPlaygroundConstants.CONTROL_FONT_SIZE
    } ), scene.grayscaleProperty, {
      left: layoutBounds.left + 5,
      bottom: layoutBounds.bottom - 5
    } );
    this.addChild( grayscaleCheckBox );

    // The vertical gradient indicator
    var gradientIndicatorNode = new GradientIndicatorNode( layoutBounds, scene, scene.revealProperty );
    this.addChild( gradientIndicatorNode );
  }

  proportionPlayground.register( 'PaintSceneNode', PaintSceneNode );

  return inherit( SceneNode, PaintSceneNode );
} );
