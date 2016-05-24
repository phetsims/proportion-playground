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
  var AppleGroupNode = require( 'PROPORTION_PLAYGROUND/explore/view/apples/AppleGroupNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );

  function ControllableAppleGroupNode( appleGroupModel, appleImage, showCostPerAppleProperty ) {
    var numberPickerOptions = { scale: 2 };
    var totalCostNumberPicker = new NumberPicker( appleGroupModel.totalCostProperty, new Property( appleGroupModel.totalCostRange ), numberPickerOptions );
    var numberOfApplesNumberPicker = new NumberPicker( appleGroupModel.numberOfApplesProperty, new Property( appleGroupModel.numberOfApplesRange ), numberPickerOptions );
    var appleGroupNode = new AppleGroupNode( appleGroupModel, appleImage, showCostPerAppleProperty );

    function toVBox( numberPicker, label ) {
      return new VBox( {
        spacing: 10,
        children: [
          new Text( label, { fontSize: 20 } ),
          numberPicker
        ]
      } );
    }

    Node.call( this, {
      children: [
        appleGroupNode,
        new HBox( {
          spacing: 150, // TODO: this is hack-ish, a more general layout would help
          y: 430,
          centerX: -140, // position one spinner under coin stack, other under apple stack
          children: [
            toVBox( totalCostNumberPicker, 'Total Cost' ),
            toVBox( numberOfApplesNumberPicker, 'Apples' )
          ]
        } )
      ]
    } );
  }

  proportionPlayground.register( 'ControllableAppleGroupNode', ControllableAppleGroupNode );

  return inherit( Node, ControllableAppleGroupNode, {} );
} );