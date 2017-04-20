// Copyright 2014-2015, University of Colorado Boulder

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
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  // Initial colors for each profile, by string key. If a basics/projector color is not defined, it will take the
  // 'default' value provided.
  // NOTE: This is NOT provided to clients directly, but is passed to the PropertySet constructor.
  var ProportionPlaygroundColorProfile = new ColorProfile( {
    exploreBackground: { default: new Color( '#fcf3eb' ) },
    predictBackground: { default: new Color( '#eaeefd' ) },
    refreshBackground: { default: new Color( 242, 242, 242 ) },
    sceneSelectionBorder: { default: Color.BLACK },
    sceneSelectionBackground: { default: Color.WHITE },

    // Apple scenes
    apple: { default: new Color( 237, 28, 36 ) },
    appleCostPicker: { default: Color.BLACK },
    applePriceTagBackground: { default: Color.WHITE },
    applePriceTagBorder: { default: Color.BLACK },
    applePriceTagText: { default: Color.BLACK },

    // Billiards scenes
    billiardsBorder: { default: new Color( 0x11, 0x11, 0x11 ) },
    billiardsInside: { default: new Color( 0x0A, 0x67, 0x39 ) },
    billiardsPath: { default: Color.WHITE },
    billiardsGripDots: { default: new Color( 102, 102, 102 ) },
    billiardsGridLine: { default: new Color( 168, 168, 168 ) },
    billiardsPocket: { default: new Color( 102, 102, 102 ) },
    billiardsBallMain: { default: Color.WHITE },
    billiardsBallHighlight: { default: Color.YELLOW },

    // Paint scenes
    // TODO: Isolate into six colors that don't have names?
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
  }, [ 'default' ] );

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
