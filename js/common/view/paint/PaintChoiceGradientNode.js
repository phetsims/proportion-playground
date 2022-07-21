// Copyright 2016-2022, University of Colorado Boulder

/**
 * Displays a gradient of colors from the two extremes (from a single paintChoice)
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../../dot/js/Utils.js';
import { Image, Node, Rectangle } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';

class PaintChoiceGradientNode extends Node {
  /**
   * Rectangle that shows a given spectrum
   *
   * @param {number} width
   * @param {number} height
   * @param {PaintChoice} paintChoice
   * @param {Object} [options]
   */
  constructor( width, height, paintChoice, options ) {

    super();

    // {string} - Image for the current gradient colors.
    const imageUrlProperty = new DerivedProperty( [ paintChoice.leftColorProperty, paintChoice.rightColorProperty ], ( leftColor, rightColor ) => {
      const canvas = document.createElement( 'canvas' );
      const context = canvas.getContext( '2d' );
      canvas.width = width;
      canvas.height = height;

      // Fill it in one pixel at a time
      for ( let i = 0; i < height; i++ ) {
        const parameter = Utils.clamp( Utils.linear( 0, height, 0, 1, i ), 0, 1 );
        context.fillStyle = paintChoice.getBlendedColor( parameter ).toCSS();
        context.fillRect( 0, i, width, 1 );
      }

      return canvas.toDataURL();
    } );

    // Gradient (swap image when the colors change)
    const image = new Image( imageUrlProperty.value, {
      initialWidth: width,
      initialHeight: height
    } );
    imageUrlProperty.linkAttribute( image, 'image' );
    this.addChild( image );

    // Outline
    this.addChild( new Rectangle( 0, 0, width, height, { stroke: 'black', lineWidth: 2 } ) );

    this.mutate( options );
  }
}

proportionPlayground.register( 'PaintChoiceGradientNode', PaintChoiceGradientNode );

export default PaintChoiceGradientNode;