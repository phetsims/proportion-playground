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
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var totalCostString = require( 'string!PROPORTION_PLAYGROUND/totalCost' );
  var applesString = require( 'string!PROPORTION_PLAYGROUND/apples' );
  var pricePatternString = require( 'string!PROPORTION_PLAYGROUND/pricePattern' );

  // constants
  var APPLE_RED = 'rgb(237,28,36)'; // color sampled from apple-red.png

  /**
   * @constructor
   *
   * @param {AppleGroup} appleGroup - the model
   * @param {Property.<boolean>} showCostPerAppleProperty - true if the price tag should be shown
   * @param {Property.<boolean>} revealProperty - true if the answer representation should be shown
   */
  function AppleGroupControl( appleGroup, showCostPerAppleProperty, revealProperty ) {
    SceneRatioControl.call( this, appleGroup, {
      leftPickerLabel: totalCostString,
      leftPickerColors: [ 'black' ],
      leftPickerOptions: {
        // Put a $ sign in front of the spinner number
        formatText: function( text ) {
          return StringUtils.format( pricePatternString, text );
        }
      },
      rightPickerLabel: applesString,
      rightPickerColors: [ APPLE_RED ]
    } );

    // Create the place where apples and coins will be shown.
    var appleGroupNode = new AppleGroupNode( appleGroup, showCostPerAppleProperty );

    this.addChild( appleGroupNode );
    this.addBottomPickersWithLocation( appleGroupNode.coinStack.centerX, appleGroupNode.appleCrate.centerX );

    appleGroupNode.bottom = this.pickerContainer.top - 30;
  }

  proportionPlayground.register( 'AppleGroupControl', AppleGroupControl );

  return inherit( SceneRatioControl, AppleGroupControl );
} );
