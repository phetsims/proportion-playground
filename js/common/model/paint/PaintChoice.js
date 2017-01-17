// Copyright 2016, University of Colorado Boulder

/**
 * Represents two colors that can be blended together with a different ratio. Provides parametric (0-1) computation of
 * colors in different blends.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Color = require( 'SCENERY/util/Color' );
  var Util = require( 'DOT/Util' );

  /**
   * Models mixing of watercolor paints with the weighted geometric mean, then with an applied gamma correction.
   * @private
   *
   * @param {number} x - First color component, from 0 to 255
   * @param {number} y - Second color component, from 0 to 255
   * @param {number} ratio - 0 means all first color, 1 means all second color
   * @returns {number} - The final color component
   */
  function gammaSubtract( x, y, ratio ) {
    var gamma = 2.2; // Could adjust in the future

    var linearX = Math.pow( x / 255, gamma );
    var linearY = Math.pow( y / 255, gamma );

    // Use the weighted geometric mean for subtractive color modeling.
    // See http://www.handprint.com/HP/WCL/color3.html#mixprofile and http://scottburns.us/subtractive-color-mixture/
    // We don't use a full spectra, but do the same thing component-wise.
    return 255 * Math.pow( Math.pow( linearX, 1 - ratio ) * Math.pow( linearY, ratio ), 1 / gamma );
  }

  /**
   * Mixes two colors with subtractive color modeling. See gammaSubtract for more information.
   * @private
   *
   * @param {Color} a - First color
   * @param {Color} b - Second color
   * @param {number} ratio - 0 means all first color, 1 means all second color
   * @returns {Color}
   */
  function blendSubtractiveRGBGamma( a, b, ratio ) {
    return new Color( gammaSubtract( a.red, b.red, ratio ),
                      gammaSubtract( a.green, b.green, ratio ),
                      gammaSubtract( a.blue, b.blue, ratio ) );
  }

  /**
   * Power-based blending function, see https://github.com/phetsims/proportion-playground/issues/45.
   * @private
   *
   * @param {number} ratio - From 0 to 1.
   * @param {number} power - The power level to apply (<1 compresses, >1 stretches, =1 has no change)
   * @returns {number}
   */
  function stretchRatio( ratio, power ) {
    if ( ratio <= 0.5 ) {
      return 0.5 * Math.pow( 2 * ratio, power );
    }
    else {
      return 1 - 0.5 * Math.pow( 2 * ( 1 - ratio ), power );
    }
  }

  /**
   * @constructor
   * @private
   *
   * @param {Color} leftColor
   * @param {Color} rightColor
   */
  function PaintChoice( leftColor, rightColor ) {
    // @public
    this.leftColor = leftColor;
    this.rightColor = rightColor;
  }

  proportionPlayground.register( 'PaintChoice', PaintChoice );

  inherit( Object, PaintChoice, {
    /**
     * @public
     *
     * @param {number} blendAmount - value between 0 (left color) and 1 (right color)
     * @returns {Color}
     */
    getColor: function( blendAmount ) {
      assert && assert( blendAmount >= 0 && blendAmount <= 1, 'Blend amount was out of bounds.' );

      return blendSubtractiveRGBGamma( this.leftColor, this.rightColor, stretchRatio( blendAmount, 1.8 ) );
    },

    /**
     * @public
     * TODO: Remove if still unused
     *
     * @param {number} blendAmount - value between 0 (left color) and 1 (right color)
     * @returns {Color}
     */
    oldGetColor: function( blendAmount ) {
      assert && assert( blendAmount >= 0 && blendAmount <= 1, 'Blend amount was out of bounds.' );

      // Cyan and Yellow combine to green in RGB
      var color = Color.interpolateRGBA( Color.BLUE, Color.YELLOW, blendAmount );

      // after blending, move cyans toward blues
      var greenCorrection = Util.linear( 0, 0.5, 1, 0, blendAmount ) * 255;
      if ( blendAmount > 0.5 ) {
        greenCorrection = 0;
      }

      // in the middle band, pull down the red and blue amount
      var halfWidthOfGreenBand = 0.2;
      var redBlueCorrection = 0;
      var minBand = 0.5 - halfWidthOfGreenBand;
      var maxBand = 0.5 + halfWidthOfGreenBand;
      var colorReduction = 128; // Drop red and blue but not so much that the green channel is saturated and there is no dynamic range
      if ( blendAmount > minBand && blendAmount <= 0.5 ) {
        redBlueCorrection = Util.linear( minBand, 0.5, 0, colorReduction, blendAmount );
      }
      else if ( blendAmount > 0.5 && blendAmount < maxBand ) {
        redBlueCorrection = Util.linear( 0.5, maxBand, colorReduction, 0, blendAmount );
      }

      return new Color( Math.max( color.red - redBlueCorrection, 0 ), Math.max( color.green - greenCorrection, 0 ), Math.max( color.blue - redBlueCorrection, 0 ) );
    }
  } );

  PaintChoice.BLUE = new Color( 0x05, 0x70, 0xFF );
  PaintChoice.YELLOW = new Color( 0xFF, 0xE0, 0x05 );
  PaintChoice.RED = new Color( 0xFF, 0x25, 0x05 );
  PaintChoice.BLACK = new Color( 0x25, 0x25, 0x25 );
  PaintChoice.WHITE = new Color( 0xFF, 0xFF, 0xFF );

  // Colors are unique instances for convenience later
  PaintChoice.BLUE_YELLOW = new PaintChoice( PaintChoice.BLUE.copy(), PaintChoice.YELLOW.copy() );
  PaintChoice.RED_YELLOW = new PaintChoice( PaintChoice.RED.copy(), PaintChoice.YELLOW.copy() );
  PaintChoice.BLACK_WHITE = new PaintChoice( PaintChoice.BLACK.copy(), PaintChoice.WHITE.copy() );

  PaintChoice.CHOICES = [
    PaintChoice.BLUE_YELLOW,
    PaintChoice.RED_YELLOW,
    PaintChoice.BLACK_WHITE
  ];

  return PaintChoice;
} );
