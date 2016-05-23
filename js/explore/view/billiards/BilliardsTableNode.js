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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function BilliardsTableNode( center, billiardsTableModel ) {
    var brownRectangle = new Rectangle( 0, 0, 0, 0, { fill: '#73481d' } );
    var greenRectangle = new Rectangle( 0, 0, 0, 0, { fill: '#0a6739' } );

    var updateTable = function() {
      var length = billiardsTableModel.length;
      var width = billiardsTableModel.width;

      var scale = 12;
      greenRectangle.setRect( 0, 0, width * scale, length * scale );
      greenRectangle.center = center;
    };

    billiardsTableModel.lengthProperty.link( updateTable );
    billiardsTableModel.widthProperty.link( updateTable );

    Node.call( this, {
      children: [
        brownRectangle,
        greenRectangle
      ]
    } );
  }

  proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

  return inherit( Node, BilliardsTableNode, {} );
} );