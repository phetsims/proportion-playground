// Copyright 2016, University of Colorado Boulder

/**
 * Shows a group of apples which are all the same color (green or red)
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
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var Property = require( 'AXON/Property' );
  var Line = require( 'SCENERY/nodes/Line' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // images
  var coinImage = require( 'mipmap!PROPORTION_PLAYGROUND/coin.png' );

  // constants
  var appleImageScale = 0.35; // Reduction factor for showing the image
  var coinImageScale = 0.7; // Reduction factor for showing the image
  var applesPerRow = 5;
  var distanceBetweenCoinsAndApples = 65;
  var yOffsetOptions = { y: 320 };

  /**
   *
   * @param {AppleGroupModel} appleGroupModel - the model for the apple group
   * @param {Image|mipmap} appleImage - the image to show for each apple
   * @param {Property.<boolean>} showCostPerAppleProperty - indicates whether the price tag should be shown
   * @constructor
   */
  function AppleGroupNode( appleGroupModel, appleImage, showCostPerAppleProperty ) {
    var appleLayer = new Node( yOffsetOptions );
    var coinLayer = new Node( yOffsetOptions );
    var priceTagLayer = new Node( { x: -132, y: 110 } );
    var appleLayerX = -applesPerRow * appleImage[ 0 ].width * appleImageScale / 2;
    Node.call( this, {
      children: [ coinLayer, appleLayer, priceTagLayer ]
    } );

    // Show/hide the price tag
    showCostPerAppleProperty.link( function( showCostPerApple ) {
      priceTagLayer.visible = showCostPerApple;
    } );

    // Show the grid of apples
    appleGroupModel.numberOfApplesProperty.link( function( numberOfApples ) {
      var appleArray = [];
      var x = 0;
      var y = 0;
      for ( var i = 0; i < numberOfApples; i++ ) {
        var image = new Image( appleImage, { scale: appleImageScale, x: x, y: y } );
        appleArray.unshift( image ); // prepend to get z-order correct
        x = image.right;
        if ( x >= image.width * applesPerRow ) {
          x = 0;
          y = y - image.height / 2; // group up, the same as the coins grow for consistency
        }
      }
      appleLayer.children = appleArray;

      appleLayer.x = appleLayerX;
    } );

    // Show the stack of coins
    appleGroupModel.totalCostProperty.link( function( totalCost ) {
      var coinArray = [];
      var x = 0;
      var y = 0;
      for ( var i = 0; i < totalCost; i++ ) {
        var image = new Image( coinImage, { scale: coinImageScale, x: x, y: y } );
        coinArray.push( image );
        y = y - image.height / 6;
      }
      coinLayer.children = coinArray;
      coinLayer.x = appleLayerX - coinImage[ 0 ].width * coinImageScale - distanceBetweenCoinsAndApples;
    } );

    // Update the price tag
    Property.multilink( [ appleGroupModel.totalCostProperty, appleGroupModel.numberOfApplesProperty ], function( totalCost, numberOfApples ) {
      var pricePerApple = totalCost / numberOfApples;
      var fixed = Util.toFixed( pricePerApple, 2 );
      if ( numberOfApples === 0 ) {
        fixed = '?';
      }
      else {
        fixed = '$' + fixed;
      }
      var fontSizeOptions = { fontSize: 30 };
      priceTagLayer.children = [ new Panel( new VBox( {
        spacing: 5,
        children: [
          new Text( fixed, fontSizeOptions ),
          new Line( 0, 0, 100, 0, { lineWidth: 2, stroke: 'black' } ),
          new Text( 'Apple', fontSizeOptions )
        ]
      } ), {
        xMargin: 12,
        yMargin: 12
      } ) ];
    } );
  }

  proportionPlayground.register( 'AppleGroupNode', AppleGroupNode );

  return inherit( Node, AppleGroupNode );
} );