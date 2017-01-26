// Copyright 2016, University of Colorado Boulder

/**
 * Mutable node that shows a single paint splatter "splotch"
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Vector2 = require( 'DOT/Vector2' );
  var Property = require( 'AXON/Property' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );

  // SVG declaration for the splotch shape. Generated from AI file => cut shape => save svg => cut newlines.
  // Removed a discontinuity manually. Represented as kite shape so we can easily change color.
  var splotchShapeArea = 12310.8; // tested with monte-carlo
  //TODO: remove comments?
  // var splotchShape = new Shape( 'M185.896,45.544c0,1.034,0,2.064,0,3.1c-0.568,1.584-1.005,3.216-1.9,4.68 c-0.696,1.133-1.621,1.717-2.934,1.599c-1.438-0.128-2.883-0.245-4.299-0.517c-13.071-2.469-24.543,1.724-35.297,8.607 c-3.462,2.212-3.393,6.319-0.154,8.847c1.262,0.982,2.608,1.866,3.793,2.931c2.743,2.475,2.626,6.587-0.198,8.963 c-0.902,0.764-1.878,1.445-2.798,2.197c-4.104,3.359-3.877,7.211,0.663,9.979c3.415,2.079,7.079,2.96,11.113,2.135 c2.465-0.503,4.974-1.093,7.511-0.591c6.448,1.272,10.938,5.065,13.677,10.955c3.077,6.62,2.799,13.618,1.529,20.495 c-1.107,6.011-6.814,7.661-11.436,3.696c-1.181-1.016-2.127-2.229-3-3.521c-2.927-4.32-4.093-9.294-5.406-14.227 c-0.638-2.398-1.511-4.717-3.125-6.664c-2.941-3.547-6.99-5.179-11.244-6.39c-3.822-1.093-6.455,0.107-8.362,3.62 c-1.761,3.239-1.101,6.254,0.829,9.166c2.791,4.21,5.985,8.149,8.512,12.543c1.677,2.912,2.732,5.993,2.806,9.374 c0.022,1.346-0.278,2.626-1.346,3.484c-1.684,1.35-3.612,2.212-5.82,2.186c-3.315-0.036-5.406-1.906-5.839-5.178 c-0.11-0.814-0.184-1.64-0.275-2.458c-0.414-3.792-0.648-7.628-1.833-11.277c-1.368-4.222-4.207-7.09-8.707-7.537 c-4.779-0.474-7.592,1.35-7.064,6.378c0.162,1.54,0.238,3.088,0.29,4.636c0.081,2.267-0.558,3.188-2.729,4.107 c-2.076,0.877-3.165,0.69-4.731-0.928c-1.977-2.039-3.176-4.555-4.287-7.118c-0.965-2.22-1.441-4.621-2.534-6.797 c-0.708-1.4-1.71-2.303-3.393-2.196c-1.765,0.11-3.019,0.921-3.672,2.597c-0.608,1.551-0.976,3.146-0.982,4.822 c-0.008,4.156,1.452,7.978,2.633,11.869c2.179,7.129,5.755,13.661,8.74,20.446c1.147,2.619,1.742,5.292,1.001,8.12 c-0.528,2.024-1.849,3.33-3.895,3.76c-1.871,0.389-2.927-0.811-3.914-2.172c-2.894-3.979-3.634-8.578-3.932-13.306 c-0.535-8.567-1.573-17.047-4.353-25.226c-1.173-3.47-2.464-6.896-4.39-10.035c-1.056-1.72-2.193-2.035-4.086-1.342 c-1.777,0.652-2.906,1.984-3.537,3.675c-1.165,3.117-1.35,6.249,0.515,9.213c2.657,4.222,4.172,8.711,3.473,13.786 c-0.286,2.08-0.876,2.868-2.897,3.514c-2.217,0.708-4.483,0.635-6.746,0.396c-2.342-0.246-3.635-1.672-4.268-3.881 c-0.744-2.6-0.273-5.112,0.415-7.609c0.888-3.229,2.1-6.371,2.52-9.716c0.396-3.165,0.2-6.198-2.156-8.688 c-1.837-1.937-2.991-1.845-4.559,0.359c-1.021,1.434-1.821,2.996-2.5,4.613c-3.649,8.711-5.694,17.84-7.104,27.145 c-0.936,6.165-1.561,12.385-3.055,18.455c-1.3,5.277-4.5,8.711-9.991,9.716c-2.738,0.502-4.658-0.668-5.454-3.305 c-0.719-2.365-0.792-4.765-0.244-7.185c0.603-2.666,2.079-4.922,3.433-7.226c3.785-6.447,7.664-12.837,10.695-19.691 c3.803-8.615,6.143-17.703,8.702-26.722c0.271-0.969,0.456-1.823-0.552-2.446c-1.071-0.66-2.08-0.437-2.985,0.322 c-0.814,0.689-1.179,1.673-1.575,2.626c-1.421,3.434-4.37,4.471-7.713,2.729c-2.142-1.118-2.732-2.307-2.319-4.654 c0.277-1.573,0.638-3.139,0.814-4.724c0.332-2.967-1.597-6.268-4.071-7.159c-2.331-0.836-4.286,0.114-6.378,3.106 c-0.118,0.169-0.229,0.345-0.343,0.518c-1.758,2.677-3.719,5.204-5.78,7.654c-1.598,1.896-3.226,3.767-5.298,5.179 c-2.69,1.83-4.982,1.566-7.128-0.844c-0.446-0.499-0.873-1.027-1.225-1.592c-1.691-2.678-1.242-5.233,1.188-7.247 c2.619-2.168,5.68-3.518,8.766-4.834c2.606-1.107,5.302-2.058,7.577-3.807c2.854-2.197,4.631-4.937,4.383-8.722 c-0.196-3.026-2.455-4.295-5.054-2.773c-1.038,0.605-1.917,1.398-2.722,2.274c-2.134,2.325-3.937,4.911-5.862,7.397 c-1.362,1.761-2.771,3.466-4.601,4.775c-4.904,3.518-12.266,2.031-15.433-3.066C1.109,93.513,0.695,91.939,0,90.469 c0-1.859,0-3.716,0-5.575c0.791-2.204,1.986-4.1,3.805-5.645c3.331-2.824,7.308-3.598,11.476-3.972 c5.542-0.495,11.142-0.495,16.581-1.866c4.642-1.174,9.283-2.366,13.635-4.431c1.168-0.558,2.215-1.332,2.154-2.755 c-0.066-1.488-1.17-2.351-2.398-2.989c-0.442-0.228-0.976-0.333-1.478-0.385c-3.591-0.382-7.192-0.664-10.77-1.118 c-2.613-0.338-4.88-3.565-4.412-6.037c0.488-2.586,2.771-3.774,5.91-3.066c1.372,0.312,2.588,0.99,3.787,1.694 c3.024,1.782,6.062,3.536,9.49,4.431c2.205,0.579,4.126-0.158,5.641-1.713c1.379-1.419,0.977-3.184,0.328-4.801 c-2.125-5.274-5.521-9.51-10.443-12.434c-1.375-0.817-2.806-1.559-3.994-2.633c-7.187-6.499-8.722-14.74-7.234-23.861 c0.218-1.328,0.961-2.502,1.736-3.602c2.193-3.1,5.527-3.492,8.397-0.99c1.817,1.584,2.905,3.616,3.295,5.971 c0.781,4.728,1.577,9.455,2.203,14.208c0.715,5.432,2.939,10.038,6.934,13.79c0.908,0.858,1.874,1.633,3.041,2.091 c2.217,0.869,4.243-0.466,4.34-2.831c0.029-0.723-0.042-1.438-0.24-2.146c-1.318-4.771-1.639-9.506,0.229-14.256 c1.942-4.936,1.106-9.579-1.722-13.988c-1.08-1.683-2.156-3.381-2.769-5.332C57.026,4.65,57.433,3.422,58.55,2.3 c0.992-0.998,2.287-1.522,3.417-2.3c0.656,0.631,0.954,1.372,0.994,2.311 c0.181,3.972,0.172,7.947,0.088,11.919c-0.068,3.074,0.513,5.924,2.166,8.561c1.801,2.872,2.917,6.019,3.367,9.386 c0.189,1.431,0.369,2.864,0.464,4.302c0.112,1.684,0.818,2.876,2.521,3.261c1.886,0.422,3.846,0.821,5.3-0.938 c1.28-1.552,2.38-3.246,3.62-4.83c1.991-2.55,4.438-3.921,7.819-3.049c1.316,0.338,2.358,1.02,3.305,1.904 c1.536,1.43,3.268,1.584,5.175,0.961c1.401-0.459,2.586-1.247,3.631-2.281c1.504-1.486,2.003-3.198,1.232-5.216 c-0.564-1.489-1.115-2.993-1.698-4.478c-0.788-2.028-1.001-4.098-0.443-6.213c0.502-1.896,1.122-3.752,1.943-5.535 c2.112-4.596,4.6-6.096,9.639-5.799c5.964,0.356,9.085,4.731,7.46,10.49c-0.829,2.93-2.12,5.695-3.14,8.557 c-1.093,3.055-2.3,6.08-2.406,9.393c-0.124,3.733,2.003,5.912,5.109,7.371c2.879,1.354,5.087-0.062,7.082-1.943 c1.621-1.521,3.146-3.132,4.728-4.694c0.957-0.95,2.006-1.782,3.297-2.248c2.087-0.756,4.453,0.117,5.282,1.943 c2.002,4.394,1.181,8.494-2.289,11.854c-2.149,2.087-4.797,3.125-7.585,3.965c-2.028,0.608-4.049,1.276-5.589,2.847 c-1.907,1.951-1.805,4.452,0.249,6.245c0.785,0.69,1.694,1.171,2.699,1.452c4.24,1.192,8.091,0.199,11.554-2.303 c4.225-3.052,8.314-6.282,12.499-9.382c5.854-4.335,11.964-8.105,19.515-8.645c2.535-0.184,5.051-0.202,7.552,0.275 C182.735,40.104,184.8,42.302,185.896,45.544z' );
  var newSplotchShapeArea = 21426.8; // also monte-carlo
  var newSplotchCentroid = new Vector2( 117.37949080493232, 126.91260432847004 );
  var splotchShape = new Shape( 'M175.548,87.46c-2.652,3.387-4.599,8.469-0.975,12.482c3.643,4.034,8.46,1.764,11.977-0.388c6.346-3.881,1.241-0.534,7.13-5.117c7.318-5.694,13.795-4.323,17.793,4.046c2.696,5.641,1.031,8.84-5.098,10.066c-6.174,1.236-12.324,2.588-18.477,3.935c-0.798,0.175-1.777,0.417-2.26,0.981c-1.729,2.027-3.28,4.207-4.898,6.33c2.099,1.585,4.006,4.091,6.334,4.576c6.167,1.285,12.523,1.639,18.786,2.495c1.69,0.231,3.316,0.935,4.972,1.421c0.018,0.477,0.036,0.953,0.055,1.43c-1.242,0.352-2.479,0.725-3.727,1.053c-3.848,1.006-7.85,1.619-11.514,3.084c-4.927,1.969-5.336,4.534-1.449,8.096c9.553,8.754,20.298,14.904,33.725,15.479c3.374,0.144,7.044,1.089,9.9,2.798c1.76,1.053,3.432,4.554,2.963,6.399c-0.497,1.952-3.533,4.455-5.549,4.537c-2.844,0.115-6.529-0.992-8.533-2.938c-9.734-9.449-22.449-11.273-34.711-14.006c-3.004-0.67-6.744,1.183-9.9,2.475c-0.93,0.381-1.852,3.283-1.329,4.232c1.58,2.871,3.353,6.677,5.991,7.706c5.505,2.147,9.01,5.718,10.932,10.843c0.675,1.799-0.443,4.27-0.743,6.434c-2.123-0.378-4.853-0.062-6.239-1.279c-2.684-2.356-4.887-5.404-6.782-8.479c-2.231-3.619-7.937-7.49-11.847-6.582c-5.605,1.302-8.945,3.139-7.575,9.9c0.354,1.75,0.649,3.512,1.175,6.381c-3.296-1.469-5.717-2.611-8.188-3.635c-5.258-2.176-7.522-0.95-7.273,4.535c0.434,9.541,1.814,18.908,7.496,27.066c1.612,2.316,3.164,4.744,4.277,7.321c1.496,3.46,1.539,6.931-2.195,9.223c-3.411,2.094-8.797,1.282-10.66-2.12c-1.455-2.655-2.158-5.877-2.545-8.929c-0.604-4.769,0.077-9.815-1.2-14.345c-0.864-3.066-3.776-6.97-6.483-7.645c-2.082-0.518-6.139,2.859-7.804,5.471c-4.624,7.252-7.462,15.103-5.544,24.145c1.307,6.163-1.352,11.809-5.5,13.854c-4.072,2.008-7.643,0.488-8.096-4.001c-0.308-3.047,0.1-6.363,1.014-9.302c5.025-16.164,4.215-19.184-8.766-29.479c-8.654-6.865-24.182,0.414-33.848,5.763c-0.835,0.461-1.717,0.839-3.248,1.582c0-2.451-0.023-4.336,0.004-6.221c0.084-5.889,3.645-18.248-1.932-20.153c-10.764-3.676-32.707,8.215-43.582,10.267c-1.518,0.286-2.9,2.368-3.939,3.896c-2.844,4.176-7.365,6.137-11.648,4.33c-4.013-1.691-6.356-4.798-5.973-9.4c0.537-6.442,6.281-9.333,12.01-5.535c3.11,2.061,5.361,1.895,8.045-0.062c6.568-4.791,24.639-20.029,30.617-25.468c9.883-8.991,8.709-16.622-2.848-23.353c-2.664-1.551-5.586-2.66-9.576-4.529c2.318-1.109,3.485-1.908,4.771-2.235c3.28-0.832,6.855-2.278,6.137-5.911c-0.542-2.737-3.165-6.37-5.646-7.168c-7.207-2.32-14.805-3.434-22.258-4.98c-3.084-0.639-6.297-0.85-9.259-1.834c-5.11-1.698-6.97-5.312-5.415-9.525c1.588-4.305,5.395-6.268,10.192-4.203c5.632,2.423,10.903,5.688,16.313,8.621c2.339,1.268,4.578,2.728,6.955,3.918c8.732,4.373,11.553,3.791,17.592-3.453c5.058-6.068,5.144-11.299,0.123-18.111c-2.117-2.872-4.467-5.572-6.116-9.473c2.448,0.549,5.005,0.814,7.329,1.692c13.615,5.146,6.604-17.941,4.469-26.97c-0.414-1.751-1.07-4.021-2.15-5.748c-0.941-1.504-3.145-2.355-3.745-3.9c-0.89-2.289-1.644-5.191-0.951-7.349c0.513-1.599,3.644-3.62,5.21-3.325c2.442,0.458,5.031,2.332,6.634,4.344c1.169,1.467,0.438,4.23,1.197,6.244c1.607,4.263,7.323,10.848,8.907,12.201c5.684,4.858,18.543,11.651,23.102,11.607c3.336-0.033,7.303-4.781,6.898-9.233c-0.535-5.883-2.037-11.71-3.5-17.465c-0.938-3.69-2.674-7.169-3.814-10.817c-0.534-1.713-0.792-3.619-0.677-5.406c0.349-5.422,4.169-9.926,8.329-9.66c5.32,0.34,6.951,4.461,7.093,8.758c0.186,5.613-0.306,11.281-0.899,16.884c-0.822,7.767,0.078,14.958,5.357,21.13c2.654,3.102,6.229,5.846,9.891,4.038c2.776-1.371,5.768-5.224,6.043-8.213c0.927-10.071,0.71-20.249,0.875-30.387c0.072-4.454,0.012-8.911,0.012-13.993c0,0,1.56-5.787,9.365-8.598c9.375-3.375,9.625,8.47,9.625,8.47s-0.082,0.642-1.079,4.55c-1.801,7.057-5.226,13.684-7.333,20.683c-2.335,7.757-4.174,15.687-5.741,23.636c-0.446,2.262,0.81,4.858,1.285,7.301c0.784,0.396,1.504,1.409,2.354,1.188c4.289-1.117,13.07-9.568,13.74-9.106c0,1.343-5.031,10.494-4.715,13.927c0.681,7.389,20.323-3.229,30.99-5.562L175.548,87.46z' );
  // Put origin at zero
  splotchShape = splotchShape.transformed( Matrix3.scaling( Math.sqrt( splotchShapeArea / newSplotchShapeArea ) )
                                                  .timesMatrix( Matrix3.rotation2( 0.7 ) )
                                                  .timesMatrix( Matrix3.translation( -newSplotchCentroid.x, -newSplotchCentroid.y ) ) );

  /**
   * @param {Splotch} splotch - Our model
   * @param {Property.<PaintChoice>} paintChoiceProperty - Holds our current paint choice
   * @param {Object} [options] - node options
   * @constructor
   */
  function SplotchNode( splotch, paintChoiceProperty, options ) {
    SceneRatioNode.call( this, splotch );

    options = _.extend( {
      useVisibleAmounts: false
    }, options );

    // Use different properties based on whether we are viewing visible amounts
    var leftColorProperty = options.useVisibleAmounts ? splotch.visibleLeftColorProperty : splotch.leftColorCountProperty;
    var rightColorProperty = options.useVisibleAmounts ? splotch.visibleRightColorProperty : splotch.rightColorCountProperty;

    var splotchPath = new Path( splotchShape, { stroke: 'black', lineWidth: 0.7 } );
    this.addChild( splotchPath );

    this.splotch = splotch;

    /**
     * Update the fill of the splotch.
     */
    var updateFill = function() {
      var leftColorAmount = leftColorProperty.value;
      var rightColorAmount = rightColorProperty.value;

      var total = leftColorAmount + rightColorAmount;
      var blendAmount = rightColorAmount / total;

      if ( total > 0 ) {
        splotchPath.fill = paintChoiceProperty.value.getColor( blendAmount );
      }
      else {
        splotchPath.fill = null;
      }
    };

    // When the color amounts change, update the size and color of the splotch.
    Property.multilink( [ leftColorProperty, rightColorProperty ], function( leftColor, rightColor ) {
      updateFill();

      var total = leftColor + rightColor;

      if ( total > 0 ) {
        splotchPath.setScaleMagnitude( SplotchNode.colorTotalToSplotchScale( total ) );
      }
      splotchPath.center = new Vector2( 0, 250 ); //TODO: why position here?
      splotchPath.visible = total > 0;
    } );
    paintChoiceProperty.link( updateFill );

    this.mutate( options );
  }

  proportionPlayground.register( 'SplotchNode', SplotchNode );

  return inherit( SceneRatioNode, SplotchNode, {}, {
    //TODO: doc
    colorTotalToSplotchScale: function( total ) {
      var maxScale = 1.6;
      return maxScale * Math.sqrt( total ) / Math.sqrt( 40 ); // Scale is square-root of count, since the area is proportional to scale squared.
    },

    //TODO: doc
    getSingleSplotchArea: function() {
      var scale = SplotchNode.colorTotalToSplotchScale( 1 );
      return scale * scale * splotchShapeArea; // Area proportional to scale squared
    }
  } );
} );
