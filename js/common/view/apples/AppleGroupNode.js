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
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // images
  var coinImage = require( 'mipmap!PROPORTION_PLAYGROUND/coin.png' );

  // strings
  var pricePatternString = require( 'string!PROPORTION_PLAYGROUND/pricePattern' );

  // constants
  var APPLE_IMAGE_SCALE = 0.35; // Reduction factor for showing the image
  var COIN_IMAGE_SCALE = 0.7; // Reduction factor for showing the image
  var APPLES_PER_ROW = 5;

  /**
   * @constructor
   *
   * @param {AppleGroup} appleGroup - the model for the apple group
   * @param {HTMLImageElement|Array} appleImage - The image to show for each apple (possibly with a mipmap)
   * @param {Property.<boolean>} showCostPerAppleProperty - indicates whether the price tag should be shown
   */
  function AppleGroupNode( appleGroup, appleImage, showCostPerAppleProperty ) {

    var priceTagLayer = new Node( { x: -132, y: 110 } );

    // Show/hide the price tag
    showCostPerAppleProperty.linkAttribute( priceTagLayer, 'visible' );

    // {Image}
    var appleImageNode = new Image( appleImage, { scale: APPLE_IMAGE_SCALE } );
    var coinImageNode = new Image( coinImage, { scale: COIN_IMAGE_SCALE } );

    var appleNodes = _.range( 0, appleGroup.numberOfApplesRange.max ).map( function( appleNumber ) {
      return new Node( {
        children: [ appleImageNode ],
        x: ( APPLES_PER_ROW - ( appleNumber % APPLES_PER_ROW ) - 1 ) * appleImageNode.width,
        y: Math.floor( appleNumber / APPLES_PER_ROW ) * appleImageNode.height / 2
      } );
    } );

    // @public {Node} - Exposed so we can properly align controls with the apples
    this.appleLayer = new Node( {
      children: appleNodes
    } );

    var coinNodes = _.range( 0, appleGroup.totalCostRange.max ).map( function( coinNumber ) {
      return new Node( {
        children: [ coinImageNode ],
        y: -coinNumber * coinImageNode.height / 6
      } );
    } );

    // @public {Node} - Exposed so we can properly align controls with the coins
    this.coinLayer = new Node( {
      children: coinNodes
    } );

    // Show the grid of apples
    appleGroup.numberOfApplesProperty.link( function( numberOfApples ) {
      appleNodes.forEach( function( appleNode, index ) {
        appleNode.visible = appleGroup.numberOfApplesRange.max - index <= numberOfApples;
      } );
    } );

    // Show the stack of coins
    appleGroup.totalCostProperty.link( function( totalCost ) {
      coinNodes.forEach( function( coinNode, index ) {
        coinNode.visible = index < totalCost;
      } );
    } );

    // Update the price tag
    Property.multilink( [ appleGroup.totalCostProperty, appleGroup.numberOfApplesProperty ], function( totalCost, numberOfApples ) {
      var pricePerApple = totalCost / numberOfApples;
      var fixed = Util.toFixed( pricePerApple, 2 );
      if ( numberOfApples === 0 ) {
        fixed = '?';
      }
      else {
        fixed = StringUtils.format( pricePatternString, fixed );
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

    this.appleLayer.left = priceTagLayer.left = this.coinLayer.right + 60;
    this.appleLayer.bottom = this.coinLayer.bottom;
    priceTagLayer.bottom = this.appleLayer.top - 20;

    Node.call( this, {
      children: [ this.coinLayer, this.appleLayer, priceTagLayer ]
    } );

    //TODO: common to each visual representation?
    appleGroup.visibleProperty.linkAttribute( this, 'visible' );
  }

  proportionPlayground.register( 'AppleGroupNode', AppleGroupNode );

  return inherit( Node, AppleGroupNode );
} );
