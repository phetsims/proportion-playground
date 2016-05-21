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

  function GradientIndicatorNode( layoutBounds, paintSceneModel, options ) {
    var gradientIndicatorNode = this;
    var grayscaleProperty = paintSceneModel.grayscaleProperty; // TODO: inline

    var gradientHeight = 300;
    var colorGradient = new GradientNode( 20, gradientHeight, function( parameter ) {
      var blueVector = new Vector3( 0, 1, 1 ); // use cyan for RGB color mixing
      var yellowVector = new Vector3( 1, 1, 0 );

      var blended = blueVector.blend( yellowVector, parameter );
      return new Color( blended.x * 255, blended.y * 255, blended.z * 255 );
    } );

    // TODO: Factor out code duplicated with above
    var grayscaleGradient = new GradientNode( 20, gradientHeight, function( parameter ) {
      var blackVector = new Vector3( 0, 0, 0 );
      var whiteVector = new Vector3( 1, 1, 1 );

      var blended = blackVector.blend( whiteVector, parameter );
      return new Color( blended.x * 255, blended.y * 255, blended.z * 255 );
    } );

    var triangleLength = 25;
    var triangleAltitude = Math.sqrt( 3 ) / 2 * triangleLength;
    var triangleShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( triangleAltitude, triangleLength / 2 )
      .lineTo( 0, triangleLength )
      .lineTo( 0, 0 );
    var leftIndicator = new Path( triangleShape, {
      stroke: 'black',
      lineWidth: 2,
      right: 0
    } );

    grayscaleProperty.link( function( grayscale ) {
      colorGradient.visible = !grayscale;
      grayscaleGradient.visible = grayscale;
    } );
    Node.call( this, {
      children: [
        colorGradient,
        grayscaleGradient,
        leftIndicator
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

    paintSceneModel.showBothSplotchesProperty.link( function( showBothSplotches ) {
      gradientIndicatorNode.x = showBothSplotches ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    this.centerY = 250;
  }

  proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

  return inherit( Node, GradientIndicatorNode, {} );
} );