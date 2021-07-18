// Copyright 2021, University of Colorado Boulder

/**
 * Colors for the Proportion Playground sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import Color from '../../../../scenery/js/util/Color.js';
import ColorProfileProperty from '../../../../scenery/js/util/ColorProfileProperty.js';
import proportionPlayground from '../../proportionPlayground.js';

// Initial colors for each profile, by string key. Only profile currently is default (still helpful for making color
// tweaks with the top-level proportion-playground-colors.html)
class ProportionPlaygroundColorProfile {
  constructor() {
    this.exploreBackgroundProperty = new ColorProfileProperty( 'exploreBackground', { default: new Color( '#fcf3eb' ) } );
    this.predictBackgroundProperty = new ColorProfileProperty( 'predictBackground', { default: new Color( '#eaeefd' ) } );
    this.refreshBackgroundProperty = new ColorProfileProperty( 'refreshBackground', { default: new Color( 242, 242, 242 ) } );
    this.revealButtonProperty = new ColorProfileProperty( 'revealButton', { default: PhetColorScheme.BUTTON_YELLOW } );
    this.sceneSelectionBorderProperty = new ColorProfileProperty( 'sceneSelectionBorder', { default: Color.BLACK } );
    this.sceneSelectionBackgroundProperty = new ColorProfileProperty( 'sceneSelectionBackground', { default: Color.WHITE } );

    // Apple scenes
    this.appleProperty = new ColorProfileProperty( 'apple', { default: new Color( 237, 28, 36 ) } );
    this.appleCostPickerProperty = new ColorProfileProperty( 'appleCostPicker', { default: Color.BLACK } );
    this.applePriceTagBackgroundProperty = new ColorProfileProperty( 'applePriceTagBackground', { default: Color.WHITE } );
    this.applePriceTagBorderProperty = new ColorProfileProperty( 'applePriceTagBorder', { default: Color.BLACK } );
    this.applePriceTagTextProperty = new ColorProfileProperty( 'applePriceTagText', { default: Color.BLACK } );

    // Billiards scenes
    this.billiardsBorderProperty = new ColorProfileProperty( 'billiardsBorder', { default: new Color( 85, 55, 0 ) } );
    this.billiardsInsideProperty = new ColorProfileProperty( 'billiardsInside', { default: new Color( 15, 102, 34 ) } );
    this.billiardsPathProperty = new ColorProfileProperty( 'billiardsPath', { default: Color.WHITE } );
    this.billiardsGripDotsProperty = new ColorProfileProperty( 'billiardsGripDots', { default: new Color( 190, 190, 190 ) } );
    this.billiardsGridLineProperty = new ColorProfileProperty( 'billiardsGridLine', { default: new Color( 168, 168, 168 ) } );
    this.billiardsPocketProperty = new ColorProfileProperty( 'billiardsPocket', { default: Color.BLACK } );
    this.billiardsBallMainProperty = new ColorProfileProperty( 'billiardsBallMain', { default: new Color( 244, 244, 244 ) } );
    this.billiardsBallHighlightProperty = new ColorProfileProperty( 'billiardsBallHighlight', { default: Color.WHITE } );

    // Paint scenes
    this.paintStrokeProperty = new ColorProfileProperty( 'paintStroke', { default: Color.BLACK } );
    this.paintBlueProperty = new ColorProfileProperty( 'paintBlue', { default: new Color( 0x05, 0x70, 0xFF ) } );
    this.paintYellowProperty = new ColorProfileProperty( 'paintYellow', { default: new Color( 0xFF, 0xE0, 0x05 ) } );
    this.paintRedProperty = new ColorProfileProperty( 'paintRed', { default: new Color( 0xFF, 0x25, 0x05 ) } );
    this.paintBlackProperty = new ColorProfileProperty( 'paintBlack', { default: new Color( 0x25, 0x25, 0x25 ) } );
    this.paintWhiteProperty = new ColorProfileProperty( 'paintWhite', { default: new Color( 0xFF, 0xFF, 0xFF ) } );

    // Necklace scenes
    this.necklaceRoundBeadProperty = new ColorProfileProperty( 'necklaceRoundBead', { default: new Color( 'hsl(355,75%,53%)' ) } );
    this.necklaceSquareBeadProperty = new ColorProfileProperty( 'necklaceSquareBead', { default: new Color( 'hsl(206,65%,48%)' ) } );
    this.necklaceStringProperty = new ColorProfileProperty( 'necklaceString', { default: Color.BLACK } );
    this.necklacePatternBorderProperty = new ColorProfileProperty( 'necklacePatternBorder', { default: new Color( '#B3B3B3' ) } );
  }

  /**
   * Returns round/square color properties adjusted by a certain amount of brightness (negative to darken).
   * @public
   *
   * @param {number} amount
   * @returns {Property.<Color>}
   */
  adjustedNecklaceRoundBeadProperty( amount ) {
    return this.adjustedColorUtilsBrightness( this.necklaceRoundBeadProperty, amount );
  }

  /**
   * Returns round/square color properties adjusted by a certain amount of brightness (negative to darken).
   * @public
   *
   * @param {number} amount
   * @returns {Property.<Color>}
   */
  adjustedNecklaceSquareBeadProperty( amount ) {
    return this.adjustedColorUtilsBrightness( this.necklaceSquareBeadProperty, amount );
  }

  /**
   * Creates a color property that is always an adjusted amount brighter/darker than the defined colorProperty.
   * @public
   *
   * @param {Property.<Color>} colorProperty
   * @param {number} amount
   * @returns {Property.<Color>}
   * @private
   */
  adjustedColorUtilsBrightness( colorProperty, amount ) {
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
}

const proportionPlaygroundColorProfile = new ProportionPlaygroundColorProfile();

proportionPlayground.register( 'proportionPlaygroundColorProfile', proportionPlaygroundColorProfile );

export default proportionPlaygroundColorProfile;