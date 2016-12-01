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
  var Image = require( 'SCENERY/nodes/Image' );

  // images
  var paintBucketImage = require( 'image!PROPORTION_PLAYGROUND/paint-bucket.png' );
  var redAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-red.png' );

  /**
   *
   * @param {Property.<number> sceneProperty - property indicating the index of the selected scene.
   * @param {Object} [options] - node options
   * @constructor
   */
  function SceneSelectionRadioButtonGroup( sceneProperty, options ) {

    // Create one icon per scene
    var necklaceIcon = new StaticNecklaceNode( 14, 7, { scale: 0.2 } );
    var paintBucketIcon = new Image( paintBucketImage );
    var billiardTableIcon = new BilliardTableIcon( 120, 120 );
    var redAppleIcon = new Image( redAppleImage );

    // Make other icons same height as 1st icon
    paintBucketIcon.mutate( { scale: necklaceIcon.height / paintBucketIcon.height } );
    billiardTableIcon.mutate( { scale: necklaceIcon.height / billiardTableIcon.height } );
    redAppleIcon.mutate( { scale: necklaceIcon.height / redAppleIcon.height } );

    RadioButtonGroup.call( this, sceneProperty, [ {
      value: 0,
      node: necklaceIcon
    }, {
      value: 1,
      node: paintBucketIcon
    }, {
      value: 2,
      node: billiardTableIcon
    }, {
      value: 3,
      node: redAppleIcon
    } ], {
      orientation: 'horizontal',
      buttonContentXMargin: 20,
      buttonContentYMargin: 12,
      selectedStroke: 'black',
      selectedLineWidth: 2,
      baseColor: 'white'
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'SceneSelectionRadioButtonGroup', SceneSelectionRadioButtonGroup );

  return inherit( RadioButtonGroup, SceneSelectionRadioButtonGroup );
} );
