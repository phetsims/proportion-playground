// Copyright 2016, University of Colorado Boulder

/**
 * Provides a utility function that gives blue->green->yellow color map as a function of a parametric (0-1) value.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Color = require( 'SCENERY/util/Color' );
  var Util = require( 'DOT/Util' );

  // constants
  var cyan = new Color( 0, 255, 255 );
  var yellow = new Color( 255, 255, 0 );

  /**
   *
   * @constructor
   */
  function ColorMap() {
  }

  proportionPlayground.register( 'ColorMap', ColorMap );

  return inherit( Object, ColorMap, {}, {

    /**
     *
     * @param {number} blendAmount - value between 0 (blue) and 1 (yellow)
     * @returns {Color}
     * @public
     */
    getColor: function( blendAmount ) {
      assert && assert( blendAmount >= 0 && blendAmount <= 1, 'Blend amount was out of bounds.' );

      // Cyan and Yellow combine to green in RGB
      var color = Color.interpolateRGBA( cyan, yellow, blendAmount );

      // after blending, move cyans toward blues
      var amountToSubtract = Util.linear( 0, 0.5, 1, 0, blendAmount ) * 255;
      if ( blendAmount > 0.5 ) {
        amountToSubtract = 0;
      }

      // in the middle band, pull down the red and blue amount
      var widthOfGreenColorBand = 0.2;
      var rbSubtract = 0;
      var minBand = 0.5 - widthOfGreenColorBand;
      var maxBand = 0.5 + widthOfGreenColorBand;
      var colorReduction = 64; // Drop red and blue but not so much that the green channel is saturated and there is no dynamic range
      if ( blendAmount > minBand && blendAmount <= 0.5 ) {
        rbSubtract = Util.linear( minBand, 0.5, 0, colorReduction, blendAmount );
      }
      else if ( blendAmount > 0.5 && blendAmount < maxBand ) {
        rbSubtract = Util.linear( 0.5, maxBand, colorReduction, 0, blendAmount );
      }

      return new Color( Math.max( color.red - rbSubtract, 0 ), Math.max( color.green - amountToSubtract, 0 ), Math.max( color.blue - rbSubtract, 0 ) );
    }
  } );
} );