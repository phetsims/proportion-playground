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
  var Image = require( 'SCENERY/nodes/Image' );

  // constants
  var appleScale = 0.4;

  function AppleGroupNode( appleGroupModel, appleImage ) {
    var appleLayer = new Node( { y: 200 } );
    Node.call( this, {
      children: [ appleLayer ]
    } );
    appleGroupModel.numberOfApplesProperty.link( function() {
      var appleArray = [];
      var x = 0;
      var y = 0;
      for ( var i = 0; i < appleGroupModel.numberOfApples; i++ ) {
        var image = new Image( appleImage, { scale: appleScale, x: x, y: y } );
        appleArray.push( image );
        x = image.right;
        if ( x >= image.width * 5 ) {
          x = 0;
          y = y + image.height / 2;
        }
      }
      appleLayer.children = appleArray;
      appleLayer.x = -150; // TODO: in terms of number of images and scale
    } );
  }

  proportionPlayground.register( 'AppleGroupNode', AppleGroupNode );

  return inherit( Node, AppleGroupNode, {} );
} );