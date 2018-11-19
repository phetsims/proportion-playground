// Copyright 2017, University of Colorado Boulder

/**
 * Colors for the Proportion Playground sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  // Initial colors for each profile, by string key. Only profile currently is default (still helpful for making color
  // tweaks with the top-level proportion-playground-colors.html)
  var ProportionPlaygroundColorProfile = new ColorProfile( [ 'default' ], {

    exploreBackground: { default: new Color( '#fcf3eb' ) },
    predictBackground: { default: new Color( '#eaeefd' ) },
    refreshBackground: { default: new Color( 242, 242, 242 ) },
    revealButton: { default: PhetColorScheme.BUTTON_YELLOW },
    sceneSelectionBorder: { default: Color.BLACK },
    sceneSelectionBackground: { default: Color.WHITE },

    // Apple scenes
    apple: { default: new Color( 237, 28, 36 ) },
    appleCostPicker: { default: Color.BLACK },
    applePriceTagBackground: { default: Color.WHITE },
    applePriceTagBorder: { default: Color.BLACK },
    applePriceTagText: { default: Color.BLACK },

    // Billiards scenes
    billiardsBorder: { default: new Color( 85, 55, 0 ) },
    billiardsInside: { default: new Color( 15, 102, 34 ) },
    billiardsPath: { default: Color.WHITE },
    billiardsGripDots: { default: new Color( 190, 190, 190 ) },
    billiardsGridLine: { default: new Color( 168, 168, 168 ) },
    billiardsPocket: { default: Color.BLACK },
    billiardsBallMain: { default: new Color( 244, 244, 244 ) },
    billiardsBallHighlight: { default: Color.WHITE },

    // Paint scenes
    paintStroke: { default: Color.BLACK },
    paintBlue: { default: new Color( 0x05, 0x70, 0xFF ) },
    paintYellow: { default: new Color( 0xFF, 0xE0, 0x05 ) },
    paintRed: { default: new Color( 0xFF, 0x25, 0x05 ) },
    paintBlack: { default: new Color( 0x25, 0x25, 0x25 ) },
    paintWhite: { default: new Color( 0xFF, 0xFF, 0xFF ) },

    // Necklace scenes
    necklaceRoundBead: { default: new Color( 'hsl(355,75%,53%)' ) },
    necklaceSquareBead: { default: new Color( 'hsl(206,65%,48%)' ) },
    necklaceString: { default: Color.BLACK },
    necklacePatternBorder: { default: new Color( '#B3B3B3' ) }
  } );

  proportionPlayground.register( 'ProportionPlaygroundColorProfile', ProportionPlaygroundColorProfile );

  /**
   * Creates a color property that is always an adjusted amount brighter/darker than the defined colorProperty.
   * @public
   *
   * @param {Property.<Color>} colorProperty
   * @param {number} amount
   * @returns {Property.<Color>}
   */
  function adjustedColorUtilsBrightness( colorProperty, amount ) {
    return new DerivedProperty( [ colorProperty ], function( color ) {
      if ( amount > 0 ) {
        return color.colorUtilsBrighter( amount );
      }
      else if ( amount < 0 ) {
        return color.colorUtilsDarker( -amount );
      }
      else {
        return color;
      }
    } );
  }

  /**
   * Returns round/square color properties adjusted by a certain amount of brightness (negative to darken).
   * @public
   *
   * @param {number} amount
   * @returns {Property.<Color>}
   */
  ProportionPlaygroundColorProfile.adjustedNecklaceRoundBeadProperty =
    adjustedColorUtilsBrightness.bind( null, ProportionPlaygroundColorProfile.necklaceRoundBeadProperty );
  ProportionPlaygroundColorProfile.adjustedNecklaceSquareBeadProperty =
    adjustedColorUtilsBrightness.bind( null, ProportionPlaygroundColorProfile.necklaceSquareBeadProperty );

  return ProportionPlaygroundColorProfile;
} );
