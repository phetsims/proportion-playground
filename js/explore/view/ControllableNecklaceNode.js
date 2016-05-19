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
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );

  function ControllableNecklaceNode( necklaceModel ) {
    var numberPickerOptions = { scale: 2 };
    var roundBeadNumberPicker = new NumberPicker( necklaceModel.roundBeadCountProperty, new Property( necklaceModel.roundBeadRange ), numberPickerOptions );
    var squareBeadNumberPicker = new NumberPicker( necklaceModel.squareBeadCountProperty, new Property( necklaceModel.squareBeadRange ), numberPickerOptions );
    Node.call( this, {
      children: [
        new HBox( {
          spacing: 10,
          y: 450,
          centerX: 0, // position around the origin
          children: [
            roundBeadNumberPicker,
            squareBeadNumberPicker
          ]
        } )
      ]
    } );
  }

  proportionPlayground.register( 'ControllableNecklaceNode', ControllableNecklaceNode );

  return inherit( Node, ControllableNecklaceNode, {} );
} );