// Copyright 2016-2017, University of Colorado Boulder

/**
 * Combines an AppleGroupNode with NumberPickers (spinners) that let you change the number of apples and coins.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AppleGroupNode = require( 'PROPORTION_PLAYGROUND/common/view/apples/AppleGroupNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var applesString = require( 'string!PROPORTION_PLAYGROUND/apples' );
  var pricePatternString = require( 'string!PROPORTION_PLAYGROUND/pricePattern' );
  var totalCostString = require( 'string!PROPORTION_PLAYGROUND/totalCost' );

  /**
   * @constructor
   * @extends {SceneRatioControl}
   *
   * @param {AppleGroup} appleGroup - the model
   * @param {Property.<boolean>} showCostPerAppleProperty - true if the price tag should be shown
   */
  function AppleGroupControl( appleGroup, showCostPerAppleProperty ) {
    SceneRatioControl.call( this, appleGroup, ProportionPlaygroundColorProfile.appleCostPickerProperty,
      ProportionPlaygroundColorProfile.appleProperty, {
        leftPickerLabel: totalCostString,
        leftPickerOptions: {
          // Put a $ sign in front of the spinner number
          formatValue: function( value ) {
            return StringUtils.fillIn( pricePatternString, {
              price: '' + value
            } );
          }
        },
        rightPickerLabel: applesString,
        pickerLabelMaxWidth: 90
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
