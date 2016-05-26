// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with its controls.
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

  function ControllableNecklaceNode( necklaceModel, revealProperty ) {
    var numberPickerOptions = { scale: 2 };
    var roundBeadNumberPicker = new NumberPicker( necklaceModel.roundBeadCountProperty, new Property( necklaceModel.beadCountRange ), numberPickerOptions );
    var squareBeadNumberPicker = new NumberPicker( necklaceModel.squareBeadCountProperty, new Property( necklaceModel.beadCountRange ), numberPickerOptions );
    var necklaceNode = new NecklaceNode( necklaceModel );
    var toVBox = function( icon, numberPicker ) {
      return new VBox( {
        spacing: 10,
        children: [ icon, numberPicker ]
      } );
    };
    revealProperty.linkAttribute( necklaceNode, 'visible' );
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