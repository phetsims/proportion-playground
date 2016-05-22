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
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/SplotchNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  function BilliardsTableNodeWithSpinners( billiardsTableModel ) {
    var numberPickerOptions = { scale: 2 };
    var lengthNumberPicker = new NumberPicker( billiardsTableModel.lengthProperty, new Property( billiardsTableModel.range ), numberPickerOptions );
    var widthNumberPicker = new NumberPicker( billiardsTableModel.widthProperty, new Property( billiardsTableModel.range ), numberPickerOptions );

    var toVBox = function( label, node ) {
      return new VBox( {
        spacing: 15, children: [
          new Text( label, { fontSize: 16 } ),
          node
        ]
      } );
    };
    Node.call( this, {
      children: [
        // splotchNode,
        new VBox( {
          spacing: 10,
          y: 200,
          centerX: 0, // position around the origin
          children: [
            toVBox( 'length', lengthNumberPicker ),
            toVBox( 'width', widthNumberPicker )
          ]
        } )
      ]
    } );
  }

  proportionPlayground.register( 'BilliardsTableNodeWithSpinners', BilliardsTableNodeWithSpinners );

  return inherit( Node, BilliardsTableNodeWithSpinners, {} );
} );