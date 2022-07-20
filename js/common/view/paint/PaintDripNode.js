// Copyright 2016-2022, University of Colorado Boulder

/**
 * A drip of paint, falls from the splotch and disappears once off-screen.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { Shape } from '../../../../../kite/js/imports.js';
import { Node, Path } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import PaintChoice from '../../model/paint/PaintChoice.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';
import SplotchNode from './SplotchNode.js';

// {number} - Area of a single splotch (view coordinates)
const SPLOTCH_AREA = SplotchNode.getSingleSplotchArea();

// {number} - Area of our raw dropletShape (via Shape.getApproximateArea()) with the below parameters.
const SHAPE_AREA = 1486.21309056;

// Constants for creating the droplet shape.
const xRadius = 22; // the radius of the "bottom" part of the droplet
const yRadius = 18; // the half-width of the droplet
const yTail = 3; // slight control-point width near the pointed tip (so it isn't as pointy)
const cp1x = xRadius * 0.84;
const cp2x = xRadius * 1.12;
const endX = xRadius * 2.1;

// {Shape} - Droplet shape
const dropletShape = new Shape().ellipticalArc( 0, 0, xRadius, yRadius, 0, Math.PI / 2, 3 * Math.PI / 2, false )
  .cubicCurveTo( cp1x, -yRadius, cp2x, -yTail, endX, 0 )
  .cubicCurveTo( cp2x, yTail, cp1x, yRadius, 0, yRadius )
  .close().makeImmutable();

class PaintDripNode extends Node {
  /**
   * @param {PaintDrip} paintDrip - Our paint drip
   * @param {Property.<PaintChoice>} paintChoiceProperty - The current paint choice
   */
  constructor( paintDrip, paintChoiceProperty ) {
    super();

    // @public {PaintDrip}
    this.paintDrip = paintDrip;

    // @private {Property.<PaintChoice>}
    this.paintChoiceProperty = paintChoiceProperty;

    // @private {Property.<Color>} - We'll need to dispose of this properly
    this.fillColorProperty = PaintChoice.getActiveColorProperty( paintChoiceProperty, paintDrip.side );

    // @private {Path}
    this.path = new Path( dropletShape, {
      scale: Math.sqrt( SPLOTCH_AREA / SHAPE_AREA ),
      rotation: -Math.PI / 2,
      stroke: ProportionPlaygroundColors.paintStrokeProperty,
      lineWidth: 0.6,
      fill: this.fillColorProperty
    } );
    this.addChild( this.path );
  }

  /**
   * Positions the paint drip, given the splotchCenter and the bottom of the screen
   * (so that if the drip goes off the bottom, we can remove it and stop tracking it).
   * @public
   *
   * @param {Vector2} splotchCenter
   * @param {number} bottomCutoffY - Y value of the bottom of the layout area, so if we are below it wouldn't be visible
   */
  position( splotchCenter, bottomCutoffY ) {
    // horizontally, just center under the splotch
    this.centerX = splotchCenter.x;

    const time = this.paintDrip.timeElapsed;
    const bottomDistance = time * time * 1600; // acceleration at 1600 view units / s^2

    // constants control the bottom position of the droplet, so that it looks like it comes from the bottom of the splotch
    this.y = splotchCenter.y + 8 + bottomDistance - 22 + 12 * Math.sqrt( this.paintDrip.initialSplotchArea );

    // Don't zero out the drip's transform with setScaleMagnitude( 0 ). Instead we control visibility then.
    const hasPaint = this.paintDrip.drippedAmount > 0;
    this.visible = hasPaint;
    if ( hasPaint ) {
      this.setScaleMagnitude( this.paintDrip.drippedAmount );
    }

    if ( this.top > bottomCutoffY ) {
      this.paintDrip.remove();
    }
  }

  /**
   * Releases references.
   * @public
   * @override
   */
  dispose() {
    this.path.fill = null; // We need to release the listener to the color property first (for now).
    this.fillColorProperty.dispose();

    super.dispose();
  }
}

proportionPlayground.register( 'PaintDripNode', PaintDripNode );

export default PaintDripNode;