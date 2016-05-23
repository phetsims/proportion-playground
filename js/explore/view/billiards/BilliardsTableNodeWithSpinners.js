// Copyright 2016, University of Colorado Boulder

/**
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
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/explore/view/billiards/BilliardsTableNode' );
  var Vector2 = require( 'DOT/Vector2' );

  function BilliardsTableNodeWithSpinners( layoutBounds, billiardsTableModel, options ) {
    options = _.extend( { side: 'left' }, options );
    var numberPickerOptions = { scale: 2 };
    var lengthNumberPicker = new NumberPicker( billiardsTableModel.lengthProperty, new Property( billiardsTableModel.range ), numberPickerOptions );
    var widthNumberPicker = new NumberPicker( billiardsTableModel.widthProperty, new Property( billiardsTableModel.range ), numberPickerOptions );

    var billiardsTableNode = new BilliardsTableNode( new Vector2( 280, layoutBounds.centerY ), billiardsTableModel );
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
          centerX: options.side === 'left' ? 0 : 450, // position around the origin
          children: [
            toVBox( 'length', lengthNumberPicker ),
            toVBox( 'width', widthNumberPicker )
          ]
        } ),
        billiardsTableNode.mutate( { x: options.side === 'left' ? 0 : -100 } )
      ]
    } );

    // Show the controls on the right hand side, so the table can be on the right side of the screen
    if ( options.side === 'right' ) {

    }
  }

  proportionPlayground.register( 'BilliardsTableNodeWithSpinners', BilliardsTableNodeWithSpinners );

  return inherit( Node, BilliardsTableNodeWithSpinners, {} );
} );