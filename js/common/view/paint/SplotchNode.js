// Copyright 2016-2022, University of Colorado Boulder

/**
 * Mutable node that shows a single paint splatter "splotch"
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../../axon/js/Multilink.js';
import Matrix3 from '../../../../../dot/js/Matrix3.js';
import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { Shape } from '../../../../../kite/js/imports.js';
import merge from '../../../../../phet-core/js/merge.js';
import { Color, Path } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import PaintChoice from '../../model/paint/PaintChoice.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';
import SceneRatioNode from '../SceneRatioNode.js';

// {Shape} SVG declaration for the splotch shape. Generated from AI file => cut shape => save svg => cut newlines.
let splotchShape = new Shape( 'M175.548,87.46c-2.652,3.387-4.599,8.469-0.975,12.482c3.643,4.034,8.46,1.764,11.977-0.388c6.346-3.881,1.241-0.534,7.13-5.117c7.318-5.694,13.795-4.323,17.793,4.046c2.696,5.641,1.031,8.84-5.098,10.066c-6.174,1.236-12.324,2.588-18.477,3.935c-0.798,0.175-1.777,0.417-2.26,0.981c-1.729,2.027-3.28,4.207-4.898,6.33c2.099,1.585,4.006,4.091,6.334,4.576c6.167,1.285,12.523,1.639,18.786,2.495c1.69,0.231,3.316,0.935,4.972,1.421c0.018,0.477,0.036,0.953,0.055,1.43c-1.242,0.352-2.479,0.725-3.727,1.053c-3.848,1.006-7.85,1.619-11.514,3.084c-4.927,1.969-5.336,4.534-1.449,8.096c9.553,8.754,20.298,14.904,33.725,15.479c3.374,0.144,7.044,1.089,9.9,2.798c1.76,1.053,3.432,4.554,2.963,6.399c-0.497,1.952-3.533,4.455-5.549,4.537c-2.844,0.115-6.529-0.992-8.533-2.938c-9.734-9.449-22.449-11.273-34.711-14.006c-3.004-0.67-6.744,1.183-9.9,2.475c-0.93,0.381-1.852,3.283-1.329,4.232c1.58,2.871,3.353,6.677,5.991,7.706c5.505,2.147,9.01,5.718,10.932,10.843c0.675,1.799-0.443,4.27-0.743,6.434c-2.123-0.378-4.853-0.062-6.239-1.279c-2.684-2.356-4.887-5.404-6.782-8.479c-2.231-3.619-7.937-7.49-11.847-6.582c-5.605,1.302-8.945,3.139-7.575,9.9c0.354,1.75,0.649,3.512,1.175,6.381c-3.296-1.469-5.717-2.611-8.188-3.635c-5.258-2.176-7.522-0.95-7.273,4.535c0.434,9.541,1.814,18.908,7.496,27.066c1.612,2.316,3.164,4.744,4.277,7.321c1.496,3.46,1.539,6.931-2.195,9.223c-3.411,2.094-8.797,1.282-10.66-2.12c-1.455-2.655-2.158-5.877-2.545-8.929c-0.604-4.769,0.077-9.815-1.2-14.345c-0.864-3.066-3.776-6.97-6.483-7.645c-2.082-0.518-6.139,2.859-7.804,5.471c-4.624,7.252-7.462,15.103-5.544,24.145c1.307,6.163-1.352,11.809-5.5,13.854c-4.072,2.008-7.643,0.488-8.096-4.001c-0.308-3.047,0.1-6.363,1.014-9.302c5.025-16.164,4.215-19.184-8.766-29.479c-8.654-6.865-24.182,0.414-33.848,5.763c-0.835,0.461-1.717,0.839-3.248,1.582c0-2.451-0.023-4.336,0.004-6.221c0.084-5.889,3.645-18.248-1.932-20.153c-10.764-3.676-32.707,8.215-43.582,10.267c-1.518,0.286-2.9,2.368-3.939,3.896c-2.844,4.176-7.365,6.137-11.648,4.33c-4.013-1.691-6.356-4.798-5.973-9.4c0.537-6.442,6.281-9.333,12.01-5.535c3.11,2.061,5.361,1.895,8.045-0.062c6.568-4.791,24.639-20.029,30.617-25.468c9.883-8.991,8.709-16.622-2.848-23.353c-2.664-1.551-5.586-2.66-9.576-4.529c2.318-1.109,3.485-1.908,4.771-2.235c3.28-0.832,6.855-2.278,6.137-5.911c-0.542-2.737-3.165-6.37-5.646-7.168c-7.207-2.32-14.805-3.434-22.258-4.98c-3.084-0.639-6.297-0.85-9.259-1.834c-5.11-1.698-6.97-5.312-5.415-9.525c1.588-4.305,5.395-6.268,10.192-4.203c5.632,2.423,10.903,5.688,16.313,8.621c2.339,1.268,4.578,2.728,6.955,3.918c8.732,4.373,11.553,3.791,17.592-3.453c5.058-6.068,5.144-11.299,0.123-18.111c-2.117-2.872-4.467-5.572-6.116-9.473c2.448,0.549,5.005,0.814,7.329,1.692c13.615,5.146,6.604-17.941,4.469-26.97c-0.414-1.751-1.07-4.021-2.15-5.748c-0.941-1.504-3.145-2.355-3.745-3.9c-0.89-2.289-1.644-5.191-0.951-7.349c0.513-1.599,3.644-3.62,5.21-3.325c2.442,0.458,5.031,2.332,6.634,4.344c1.169,1.467,0.438,4.23,1.197,6.244c1.607,4.263,7.323,10.848,8.907,12.201c5.684,4.858,18.543,11.651,23.102,11.607c3.336-0.033,7.303-4.781,6.898-9.233c-0.535-5.883-2.037-11.71-3.5-17.465c-0.938-3.69-2.674-7.169-3.814-10.817c-0.534-1.713-0.792-3.619-0.677-5.406c0.349-5.422,4.169-9.926,8.329-9.66c5.32,0.34,6.951,4.461,7.093,8.758c0.186,5.613-0.306,11.281-0.899,16.884c-0.822,7.767,0.078,14.958,5.357,21.13c2.654,3.102,6.229,5.846,9.891,4.038c2.776-1.371,5.768-5.224,6.043-8.213c0.927-10.071,0.71-20.249,0.875-30.387c0.072-4.454,0.012-8.911,0.012-13.993c0,0,1.56-5.787,9.365-8.598c9.375-3.375,9.625,8.47,9.625,8.47s-0.082,0.642-1.079,4.55c-1.801,7.057-5.226,13.684-7.333,20.683c-2.335,7.757-4.174,15.687-5.741,23.636c-0.446,2.262,0.81,4.858,1.285,7.301c0.784,0.396,1.504,1.409,2.354,1.188c4.289-1.117,13.07-9.568,13.74-9.106c0,1.343-5.031,10.494-4.715,13.927c0.681,7.389,20.323-3.229,30.99-5.562L175.548,87.46z' );

// {number} - The approximate desired Shape area before scaling is applied
const TARGET_SHAPE_AREA = 12300;

// {number} - The area of splotchShape, computed with getApproximateArea()
const RAW_SHAPE_AREA = 21426.8;

// {number} - The position of the centroid of splotchShape (the 'center' of all of its included areas),
//            computed by Shape.getApproximateCentroid()
const SPLOTCH_CENTROID = new Vector2( 117.37949080493232, 126.91260432847004 );

// Remap the shape so that it has the target area, has its centroid at the origin, and has the desired rotation.
splotchShape = splotchShape.transformed( Matrix3.scaling( Math.sqrt( TARGET_SHAPE_AREA / RAW_SHAPE_AREA ) )
  .timesMatrix( Matrix3.rotation2( 0.7 ) )
  .timesMatrix( Matrix3.translation( -SPLOTCH_CENTROID.x, -SPLOTCH_CENTROID.y ) ) );

// {Color} - Because {Property.<null>} is not supported as a fill.
const TRANSPARENT_COLOR = new Color( 'transparent' );

class SplotchNode extends SceneRatioNode {
  /**
   * @param {Splotch} splotch - Our model
   * @param {Property.<PaintChoice>} paintChoiceProperty - Holds our current paint choice
   * @param {Object} [options] - node options
   */
  constructor( splotch, paintChoiceProperty, options ) {
    super( splotch );

    // @public {Splotch}
    this.splotch = splotch;

    options = merge( {
      useVisibleAmounts: false
    }, options );

    // Use different properties based on whether we are viewing visible amounts
    const leftColorProperty = options.useVisibleAmounts ? splotch.visibleLeftColorProperty : splotch.leftColorCountProperty;
    const rightColorProperty = options.useVisibleAmounts ? splotch.visibleRightColorProperty : splotch.rightColorCountProperty;

    const watchedProperties = [ leftColorProperty, rightColorProperty, paintChoiceProperty ].concat( PaintChoice.COLORS );
    const colorProperty = new DerivedProperty( watchedProperties, ( leftColorAmount, rightColorAmount, paintChoice ) => {
      const total = leftColorAmount + rightColorAmount;
      if ( total > 0 ) {
        return paintChoice.getBlendedColor( Utils.clamp( rightColorAmount / total, 0, 1 ) );
      }
      else {
        return TRANSPARENT_COLOR;
      }
    } );

    const splotchPath = new Path( splotchShape, {
      stroke: ProportionPlaygroundColors.paintStrokeProperty,
      lineWidth: 0.7,
      fill: colorProperty
    } );
    this.addChild( splotchPath );

    // When the color amounts change, update the size and color of the splotch.
    Multilink.multilink( [ leftColorProperty, rightColorProperty ], ( leftColor, rightColor ) => {
      const total = leftColor + rightColor;

      // Don't fully zero our transform
      if ( total > 0 ) {
        splotchPath.setScaleMagnitude( SplotchNode.colorTotalToSplotchScale( total ) );
      }
      splotchPath.visible = total > 0;
    } );

    this.mutate( options );
  }


  /**
   * Converts the total amount of paint to the scale of our splotch. Increasing scale increases the area
   * quadratically, so we use sqrt().
   * @private
   *
   * @param {number} totalPaint
   * @returns {number} - Scale
   */
  static colorTotalToSplotchScale( totalPaint ) {
    const maxScale = 1.6;
    // Scale is square-root of count, since the area is proportional to scale squared. Assume two full paint counts.
    return maxScale * Math.sqrt( totalPaint ) / Math.sqrt( 2 * ProportionPlaygroundConstants.PAINT_COUNT_RANGE.max );
  }

  /**
   * Returns the view area taken up by a splotch with only one unit of paint (as we'll want balloons and drips to
   * have this same area).
   * @public
   *
   * @returns {number}
   */
  static getSingleSplotchArea() {
    const scale = SplotchNode.colorTotalToSplotchScale( 1 );
    return scale * scale * TARGET_SHAPE_AREA; // Area proportional to scale squared
  }
}

proportionPlayground.register( 'SplotchNode', SplotchNode );

export default SplotchNode;
