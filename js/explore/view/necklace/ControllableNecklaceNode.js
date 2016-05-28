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
  var NecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/NecklaceNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/SquareBeadNode' );

  // constants
  var numberPickerOptions = { scale: 2 };

  /**
   *
   * @param {NecklaceModel} necklaceModel - the model
   * @param {Property.<boolean>} revealProperty - true if the necklace should be shown.
   * @constructor
   */
  function ControllableNecklaceNode( necklaceModel, revealProperty ) {

    // NumberPickers to choose the number of each type of bead
    var roundBeadNumberPicker = new NumberPicker( necklaceModel.roundBeadCountProperty, new Property( necklaceModel.beadCountRange ), numberPickerOptions );
    var squareBeadNumberPicker = new NumberPicker( necklaceModel.squareBeadCountProperty, new Property( necklaceModel.beadCountRange ), numberPickerOptions );

    // The necklace itself
    var necklaceNode = new NecklaceNode( necklaceModel );

    /**
     * Adds an icon to a numberPicker
     * @param {Node} icon - the icon to show above the NumberPicker
     * @param {NumberPicker} numberPicker - the NumberPicker to be shown below the icon
     * @returns {VBox}
     */
    var toVBox = function( icon, numberPicker ) {
      return new VBox( {
        spacing: 10,
        children: [ icon, numberPicker ]
      } );
    };

    // Only show the necklace when it is revealed
    revealProperty.linkAttribute( necklaceNode, 'visible' );

    // Super call
    Node.call( this, {
      children: [
        necklaceNode,
        new HBox( {
          spacing: 15,
          y: 420,
          centerX: 0, // position around the origin
          children: [
            toVBox( new RoundBeadNode(), roundBeadNumberPicker ),
            toVBox( new SquareBeadNode(), squareBeadNumberPicker )
          ]
        } )
      ]
    } );
  }

  proportionPlayground.register( 'ControllableNecklaceNode', ControllableNecklaceNode );

  return inherit( Node, ControllableNecklaceNode );
} );