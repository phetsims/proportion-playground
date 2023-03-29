// Copyright 2016-2023, University of Colorado Boulder

/**
 * Represents two colors that can be blended together with a different ratio. Provides parametric (0-1) computation of
 * colors in different blends.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import { Color } from '../../../../../scenery/js/imports.js';
import PhetioObject from '../../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import IOType from '../../../../../tandem/js/types/IOType.js';
import StringIO from '../../../../../tandem/js/types/StringIO.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundColors from '../../view/ProportionPlaygroundColors.js';
import Side from '../Side.js';

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
  const gamma = 2.2; // Could adjust in the future

  const linearX = Math.pow( x / 255, gamma );
  const linearY = Math.pow( y / 255, gamma );

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

class PaintChoice extends PhetioObject {
  /**
   * @private
   *
   * @param {Property.<Color>} leftColorProperty
   * @param {Property.<Color>} rightColorProperty
   */
  constructor( leftColorProperty, rightColorProperty, tandem ) {
    super( {
      tandem: tandem,
      phetioType: PaintChoiceIO
    } );

    // @public
    this.leftColorProperty = leftColorProperty;
    this.rightColorProperty = rightColorProperty;
  }

  /**
   * @public
   *
   * @param {number} blendAmount - value between 0 (left color) and 1 (right color)
   * @returns {Color}
   */
  getBlendedColor( blendAmount ) {
    assert && assert( blendAmount >= 0 && blendAmount <= 1, 'Blend amount was out of bounds.' );

    return blendSubtractiveRGBGamma( this.leftColorProperty.value,
      this.rightColorProperty.value,
      stretchRatio( blendAmount, 2.0 ) );
  }

  /**
   * Returns either the left or right color property, depending on what side is requested.
   * @public
   *
   * @param {Side} side
   * @returns {Property.<Color>}
   */
  getColorProperty( side ) {
    assert && assert( Side.includes( side ) );

    return side === Side.LEFT ? this.leftColorProperty : this.rightColorProperty;
  }

  /**
   * @public
   *
   * @param {Property.<PaintChoice>} paintChoiceProperty
   * @param {Side} side
   * @returns {Property.<Color>}
   */
  static getActiveColorProperty( paintChoiceProperty, side ) {
    const dependencies = [ paintChoiceProperty ].concat( PaintChoice.CHOICES.map( paintChoice => paintChoice.getColorProperty( side ) ) );

    return new DerivedProperty( _.uniq( dependencies ), () => paintChoiceProperty.value.getColorProperty( side ).value );
  }
}

const PaintChoiceIO = new IOType( 'PaintChoiceIO', {
  valueType: PaintChoice,
  documentation: 'A combination of a left and right effective color',
  toStateObject( paintChoice ) {
    return {
      _choice: ( paintChoice === PaintChoice.BLUE_YELLOW ) ? 'BLUE_YELLOW' : ( paintChoice === PaintChoice.RED_YELLOW ? 'RED_YELLOW' : 'BLACK_WHITE' )
    };
  },
  stateSchema: {
    _choice: StringIO
  },
  fromStateObject( stateObject ) {
    return PaintChoice[ stateObject._choice ];
  }
} );
PaintChoice.PaintChoiceIO = PaintChoiceIO;

proportionPlayground.register( 'PaintChoice', PaintChoice );

PaintChoice.BLUE = ProportionPlaygroundColors.paintBlueProperty;
PaintChoice.YELLOW = ProportionPlaygroundColors.paintYellowProperty;
PaintChoice.RED = ProportionPlaygroundColors.paintRedProperty;
PaintChoice.BLACK = ProportionPlaygroundColors.paintBlackProperty;
PaintChoice.WHITE = ProportionPlaygroundColors.paintWhiteProperty;

// Assign unique IDs to the individual paints, so that they can be differentiated for balloon handling.
PaintChoice.BLUE.paintId = 1;
PaintChoice.YELLOW.paintId = 2;
PaintChoice.RED.paintId = 3;
PaintChoice.BLACK.paintId = 4;
PaintChoice.WHITE.paintId = 5;

PaintChoice.BLUE_YELLOW = new PaintChoice( PaintChoice.BLUE, PaintChoice.YELLOW, Tandem.GLOBAL_MODEL.createTandem( 'blueYellowPaintChoice' ) );
PaintChoice.RED_YELLOW = new PaintChoice( PaintChoice.RED, PaintChoice.YELLOW, Tandem.GLOBAL_MODEL.createTandem( 'redYellowPaintChoice' ) );
PaintChoice.BLACK_WHITE = new PaintChoice( PaintChoice.BLACK, PaintChoice.WHITE, Tandem.GLOBAL_MODEL.createTandem( 'blackWhitePaintChoice' ) );

PaintChoice.CHOICES = [
  PaintChoice.BLUE_YELLOW,
  PaintChoice.RED_YELLOW,
  PaintChoice.BLACK_WHITE
];

PaintChoice.COLORS = [
  PaintChoice.BLUE,
  PaintChoice.YELLOW,
  PaintChoice.RED,
  PaintChoice.BLACK,
  PaintChoice.WHITE
];

export default PaintChoice;