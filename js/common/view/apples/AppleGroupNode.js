// Copyright 2016-2022, University of Colorado Boulder

/**
 * Shows a group of apples which are all the same color (green or red)
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../../axon/js/Multilink.js';
import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { Shape } from '../../../../../kite/js/imports.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import { AlignBox, Image, Line, Node, Path, Text, VBox } from '../../../../../scenery/js/imports.js';
import appleRed_png from '../../../../mipmaps/appleRed_png.js';
import coin_png from '../../../../mipmaps/coin_png.js';
import crateBack_png from '../../../../mipmaps/crateBack_png.js';
import crateFront_png from '../../../../mipmaps/crateFront_png.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundStrings from '../../../ProportionPlaygroundStrings.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';
import SceneRatioNode from '../SceneRatioNode.js';

const appleString = ProportionPlaygroundStrings.apple;
const pricePatternString = ProportionPlaygroundStrings.pricePattern;

// constants
const APPLE_IMAGE_SCALE = 0.35; // Reduction factor for showing the image
const COIN_IMAGE_SCALE = 0.5; // Reduction factor for showing the image
const APPLES_PER_ROW = 5;

class AppleGroupNode extends SceneRatioNode {
  /**
   * @param {AppleGroup} appleGroup - the model for the apple group
   * @param {Property.<boolean>} showCostPerAppleProperty - indicates whether the price tag should be shown
   */
  constructor( appleGroup, showCostPerAppleProperty ) {
    super( appleGroup );

    const priceTagLayer = new Node();

    // Show/hide the price tag
    showCostPerAppleProperty.linkAttribute( priceTagLayer, 'visible' );

    // {Image}
    const appleImageNode = new Image( appleRed_png, { scale: APPLE_IMAGE_SCALE } );
    const coinImageNode = new Image( coin_png, { scale: COIN_IMAGE_SCALE } );

    // {Array.<Array.<Node>>} - Array of rows, each of which is an array of apple nodes
    const appleRows = _.range( 0, ProportionPlaygroundConstants.APPLE_COUNT_RANGE.max / APPLES_PER_ROW ).map( row => _.range( 0, APPLES_PER_ROW ).map( column => new Node( {
      children: [ appleImageNode ],
      x: ( APPLES_PER_ROW - column ) * appleImageNode.width * 0.8 -
         row * appleImageNode.width * 0.15,
      y: row * appleImageNode.height * 0.55
    } ) ) );

    const appleNodes = _.flatten( appleRows );

    const stackedAppleNodes = _.flatten( appleRows.map( row => row.slice().reverse() ) );

    const crateImageOffset = new Vector2( -7, -15 );

    // @public {Node} - Exposed so we can properly align controls with the apples
    this.appleCrate = new Node( {
      children: [
        new Image( crateBack_png, {
          translation: crateImageOffset
        } )
      ].concat( stackedAppleNodes ).concat( [
        new Image( crateFront_png, {
          translation: crateImageOffset
        } )
      ] )
    } );

    const coinNodes = _.range( 0, ProportionPlaygroundConstants.APPLE_TOTAL_COST_RANGE.max ).map( coinNumber => new Node( {
      children: [ coinImageNode ],
      y: -coinNumber * coinImageNode.height / 10
    } ) );

    // @public {Node} - Exposed so we can properly align controls with the coins
    this.coinStack = new Node( {
      children: coinNodes
    } );

    // Show the grid of apples
    appleGroup.numberOfApplesProperty.link( numberOfApples => {
      appleNodes.forEach( ( appleNode, index ) => {
        appleNode.visible = ProportionPlaygroundConstants.APPLE_COUNT_RANGE.max - index <= numberOfApples;
      } );
    } );

    // Show the stack of coins
    appleGroup.totalCostProperty.link( totalCost => {
      coinNodes.forEach( ( coinNode, index ) => {
        coinNode.visible = index < totalCost;
      } );
    } );

    // Update the price tag
    Multilink.multilink( [ appleGroup.totalCostProperty, appleGroup.numberOfApplesProperty ], ( totalCost, numberOfApples ) => {
      const pricePerApple = totalCost / numberOfApples;
      let fixed = Utils.toFixed( pricePerApple, 2 );
      if ( numberOfApples === 0 ) {
        fixed = '?';
      }
      else {
        fixed = StringUtils.fillIn( pricePatternString, {
          price: fixed
        } );
      }
      const textOptions = {
        font: ProportionPlaygroundConstants.APPLE_PRICE_FONT,
        fill: ProportionPlaygroundColors.applePriceTagTextProperty,
        maxWidth: 200
      };
      const labelBox = new AlignBox( new VBox( {
        spacing: 4,
        children: [
          new Text( fixed, textOptions ),
          new Line( 0, 0, 100, 0, {
            lineWidth: 2,
            stroke: ProportionPlaygroundColors.applePriceTagTextProperty
          } ),
          new Text( appleString, textOptions )
        ]
      } ), {
        xMargin: 12,
        yMargin: 5
      } );

      const labelRadius = 14;
      const labelShape = new Shape().arc( labelBox.left, labelBox.top, labelRadius, Math.PI / 2, 0, true )
        .arc( labelBox.right, labelBox.top, labelRadius, Math.PI, Math.PI / 2, true )
        .arc( labelBox.right, labelBox.bottom, labelRadius, -Math.PI / 2, -Math.PI, true )
        .arc( labelBox.left, labelBox.bottom, labelRadius, 0, -Math.PI / 2, true )
        .close();
      priceTagLayer.children = [
        new Path( labelShape, {
          fill: ProportionPlaygroundColors.applePriceTagBackgroundProperty,
          stroke: ProportionPlaygroundColors.applePriceTagBorderProperty,
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
}

proportionPlayground.register( 'AppleGroupNode', AppleGroupNode );

export default AppleGroupNode;