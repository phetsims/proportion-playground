// Copyright 2016-2021, University of Colorado Boulder

/**
 * Combines an AppleGroupNode with NumberPickers (spinners) that let you change the number of apples and coins.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import proportionPlayground from '../../../proportionPlayground.js';
import proportionPlaygroundStrings from '../../../proportionPlaygroundStrings.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';
import SceneRatioControl from '../SceneRatioControl.js';
import AppleGroupNode from './AppleGroupNode.js';

const applesString = proportionPlaygroundStrings.apples;
const pricePatternString = proportionPlaygroundStrings.pricePattern;
const totalCostString = proportionPlaygroundStrings.totalCost;

class AppleGroupControl extends SceneRatioControl {
  /**
   * @param {AppleGroup} appleGroup - the model
   * @param {Property.<boolean>} showCostPerAppleProperty - true if the price tag should be shown
   * @param {Tandem} tandem
   */
  constructor( appleGroup, showCostPerAppleProperty, tandem ) {
    assert && assert( tandem );

    super(
      appleGroup,
      ProportionPlaygroundColors.appleCostPickerProperty,
      ProportionPlaygroundColors.appleProperty,
      tandem,
      {
        leftPickerLabel: totalCostString,
        leftPickerOptions: {
          // Put a $ sign in front of the spinner number
          formatValue: value => StringUtils.fillIn( pricePatternString, {
            price: `${value}`
          } )
        },
        rightPickerLabel: applesString,
        pickerLabelMaxWidth: 90
      }
    );

    // Create the place where apples and coins will be shown.
    const appleGroupNode = new AppleGroupNode( appleGroup, showCostPerAppleProperty );

    this.addChild( appleGroupNode );
    this.addBottomPickersWithPosition( appleGroupNode.coinStack.centerX, appleGroupNode.appleCrate.centerX );

    appleGroupNode.bottom = this.pickerContainer.top - 30;
  }
}

proportionPlayground.register( 'AppleGroupControl', AppleGroupControl );

export default AppleGroupControl;
