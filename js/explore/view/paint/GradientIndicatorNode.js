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
  var Property = require( 'AXON/Property' );

  function GradientIndicatorNode( layoutBounds, paintSceneModel, revealProperty, options ) {
    var gradientIndicatorNode = this;

    var gradientWidth = 20;
    var gradientHeight = 300;

    var createGradientNode = function( map ) {
      return new GradientNode( gradientWidth, gradientHeight, map );
    };
    var colorGradient = createGradientNode( function( parameter ) {
      return ColorMap.getColor( parameter );
    } );
    var grayscaleGradient = createGradientNode( function( parameter ) {
      var blackVector = new Vector3( 0, 0, 0 );
      var whiteVector = new Vector3( 1, 1, 1 );

      var blended = blackVector.blend( whiteVector, parameter );
      return new Color( blended.x * 255, blended.y * 255, blended.z * 255 );
    } );

    var leftIndicator = new TriangleNode( 'left', { right: 0 } );
    var rightIndicator = new TriangleNode( 'right', { left: gradientWidth } );

    paintSceneModel.grayscaleProperty.link( function( grayscale ) {
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

    Property.multilink( [
      paintSceneModel.splotch1Model.color1CountProperty,
      paintSceneModel.splotch1Model.color2CountProperty,
      revealProperty
    ], createIndicatorUpdateFunction( leftIndicator, paintSceneModel.splotch1Model, function() {return true;} ) );

    Property.multilink( [
      paintSceneModel.splotch2Model.color1CountProperty,
      paintSceneModel.splotch2Model.color2CountProperty,
      paintSceneModel.showBothProperty,
      revealProperty
    ], createIndicatorUpdateFunction( rightIndicator, paintSceneModel.splotch2Model, function() {return paintSceneModel.showBoth;} ) );

    Property.multilink( [
      paintSceneModel.splotch1Model.color1CountProperty,
      paintSceneModel.splotch1Model.color2CountProperty,
      paintSceneModel.splotch2Model.color1CountProperty,
      paintSceneModel.splotch2Model.color2CountProperty,
      paintSceneModel.showBothProperty
    ], function() {
      var equivalent = paintSceneModel.splotch1Model.hasEquivalentValue( paintSceneModel.splotch2Model );
      var fill = (equivalent && paintSceneModel.showBoth) ? 'black' : 'white';
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    } );

    paintSceneModel.showBothProperty.link( function( showBoth ) {
      gradientIndicatorNode.x = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    this.centerY = 250;
  }

  proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

  return inherit( Node, GradientIndicatorNode );
} );