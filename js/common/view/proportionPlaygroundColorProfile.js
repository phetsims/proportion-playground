// Copyright 2017-2021, University of Colorado Boulder

/**
 * Colors for the Proportion Playground sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import Color from '../../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import proportionPlayground from '../../proportionPlayground.js';

// Initial colors for each profile, by string key. Only profile currently is default (still helpful for making color
// tweaks with the top-level proportion-playground-colors.html)
const proportionPlaygroundColorProfile = {

  // @public
  exploreBackgroundProperty: new ProfileColorProperty( 'exploreBackground', { default: new Color( '#fcf3eb' ) } ),
  predictBackgroundProperty: new ProfileColorProperty( 'predictBackground', { default: new Color( '#eaeefd' ) } ),
  refreshBackgroundProperty: new ProfileColorProperty( 'refreshBackground', { default: new Color( 242, 242, 242 ) } ),
  revealButtonProperty: new ProfileColorProperty( 'revealButton', { default: PhetColorScheme.BUTTON_YELLOW } ),
  sceneSelectionBorderProperty: new ProfileColorProperty( 'sceneSelectionBorder', { default: Color.BLACK } ),
  sceneSelectionBackgroundProperty: new ProfileColorProperty( 'sceneSelectionBackground', { default: Color.WHITE } ),

  // Apple scenes
  appleProperty: new ProfileColorProperty( 'apple', { default: new Color( 237, 28, 36 ) } ),
  appleCostPickerProperty: new ProfileColorProperty( 'appleCostPicker', { default: Color.BLACK } ),
  applePriceTagBackgroundProperty: new ProfileColorProperty( 'applePriceTagBackground', { default: Color.WHITE } ),
  applePriceTagBorderProperty: new ProfileColorProperty( 'applePriceTagBorder', { default: Color.BLACK } ),
  applePriceTagTextProperty: new ProfileColorProperty( 'applePriceTagText', { default: Color.BLACK } ),

  // Billiards scenes
  billiardsBorderProperty: new ProfileColorProperty( 'billiardsBorder', { default: new Color( 85, 55, 0 ) } ),
  billiardsInsideProperty: new ProfileColorProperty( 'billiardsInside', { default: new Color( 15, 102, 34 ) } ),
  billiardsPathProperty: new ProfileColorProperty( 'billiardsPath', { default: Color.WHITE } ),
  billiardsGripDotsProperty: new ProfileColorProperty( 'billiardsGripDots', { default: new Color( 190, 190, 190 ) } ),
  billiardsGridLineProperty: new ProfileColorProperty( 'billiardsGridLine', { default: new Color( 168, 168, 168 ) } ),
  billiardsPocketProperty: new ProfileColorProperty( 'billiardsPocket', { default: Color.BLACK } ),
  billiardsBallMainProperty: new ProfileColorProperty( 'billiardsBallMain', { default: new Color( 244, 244, 244 ) } ),
  billiardsBallHighlightProperty: new ProfileColorProperty( 'billiardsBallHighlight', { default: Color.WHITE } ),

  // Paint scenes
  paintStrokeProperty: new ProfileColorProperty( 'paintStroke', { default: Color.BLACK } ),
  paintBlueProperty: new ProfileColorProperty( 'paintBlue', { default: new Color( 0x05, 0x70, 0xFF ) } ),
  paintYellowProperty: new ProfileColorProperty( 'paintYellow', { default: new Color( 0xFF, 0xE0, 0x05 ) } ),
  paintRedProperty: new ProfileColorProperty( 'paintRed', { default: new Color( 0xFF, 0x25, 0x05 ) } ),
  paintBlackProperty: new ProfileColorProperty( 'paintBlack', { default: new Color( 0x25, 0x25, 0x25 ) } ),
  paintWhiteProperty: new ProfileColorProperty( 'paintWhite', { default: new Color( 0xFF, 0xFF, 0xFF ) } ),

  // Necklace scenes
  necklaceRoundBeadProperty: new ProfileColorProperty( 'necklaceRoundBead', { default: new Color( 'hsl(355,75%,53%)' ) } ),
  necklaceSquareBeadProperty: new ProfileColorProperty( 'necklaceSquareBead', { default: new Color( 'hsl(206,65%,48%)' ) } ),
  necklaceStringProperty: new ProfileColorProperty( 'necklaceString', { default: Color.BLACK } ),
  necklacePatternBorderProperty: new ProfileColorProperty( 'necklacePatternBorder', { default: new Color( '#B3B3B3' ) } )
};

proportionPlayground.register( 'proportionPlaygroundColorProfile', proportionPlaygroundColorProfile );

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
proportionPlaygroundColorProfile.adjustedNecklaceRoundBeadProperty =
  adjustedColorUtilsBrightness.bind( null, proportionPlaygroundColorProfile.necklaceRoundBeadProperty );
proportionPlaygroundColorProfile.adjustedNecklaceSquareBeadProperty =
  adjustedColorUtilsBrightness.bind( null, proportionPlaygroundColorProfile.necklaceSquareBeadProperty );

export default proportionPlaygroundColorProfile;