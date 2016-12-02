// Copyright 2016, University of Colorado Boulder

/**
 * Vertical color gradient that shows triangles that move based on user input events. Very similar in intent and
 * implementation to AppleGraphNode.js
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var GradientNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/GradientNode' );
  var Color = require( 'SCENERY/util/Color' );
  var Vector3 = require( 'DOT/Vector3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ColorMap = require( 'PROPORTION_PLAYGROUND/common/view/paint/ColorMap' );
  var TriangleNode = require( 'PROPORTION_PLAYGROUND/common/view/TriangleNode' );
  var Property = require( 'AXON/Property' );

  // constants
  var GRADIENT_WIDTH = 20;
  var GRADIENT_HEIGHT = 300;

  /**
   * @constructor
   *
   * @param {Bounds2} layoutBounds - the visible region for the screen
   * @param {PaintScene} scene - the model
   * @param {Property.<boolean>} revealProperty - true if the gradient triangle indicators representation should be shown
   * @param {Object} [options] - node options
   */
  function GradientIndicatorNode( layoutBounds, scene, revealProperty, options ) {
    var self = this;

    /**
     *
     * @param {function} map - function that maps from (0-1) to Color
     * @returns {*}
     */
    var createGradientNode = function( map ) {
      return new GradientNode( GRADIENT_WIDTH, GRADIENT_HEIGHT, map );
    };

    // Create the gradients
    var colorGradient = createGradientNode( function( parameter ) {
      return ColorMap.getColor( parameter );
    } );
    var grayscaleGradient = createGradientNode( function( parameter ) {
      var blackVector = new Vector3( 0, 0, 0 );
      var whiteVector = new Vector3( 1, 1, 1 );

      var blended = blackVector.blend( whiteVector, parameter );
      return new Color( blended.x * 255, blended.y * 255, blended.z * 255 );
    } );

    // Triangle indicators on the left/right
    var leftIndicator = new TriangleNode( 'left', { right: 0 } );
    var rightIndicator = new TriangleNode( 'right', { left: GRADIENT_WIDTH } );

    // Show colored/gray based on the user selection
    scene.grayscaleProperty.link( function( grayscale ) {
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

    /**
     * Auxiliary function that updates the left or right triangle indicator node.
     *
     * @param {Node} indicator - the left or right triangle node
     * @param {Splotch} splotchModel - the model
     * @param {function} condition - additional condition indicating whether the indicator node should be shown.
     * @returns {Function}
     */
    var createIndicatorUpdateFunction = function( indicator, splotchModel, condition ) {
      return function() {
        var total = splotchModel.leftColorCountProperty.value + splotchModel.rightColorCountProperty.value;
        if ( total === 0 ) {
          indicator.visible = false;
        }
        else {
          indicator.visible = condition() && revealProperty.get();

          var proportion = splotchModel.rightColorCountProperty.value / total;
          indicator.centerY = proportion * GRADIENT_HEIGHT;
        }
      };
    };

    // Update the left triangle indicator node when its parameters change.
    Property.multilink( [
      scene.leftSplotch.leftColorCountProperty,
      scene.leftSplotch.rightColorCountProperty,
      revealProperty
    ], createIndicatorUpdateFunction( leftIndicator, scene.leftSplotch, function() {return true;} ) );

    // Update the right triangle indicator node when its parameters change.
    Property.multilink( [
      scene.rightSplotch.leftColorCountProperty,
      scene.rightSplotch.rightColorCountProperty,
      scene.showBothProperty,
      revealProperty
    ], createIndicatorUpdateFunction( rightIndicator, scene.rightSplotch, function() {return scene.showBothProperty.value;} ) );

    // Update the fills of the triangle indicator nodes
    Property.multilink( [
      scene.leftSplotch.leftColorCountProperty,
      scene.leftSplotch.rightColorCountProperty,
      scene.rightSplotch.leftColorCountProperty,
      scene.rightSplotch.rightColorCountProperty,
      scene.showBothProperty
    ], function() {
      var fill = ( scene.areRatiosEquivalent() && scene.showBothProperty.value ) ? 'black' : 'white';
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    } );

    // Position the node
    scene.showBothProperty.link( function( showBoth ) {
      self.x = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    // Vertical position
    this.centerY = 250;
  }

  proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

  return inherit( Node, GradientIndicatorNode );
} );
