// Copyright 2016, University of Colorado Boulder

/**
 * Combines an AppleGroupNode with NumberPickers (spinners) that let you change the number of apples and coins.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var AppleGroupNode = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleGroupNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var totalCostString = require( 'string!PROPORTION_PLAYGROUND/totalCost' );
  var applesString = require( 'string!PROPORTION_PLAYGROUND/apples' );
  var pricePatternString = require( 'string!PROPORTION_PLAYGROUND/pricePattern' );

  // constants
  var NUMBER_PICKER_OPTIONS = { scale: 2 };
  var APPLE_RED = 'rgb(237,28,36)'; // color sampled from apple-red.png

  /**
   * @param {AppleGroup} appleGroup - the model
   * @param {Image|mipmap} appleImage - the image to show for the apple grid and and apple icons
   * @param {Property.<boolean>} showCostPerAppleProperty - true if the price tag should be shown
   * @param {Property.<boolean>} revealProperty - true if the answer representation should be shown
   * @constructor
   */
  function AppleGroupControl( appleGroup, appleImage, showCostPerAppleProperty, revealProperty ) {

    // Create the total cost spinner
    var totalCostNumberPicker = new NumberPicker(
      appleGroup.totalCostProperty,
      new Property( appleGroup.totalCostRange ),
      _.extend( {
          color: 'black',

          // Put a $ sign in front of the spinner number
          formatText: function( text ) {
            return StringUtils.format( pricePatternString, text );
          }
        },
        NUMBER_PICKER_OPTIONS
      )
    );

    // Create the number of apples spinner
    var numberOfApplesNumberPicker = new NumberPicker(
      appleGroup.numberOfApplesProperty,
      new Property( appleGroup.numberOfApplesRange ),
      _.extend( { color: APPLE_RED }, NUMBER_PICKER_OPTIONS )
    );

    // Create the place where apples and coins will be shown.
    var appleGroupNode = new AppleGroupNode( appleGroup, appleImage, showCostPerAppleProperty );

    // Only show the representation if it is being revealed
    revealProperty.linkAttribute( appleGroupNode, 'visible' );

    function pickerWithLabel( numberPicker, label ) {
      return new VBox( {
        spacing: 10,
        children: [
          new Text( label, {
            maxWidth: 202, // ceiling value from ?stringTest=double for English
            fontSize: ProportionPlaygroundConstants.CONTROL_FONT_SIZE
          } ),
          numberPicker
        ]
      } );
    }

    var costPickerGroup = pickerWithLabel( totalCostNumberPicker, totalCostString );
    var applePickerGroup = pickerWithLabel( numberOfApplesNumberPicker, applesString );

    costPickerGroup.centerX = appleGroupNode.coinLayer.centerX;
    applePickerGroup.centerX = appleGroupNode.appleLayer.centerX;
    costPickerGroup.top = applePickerGroup.top = appleGroupNode.bottom + 40;

    Node.call( this, {
      children: [
        appleGroupNode,
        costPickerGroup,
        applePickerGroup
      ]
    } );
  }

  proportionPlayground.register( 'AppleGroupControl', AppleGroupControl );

  return inherit( Node, AppleGroupControl );
} );
