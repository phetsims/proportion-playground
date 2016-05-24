// Copyright 2016, University of Colorado Boulder

/**
 * This is the live gradient that changes based on user input events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var GradientNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/GradientNode' );
  var Color = require( 'SCENERY/util/Color' );
  var Vector3 = require( 'DOT/Vector3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var ColorMap = require( 'PROPORTION_PLAYGROUND/explore/view/paint/ColorMap' );

  function GradientIndicatorNode( layoutBounds, paintSceneModel, options ) {
    var gradientIndicatorNode = this;
    var grayscaleProperty = paintSceneModel.grayscaleProperty; // TODO: inline

    var gradientWidth = 20;
    var gradientHeight = 300;
    var colorGradient = new GradientNode( gradientWidth, gradientHeight, function( parameter ) {
      return ColorMap.getColor( parameter );
    } );

    // TODO: Factor out code duplicated with above
    var grayscaleGradient = new GradientNode( gradientWidth, gradientHeight, function( parameter ) {
      var blackVector = new Vector3( 0, 0, 0 );
      var whiteVector = new Vector3( 1, 1, 1 );

      var blended = blackVector.blend( whiteVector, parameter );
      return new Color( blended.x * 255, blended.y * 255, blended.z * 255 );
    } );

    var triangleLength = 25;
    var triangleAltitude = Math.sqrt( 3 ) / 2 * triangleLength;
    var leftTriangleShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( triangleAltitude, triangleLength / 2 )
      .lineTo( 0, triangleLength )
      .lineTo( 0, 0 );
    var leftIndicator = new Path( leftTriangleShape, {
      stroke: 'black',
      lineWidth: 2,
      right: 0
    } );

    // TODO: Make it so you can drag the triangle indicator

    var rightTriangleShape = leftTriangleShape.transformed( Matrix3.scaling( -1, 1 ) );
    var rightIndicator = new Path( rightTriangleShape, {
      stroke: 'black', // TODO: factor out
      lineWidth: 2,
      left: gradientWidth
    } );

    grayscaleProperty.link( function( grayscale ) {
      colorGradient.visible = !grayscale;
      grayscaleGradient.visible = grayscale;
    } );
    Node.call( this, {
      children: [
        colorGradient,
        grayscaleGradient,
        leftIndicator,
        rightIndicator
      ]
    } );

    this.mutate( options );

    var updateLeftIndicator = function() {
      var total = paintSceneModel.splotch1Model.color1Count + paintSceneModel.splotch1Model.color2Count;
      if ( total === 0 ) {
        leftIndicator.visible = false;
      }
      else {
        leftIndicator.visible = true;

        var proportion = paintSceneModel.splotch1Model.color2Count / total;
        leftIndicator.centerY = proportion * gradientHeight;
      }

    };

    paintSceneModel.splotch1Model.color1CountProperty.link( updateLeftIndicator );
    paintSceneModel.splotch1Model.color2CountProperty.link( updateLeftIndicator );

    // TODO: Factor out duplicated with above
    var updateRightIndicator = function() {

      var total = paintSceneModel.splotch2Model.color1Count + paintSceneModel.splotch2Model.color2Count;
      if ( total === 0 ) {
        rightIndicator.visible = false;
      }
      else {
        rightIndicator.visible = paintSceneModel.showBothSplotches;

        var proportion = paintSceneModel.splotch2Model.color2Count / total;
        rightIndicator.centerY = proportion * gradientHeight;
      }
    };

    // TODO: evaluate multilink properties throughout the sim
    paintSceneModel.splotch2Model.color1CountProperty.link( updateRightIndicator );
    paintSceneModel.splotch2Model.color2CountProperty.link( updateRightIndicator );
    paintSceneModel.showBothSplotchesProperty.link( updateRightIndicator );

    var updateTriangleFills = function() {
      if ( paintSceneModel.splotch1Model.ratio1 === paintSceneModel.splotch2Model.ratio1 &&
           paintSceneModel.splotch1Model.ratio2 === paintSceneModel.splotch2Model.ratio2 ) {
        rightIndicator.fill = 'black';
      }
      else {
        rightIndicator.fill = null;
      }

      // TODO: factor out duplicated code
      if ( paintSceneModel.splotch1Model.ratio1 === paintSceneModel.splotch2Model.ratio1 &&
           paintSceneModel.splotch1Model.ratio2 === paintSceneModel.splotch2Model.ratio2 ) {
        leftIndicator.fill = 'black';
      }
      else {
        leftIndicator.fill = null;
      }
    };
    paintSceneModel.splotch1Model.color1CountProperty.link( updateTriangleFills );
    paintSceneModel.splotch1Model.color2CountProperty.link( updateTriangleFills );
    paintSceneModel.splotch2Model.color1CountProperty.link( updateTriangleFills );
    paintSceneModel.splotch2Model.color2CountProperty.link( updateTriangleFills );

    paintSceneModel.showBothSplotchesProperty.link( function( showBothSplotches ) {
      gradientIndicatorNode.x = showBothSplotches ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    this.centerY = 250;
  }

  proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

  return inherit( Node, GradientIndicatorNode, {} );
} );