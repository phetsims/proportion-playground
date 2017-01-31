// Copyright 2014-2015, University of Colorado Boulder

/**
 * Colors for the Proportion Playground sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  var Color = require( 'SCENERY/util/Color' );

  // Initial colors for each profile, by string key. If a basics/projector color is not defined, it will take the
  // 'default' value provided.
  // NOTE: This is NOT provided to clients directly, but is passed to the PropertySet constructor.
  var ProportionPlaygroundColorProfile = new ColorProfile( {
    background: { default: new Color( '#fcf3eb' ) },

    apple: { default: new Color( 237, 28, 36 ) },
    appleCostPicker: { default: Color.BLACK },

    billiardsBorder: { default: new Color( 0x11, 0x11, 0x11 ) },
    billiardsInside: { default: new Color( 0x0A, 0x67, 0x39 ) },
    billiardsPath: { default: Color.WHITE },
    billiardsGripDots: { default: new Color( 102, 102, 102 ) },
    billiardsGridLine: { default: new Color( 102, 102, 102 ) },
    billiardsPocket: { default: new Color( 102, 102, 102 ) },
    billiardsBallMain: { default: Color.WHITE },
    billiardsBallHighlight: { default: Color.YELLOW },
    paintStroke: { default: Color.BLACK },

    // Paint colors (fill)
    // TODO: Isolate into six colors that don't have names?
    paintBlue: { default: new Color( 0x05, 0x70, 0xFF ) },
    paintYellow: { default: new Color( 0xFF, 0xE0, 0x05 ) },
    paintRed: { default: new Color( 0xFF, 0x25, 0x05 ) },
    paintBlack: { default: new Color( 0x25, 0x25, 0x25 ) },
    paintWhite: { default: new Color( 0xFF, 0xFF, 0xFF ) },

    // Bead colors
    necklaceRoundBead: { default: new Color( 'hsl(355,75%,53%)' ) },
    necklaceSquareBead: { default: new Color( 'hsl(206,65%,48%)' ) }
  }, [ 'default' ] );

  proportionPlayground.register( 'ProportionPlaygroundColorProfile', ProportionPlaygroundColorProfile );

  return ProportionPlaygroundColorProfile;
} );
