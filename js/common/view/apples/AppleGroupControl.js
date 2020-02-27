// Copyright 2016-2019, University of Colorado Boulder

/**
 * Combines an AppleGroupNode with NumberPickers (spinners) that let you change the number of apples and coins.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import proportionPlaygroundStrings from '../../../proportion-playground-strings.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from '../ProportionPlaygroundColorProfile.js';
import SceneRatioControl from '../SceneRatioControl.js';
import AppleGroupNode from './AppleGroupNode.js';

const applesString = proportionPlaygroundStrings.apples;
const pricePatternString = proportionPlaygroundStrings.pricePattern;
const totalCostString = proportionPlaygroundStrings.totalCost;

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
  const appleGroupNode = new AppleGroupNode( appleGroup, showCostPerAppleProperty );

  this.addChild( appleGroupNode );
  this.addBottomPickersWithLocation( appleGroupNode.coinStack.centerX, appleGroupNode.appleCrate.centerX );

  appleGroupNode.bottom = this.pickerContainer.top - 30;
}

proportionPlayground.register( 'AppleGroupControl', AppleGroupControl );

inherit( SceneRatioControl, AppleGroupControl );
export default AppleGroupControl;