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
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
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

    // Create the cradients
    var gradientNodes = PaintChoice.CHOICES.map( function( paintChoice ) {
      var gradientNode = new GradientNode( GRADIENT_WIDTH, GRADIENT_HEIGHT, paintChoice );
      gradientNode.paintChoice = paintChoice;
      return gradientNode;
    } );

    // Triangle indicators on the left/right
    var leftIndicator = new TriangleNode( 'left', { right: 0 } );
    var rightIndicator = new TriangleNode( 'right', { left: GRADIENT_WIDTH } );

    // Show colored/gray based on the user selection
    scene.paintChoiceProperty.link( function( paintChoice ) {
      gradientNodes.forEach( function( gradientNode ) {
        gradientNode.visible = gradientNode.paintChoice === paintChoice;
      } );
    } );

    Node.call( this, {
      children: gradientNodes.concat( [
        leftIndicator,
        rightIndicator
      ] )
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
        var total = splotchModel.visibleLeftColorProperty.value + splotchModel.visibleRightColorProperty.value;
        if ( total < 1e-6 ) {
          indicator.visible = false;
        }
        else {
          indicator.visible = condition() && revealProperty.get();

          var proportion = splotchModel.visibleRightColorProperty.value / total;
          indicator.centerY = proportion * GRADIENT_HEIGHT;
        }
      };
    };

    // Update the left triangle indicator node when its parameters change.
    Property.multilink( [
      scene.leftSplotch.visibleLeftColorProperty,
      scene.leftSplotch.visibleRightColorProperty,
      revealProperty
    ], createIndicatorUpdateFunction( leftIndicator, scene.leftSplotch, function() {return true;} ) );

    // Update the right triangle indicator node when its parameters change.
    Property.multilink( [
      scene.rightSplotch.visibleLeftColorProperty,
      scene.rightSplotch.visibleRightColorProperty,
      scene.showBothProperty,
      revealProperty
    ], createIndicatorUpdateFunction( rightIndicator, scene.rightSplotch, function() {return scene.showBothProperty.value;} ) );

    // Update the fills of the triangle indicator nodes
    Property.multilink( [
      scene.leftSplotch.visibleLeftColorProperty,
      scene.leftSplotch.visibleRightColorProperty,
      scene.rightSplotch.visibleLeftColorProperty,
      scene.rightSplotch.visibleRightColorProperty,
      scene.showBothProperty
    ], function() {
      var fill = ( scene.areRatiosEquivalent() && scene.showBothProperty.value ) ? 'black' : null;
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    } );

    // Position the node
    scene.showBothProperty.link( function( showBoth ) {
      self.centerX = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    // Vertical position
    this.centerY = 250;
  }

  proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

  return inherit( Node, GradientIndicatorNode );
} );
