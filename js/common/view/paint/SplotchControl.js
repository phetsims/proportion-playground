// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable SplotchNode with its associated NumberPickers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var ColorMap = require( 'PROPORTION_PLAYGROUND/common/view/paint/ColorMap' );

  // constants
  var NUMBER_PICKER_OPTIONS = { scale: 2 };

  /**
   *
   * @param {Splotch} splotch - the model
   * @param {Property.<boolean>} grayscaleProperty - property that indicates whether colors are shown as grayscale
   * @param {Property.<boolean>} revealProperty - indicates whether the billiards table should be shown
   * @constructor
   */
  function SplotchControl( splotch, grayscaleProperty, revealProperty ) {
    SceneRatioControl.call( this, splotch );

    /**
     * Auxiliary function that creates a NumberPicker for a given color
     * @param {Property.<number>} property - the number of times this color has been added to the model.
     * @param {Object} [options] - node options
     * @returns NumberPicker
     */
    var createNumberPicker = function( property, options ) {
      return new NumberPicker( property, new Property( splotch.colorCountRange ), _.extend( options, NUMBER_PICKER_OPTIONS ) );
    };

    // Left-side number pickers for blue/black
    var picker1Color = createNumberPicker( splotch.leftColorCountProperty, { color: ColorMap.getColor( 0 ) } );
    var picker1Black = createNumberPicker( splotch.leftColorCountProperty, { color: 'black' } );
    var leftColorCountPicker = new Node( {
      children: [
        picker1Color,
        picker1Black
      ]
    } );

    // Right-side number pickers for yellow/white
    var picker2Color = createNumberPicker( splotch.rightColorCountProperty, { color: ColorMap.getColor( 1 ) } );
    var picker2Black = createNumberPicker( splotch.rightColorCountProperty, { color: 'white' } );
    var rightColorCountPicker = new Node( {
      children: [
        picker2Color,
        picker2Black
      ]
    } );

    // When "Black & White" option is toggled, show as grayscale
    grayscaleProperty.link( function( grayscale ) {
      picker1Black.visible = grayscale;
      picker2Black.visible = grayscale;
      picker1Color.visible = !grayscale;
      picker2Color.visible = !grayscale;
    } );

    // Wrap in a node so the visible flags don't collide
    var splotchNode = new Node( { children: [ new SplotchNode( splotch, grayscaleProperty ) ] } );
    revealProperty.linkAttribute( splotchNode, 'visible' );

    this.children = [
      splotchNode,
      new HBox( {
        spacing: 10,
        y: 450,
        centerX: 0, // position around the origin
        children: [
          leftColorCountPicker,
          rightColorCountPicker
        ]
      } )
    ];
  }

  proportionPlayground.register( 'SplotchControl', SplotchControl );

  return inherit( SceneRatioControl, SplotchControl );
} );
