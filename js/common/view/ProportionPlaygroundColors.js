// Copyright 2021-2022, University of Colorado Boulder

/**
 * Colors for the Proportion Playground sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import { Color, ProfileColorProperty } from '../../../../scenery/js/imports.js';
import proportionPlayground from '../../proportionPlayground.js';

// Initial colors for each profile, by string key. Only profile currently is default (still helpful for making color
// tweaks with the top-level proportion-playground-colors.html)
const ProportionPlaygroundColors = {

  // @public
  exploreBackgroundProperty: new ProfileColorProperty( proportionPlayground, 'exploreBackground', { default: new Color( '#fcf3eb' ) } ),
  predictBackgroundProperty: new ProfileColorProperty( proportionPlayground, 'predictBackground', { default: new Color( '#eaeefd' ) } ),
  refreshBackgroundProperty: new ProfileColorProperty( proportionPlayground, 'refreshBackground', { default: new Color( 242, 242, 242 ) } ),
  revealButtonProperty: new ProfileColorProperty( proportionPlayground, 'revealButton', { default: PhetColorScheme.BUTTON_YELLOW } ),
  sceneSelectionBorderProperty: new ProfileColorProperty( proportionPlayground, 'sceneSelectionBorder', { default: Color.BLACK } ),
  sceneSelectionBackgroundProperty: new ProfileColorProperty( proportionPlayground, 'sceneSelectionBackground', { default: Color.WHITE } ),

  // Apple scenes
  appleProperty: new ProfileColorProperty( proportionPlayground, 'apple', { default: new Color( 237, 28, 36 ) } ),
  appleCostPickerProperty: new ProfileColorProperty( proportionPlayground, 'appleCostPicker', { default: Color.BLACK } ),
  applePriceTagBackgroundProperty: new ProfileColorProperty( proportionPlayground, 'applePriceTagBackground', { default: Color.WHITE } ),
  applePriceTagBorderProperty: new ProfileColorProperty( proportionPlayground, 'applePriceTagBorder', { default: Color.BLACK } ),
  applePriceTagTextProperty: new ProfileColorProperty( proportionPlayground, 'applePriceTagText', { default: Color.BLACK } ),

  // Billiards scenes
  billiardsBorderProperty: new ProfileColorProperty( proportionPlayground, 'billiardsBorder', { default: new Color( 85, 55, 0 ) } ),
  billiardsInsideProperty: new ProfileColorProperty( proportionPlayground, 'billiardsInside', { default: new Color( 15, 102, 34 ) } ),
  billiardsPathProperty: new ProfileColorProperty( proportionPlayground, 'billiardsPath', { default: Color.WHITE } ),
  billiardsGripDotsProperty: new ProfileColorProperty( proportionPlayground, 'billiardsGripDots', { default: new Color( 190, 190, 190 ) } ),
  billiardsGridLineProperty: new ProfileColorProperty( proportionPlayground, 'billiardsGridLine', { default: new Color( 168, 168, 168 ) } ),
  billiardsPocketProperty: new ProfileColorProperty( proportionPlayground, 'billiardsPocket', { default: Color.BLACK } ),
  billiardsBallMainProperty: new ProfileColorProperty( proportionPlayground, 'billiardsBallMain', { default: new Color( 244, 244, 244 ) } ),
  billiardsBallHighlightProperty: new ProfileColorProperty( proportionPlayground, 'billiardsBallHighlight', { default: Color.WHITE } ),

  // Paint scenes
  paintStrokeProperty: new ProfileColorProperty( proportionPlayground, 'paintStroke', { default: Color.BLACK } ),
  paintBlueProperty: new ProfileColorProperty( proportionPlayground, 'paintBlue', { default: new Color( 0x05, 0x70, 0xFF ) } ),
  paintYellowProperty: new ProfileColorProperty( proportionPlayground, 'paintYellow', { default: new Color( 0xFF, 0xE0, 0x05 ) } ),
  paintRedProperty: new ProfileColorProperty( proportionPlayground, 'paintRed', { default: new Color( 0xFF, 0x25, 0x05 ) } ),
  paintBlackProperty: new ProfileColorProperty( proportionPlayground, 'paintBlack', { default: new Color( 0x25, 0x25, 0x25 ) } ),
  paintWhiteProperty: new ProfileColorProperty( proportionPlayground, 'paintWhite', { default: new Color( 0xFF, 0xFF, 0xFF ) } ),

  // Necklace scenes
  necklaceRoundBeadProperty: new ProfileColorProperty( proportionPlayground, 'necklaceRoundBead', { default: new Color( 'hsl(355,75%,53%)' ) } ),
  necklaceSquareBeadProperty: new ProfileColorProperty( proportionPlayground, 'necklaceSquareBead', { default: new Color( 'hsl(206,65%,48%)' ) } ),
  necklaceStringProperty: new ProfileColorProperty( proportionPlayground, 'necklaceString', { default: Color.BLACK } ),
  necklacePatternBorderProperty: new ProfileColorProperty( proportionPlayground, 'necklacePatternBorder', { default: new Color( '#B3B3B3' ) } )
};

proportionPlayground.register( 'ProportionPlaygroundColors', ProportionPlaygroundColors );

/**
 * Creates a color property that is always an adjusted amount brighter/darker than the defined colorProperty.
 * @public
 *
 * @param {Property.<Color>} colorProperty
 * @param {number} amount
 * @returns {Property.<Color>}
 */
function adjustedColorUtilsBrightness( colorProperty, amount ) {
  return new DerivedProperty( [ colorProperty ], ( color => {
    if ( amount > 0 ) {
      return color.colorUtilsBrighter( amount );
    }
    else if ( amount < 0 ) {
      return color.colorUtilsDarker( -amount );
    }
    else {
      return color;
    }
  } ) );
}

/**
 * Returns round/square color properties adjusted by a certain amount of brightness (negative to darken).
 * @public
 *
 * @param {number} amount
 * @returns {Property.<Color>}
 */
ProportionPlaygroundColors.adjustedNecklaceRoundBeadProperty =
  adjustedColorUtilsBrightness.bind( null, ProportionPlaygroundColors.necklaceRoundBeadProperty );
ProportionPlaygroundColors.adjustedNecklaceSquareBeadProperty =
  adjustedColorUtilsBrightness.bind( null, ProportionPlaygroundColors.necklaceSquareBeadProperty );

export default ProportionPlaygroundColors;