// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with NumberPickers to change the amount of each type of bead.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/SquareBeadNode' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // constants
  var PINK = ProportionPlaygroundConstants.BEADS_PINK;
  var BLUE = ProportionPlaygroundConstants.BEADS_BLUE;

  /**
   *
   * @param {Necklace} necklace - the model
   * @param {Property.<boolean>} revealProperty - true if the necklace should be shown.
   * @constructor
   */
  function NecklaceControl( necklace, revealProperty ) {
    SceneRatioControl.call( this, necklace, {
      leftPickerColor: PINK,
      leftPickerLabel: new RoundBeadNode(),
      rightPickerColor: BLUE,
      rightPickerLabel: new SquareBeadNode()
    } );

    // The necklace itself
    var necklaceNode = new NecklaceNode( necklace );

    this.children = [
      necklaceNode,
      new HBox( {
        spacing: 15,
        y: 420,
        centerX: 0, // position around the origin
        children: [
          this.leftPicker,
          this.rightPicker
        ]
      } )
    ];
  }

  proportionPlayground.register( 'NecklaceControl', NecklaceControl );

  return inherit( SceneRatioControl, NecklaceControl );
} );
