// Copyright 2016-2017, University of Colorado Boulder

/**
 * Shows a group of apples which are all the same color (green or red)
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  const SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );
  const Shape = require( 'KITE/Shape' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );

  // images
  const coinImage = require( 'mipmap!PROPORTION_PLAYGROUND/coin.png' );
  const crateBackImage = require( 'mipmap!PROPORTION_PLAYGROUND/crate-back.png' );
  const crateFrontImage = require( 'mipmap!PROPORTION_PLAYGROUND/crate-front.png' );
  const redAppleImage = require( 'mipmap!PROPORTION_PLAYGROUND/apple-red.png' );

  // strings
  const appleString = require( 'string!PROPORTION_PLAYGROUND/apple' );
  const pricePatternString = require( 'string!PROPORTION_PLAYGROUND/pricePattern' );

  // constants
  var APPLE_IMAGE_SCALE = 0.35; // Reduction factor for showing the image
  var COIN_IMAGE_SCALE = 0.5; // Reduction factor for showing the image
  var APPLES_PER_ROW = 5;

  /**
   * @constructor
   * @extends {SceneRatioNode}
   *
   * @param {AppleGroup} appleGroup - the model for the apple group
   * @param {Property.<boolean>} showCostPerAppleProperty - indicates whether the price tag should be shown
   */
  function AppleGroupNode( appleGroup, showCostPerAppleProperty ) {
    SceneRatioNode.call( this, appleGroup );

    var priceTagLayer = new Node();

    // Show/hide the price tag
    showCostPerAppleProperty.linkAttribute( priceTagLayer, 'visible' );

    // {Image}
    var appleImageNode = new Image( redAppleImage, { scale: APPLE_IMAGE_SCALE } );
    var coinImageNode = new Image( coinImage, { scale: COIN_IMAGE_SCALE } );

    // {Array.<Array.<Node>>} - Array of rows, each of which is an array of apple nodes
    var appleRows = _.range( 0, ProportionPlaygroundConstants.APPLE_COUNT_RANGE.max / APPLES_PER_ROW ).map( function( row ) {
      return _.range( 0, APPLES_PER_ROW ).map( function( column ) {
        return new Node( {
          children: [ appleImageNode ],
          x: ( APPLES_PER_ROW - column ) * appleImageNode.width * 0.8 -
             row * appleImageNode.width * 0.15,
          y: row * appleImageNode.height * 0.55
        } );
      } );
    } );

    var appleNodes = _.flatten( appleRows );

    var stackedAppleNodes = _.flatten( appleRows.map( function( row ) {
      return row.slice().reverse();
    } ) );

    var crateImageOffset = new Vector2( -7, -15 );

    // @public {Node} - Exposed so we can properly align controls with the apples
    this.appleCrate = new Node( {
      children: [
        new Image( crateBackImage, {
          translation: crateImageOffset
        } )
      ].concat( stackedAppleNodes ).concat( [
        new Image( crateFrontImage, {
          translation: crateImageOffset
        } )
      ] )
    } );

    var coinNodes = _.range( 0, ProportionPlaygroundConstants.APPLE_TOTAL_COST_RANGE.max ).map( function( coinNumber ) {
      return new Node( {
        children: [ coinImageNode ],
        y: -coinNumber * coinImageNode.height / 10
      } );
    } );

    // @public {Node} - Exposed so we can properly align controls with the coins
    this.coinStack = new Node( {
      children: coinNodes
    } );

    // Show the grid of apples
    appleGroup.numberOfApplesProperty.link( function( numberOfApples ) {
      appleNodes.forEach( function( appleNode, index ) {
        appleNode.visible = ProportionPlaygroundConstants.APPLE_COUNT_RANGE.max - index <= numberOfApples;
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
        fixed = StringUtils.fillIn( pricePatternString, {
          price: fixed
        } );
      }
      var textOptions = {
        font: ProportionPlaygroundConstants.APPLE_PRICE_FONT,
        fill: ProportionPlaygroundColorProfile.applePriceTagTextProperty,
        maxWidth: 200
      };
      var labelBox = new AlignBox( new VBox( {
        spacing: 4,
        children: [
          new Text( fixed, textOptions ),
          new Line( 0, 0, 100, 0, {
            lineWidth: 2,
            stroke: ProportionPlaygroundColorProfile.applePriceTagTextProperty
          } ),
          new Text( appleString, textOptions )
        ]
      } ), {
        xMargin: 12,
        yMargin: 5
      } );

      var labelRadius = 14;
      var labelShape = new Shape().arc( labelBox.left, labelBox.top, labelRadius, Math.PI / 2, 0, true )
        .arc( labelBox.right, labelBox.top, labelRadius, Math.PI, Math.PI / 2, true )
        .arc( labelBox.right, labelBox.bottom, labelRadius, -Math.PI / 2, -Math.PI, true )
        .arc( labelBox.left, labelBox.bottom, labelRadius, 0, -Math.PI / 2, true )
        .close();
      priceTagLayer.children = [
        new Path( labelShape, {
          fill: ProportionPlaygroundColorProfile.applePriceTagBackgroundProperty,
          stroke: ProportionPlaygroundColorProfile.applePriceTagBorderProperty,
          lineWidth: 1.5
        } ),
        labelBox
      ];
    } );

    this.appleCrate.left = this.coinStack.right + 35;
    priceTagLayer.centerX = this.appleCrate.centerX - 20;
    this.appleCrate.bottom = this.coinStack.bottom;
    priceTagLayer.centerY = this.appleCrate.bottom - 46.5;

    this.children = [ this.coinStack, this.appleCrate, priceTagLayer ];
  }

  proportionPlayground.register( 'AppleGroupNode', AppleGroupNode );

  return inherit( SceneRatioNode, AppleGroupNode );
} );
