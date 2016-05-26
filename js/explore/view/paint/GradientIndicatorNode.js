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
  var ColorMap = require( 'PROPORTION_PLAYGROUND/explore/view/paint/ColorMap' );
  var TriangleNode = require( 'PROPORTION_PLAYGROUND/explore/view/TriangleNode' );

  function GradientIndicatorNode( layoutBounds, paintSceneModel, revealProperty, options ) {
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

    var leftIndicator = new TriangleNode( 'left', { right: 0 } );
    var rightIndicator = new TriangleNode( 'right', { left: gradientWidth } );

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
    var createIndicatorUpdateFunction = function( indicator, splotchModel, condition ) {
      return function() {
        var total = splotchModel.color1Count + splotchModel.color2Count;
        if ( total === 0 ) {
          indicator.visible = false;
        }
        else {
          indicator.visible = condition() && revealProperty.get();

          var proportion = splotchModel.color2Count / total;
          indicator.centerY = proportion * gradientHeight;
        }
      };
    };
    var updateLeftIndicator = createIndicatorUpdateFunction( leftIndicator, paintSceneModel.splotch1Model, function() {return true;} );
    var updateRightIndicator = createIndicatorUpdateFunction( rightIndicator, paintSceneModel.splotch2Model, function() {return paintSceneModel.showBoth;} );

    paintSceneModel.splotch1Model.color1CountProperty.link( updateLeftIndicator );
    paintSceneModel.splotch1Model.color2CountProperty.link( updateLeftIndicator );
    revealProperty.link( updateLeftIndicator );

    // TODO: evaluate multilink properties throughout the sim
    paintSceneModel.splotch2Model.color1CountProperty.link( updateRightIndicator );
    paintSceneModel.splotch2Model.color2CountProperty.link( updateRightIndicator );
    paintSceneModel.showBothProperty.link( updateRightIndicator );
    paintSceneModel.revealProperty.link( updateRightIndicator );

    var updateTriangleFills = function() {
      var equivalent = paintSceneModel.splotch1Model.hasEquivalentValue( paintSceneModel.splotch2Model );
      var fill = (equivalent && paintSceneModel.showBoth) ? 'black' : 'white';
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    };
    paintSceneModel.splotch1Model.color1CountProperty.link( updateTriangleFills );
    paintSceneModel.splotch1Model.color2CountProperty.link( updateTriangleFills );
    paintSceneModel.splotch2Model.color1CountProperty.link( updateTriangleFills );
    paintSceneModel.splotch2Model.color2CountProperty.link( updateTriangleFills );
    paintSceneModel.showBothProperty.link( updateTriangleFills );

    paintSceneModel.showBothProperty.link( function( showBoth ) {
      gradientIndicatorNode.x = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    this.centerY = 250;
  }

  proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

  return inherit( Node, GradientIndicatorNode, {} );
} );