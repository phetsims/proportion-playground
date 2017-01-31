// Copyright 2016, University of Colorado Boulder

/**
 * This radio button group allows the user to select between the different scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/StaticNecklaceNode' );
  var BilliardTableIcon = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardTableIcon' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );

  // images
  var paintSceneImage = require( 'mipmap!PROPORTION_PLAYGROUND/paint-scene.png' );
  var redAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-red.png' );

  /**
   *
   * @param {ProportionModel} model
   * @param {Object} [options] - node options
   * @constructor
   */
  function SceneSelectionControls( model, options ) {
    Node.call( this );

    // Create one icon per scene
    var necklaceIcon = new StaticNecklaceNode( 14, 7, { scale: 0.2 } );
    var paintSceneIcon = new Image( paintSceneImage );
    var billiardTableIcon = new BilliardTableIcon( 120, 120 );
    var redAppleIcon = new Image( redAppleImage );

    // Make other icons same height as 1st icon
    paintSceneIcon.mutate( { scale: necklaceIcon.height / paintSceneIcon.height } );
    billiardTableIcon.mutate( { scale: necklaceIcon.height / billiardTableIcon.height } );
    redAppleIcon.mutate( { scale: necklaceIcon.height / redAppleIcon.height } );

    this.addChild( new MutableOptionsNode( RadioButtonGroup, [ model.sceneProperty, [ {
      value: model.necklaceScene,
      node: necklaceIcon
    }, {
      value: model.paintScene,
      node: paintSceneIcon
    }, {
      value: model.billiardsScene,
      node: billiardTableIcon
    }, {
      value: model.appleScene,
      node: redAppleIcon
    } ] ], {
      orientation: 'horizontal',
      buttonContentXMargin: 20,
      buttonContentYMargin: 12,
      selectedLineWidth: 2
    }, {
      selectedStroke: ProportionPlaygroundColorProfile.sceneSelectionBorderProperty,
      baseColor: ProportionPlaygroundColorProfile.sceneSelectionBackgroundProperty
    } ) );
    this.mutate( options );
  }

  proportionPlayground.register( 'SceneSelectionControls', SceneSelectionControls );

  return inherit( Node, SceneSelectionControls );
} );
