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
  var Line = require( 'SCENERY/nodes/Line' );

  function BilliardsTableNode( center, billiardsTableModel ) {

    // Model the edge outside of the green area (not as a stroke) since there is no way to do "outer" stroke
    var brownRectangle = new Rectangle( 0, 0, 0, 0, { fill: '#73481d' } );
    var greenRectangle = new Rectangle( 0, 0, 0, 0, { fill: '#0a6739' } );

    var updateTable = function() {
      var length = billiardsTableModel.length;
      var width = billiardsTableModel.width;

      var scale = 20;
      var brownEdgeLineWidth = 8;
      var scaledWidth = width * scale;
      var scaledHeight = length * scale;
      var lineWidthAmount = brownEdgeLineWidth * 2;
      brownRectangle.setRect( 0, 0, scaledWidth + lineWidthAmount, scaledHeight + lineWidthAmount );
      greenRectangle.setRect( 0, 0, scaledWidth, scaledHeight );
      brownRectangle.center = center;
      greenRectangle.center = center;

      var createGridLines = function() {
        var gridLines = [];

        // vertical lines
        for ( var i = 0; i <= width; i++ ) {
          gridLines.push( new Line( i * scale, 0, i * scale, scaledHeight, { stroke: 'white' } ) );
        }

        // horizontal lines
        for ( var k = 0; k <= length; k++ ) {
          gridLines.push( new Line( 0, k * scale, scaledWidth, k * scale, { stroke: 'white' } ) );
        }
        return gridLines;
      };
      // grid lines
      greenRectangle.children = createGridLines();
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