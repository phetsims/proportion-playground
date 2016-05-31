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
  var AppleGroupNode = require( 'PROPORTION_PLAYGROUND/explore/view/apples/AppleGroupNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var totalCostString = require( 'string!PROPORTION_PLAYGROUND/totalCost' );
  var applesString = require( 'string!PROPORTION_PLAYGROUND/apples' );
  var pricePatternString = require( 'string!PROPORTION_PLAYGROUND/pricePattern' );

  /**
   * @param {AppleGroupModel} appleGroupModel - the model
   * @param {Image|mipmap} appleImage - the image to show for the apple grid and and apple icons
   * @param {Property.<boolean>} showCostPerAppleProperty - true if the price tag should be shown
   * @param {Property.<boolean>} revealProperty - true if the answer representation should be shown
   * @constructor
   */
  function ControllableAppleGroupNode( appleGroupModel, appleImage, showCostPerAppleProperty, revealProperty ) {

    // Create the spinners
    var numberPickerOptions = { scale: 2 };
    var totalCostNumberPicker = new NumberPicker( appleGroupModel.totalCostProperty, new Property( appleGroupModel.totalCostRange ), _.extend( {
      formatText: function( text ) {return StringUtils.format( pricePatternString, text );} // Put a $ sign in front of the spinner number
    }, numberPickerOptions ) );
    var numberOfApplesNumberPicker = new NumberPicker( appleGroupModel.numberOfApplesProperty, new Property( appleGroupModel.numberOfApplesRange ), numberPickerOptions );

    // Create the place where apples and coins will be shown.
    var appleGroupNode = new AppleGroupNode( appleGroupModel, appleImage, showCostPerAppleProperty );

    // Only show the representation if it is being revealed
    revealProperty.linkAttribute( appleGroupNode, 'visible' );

    function toVBox( numberPicker, label ) {
      return new VBox( {
        spacing: 10,
        children: [
          new Text( label, {
            maxWidth: 202, // ceiling value from ?stringTest=double for English
            fontSize: ProportionPlaygroundConstants.controlFontSize
          } ),
          numberPicker
        ]
      } );
    }

    Node.call( this, {
      children: [
        appleGroupNode,
        new HBox( {
          spacing: 150, // distance between the spinners
          y: 430,
          centerX: -140, // position one spinner under coin stack, other under apple stack
          children: [
            toVBox( totalCostNumberPicker, totalCostString ),
            toVBox( numberOfApplesNumberPicker, applesString )
          ]
        } )
      ]
    } );
  }

  proportionPlayground.register( 'ControllableAppleGroupNode', ControllableAppleGroupNode );

  return inherit( Node, ControllableAppleGroupNode );
} );