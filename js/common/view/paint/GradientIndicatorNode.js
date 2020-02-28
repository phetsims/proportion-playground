// Copyright 2016-2020, University of Colorado Boulder

/**
 * Vertical color gradient that shows triangles that move based on user input events. Very similar in intent and
 * implementation to AppleGraphNode.js
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import proportionPlayground from '../../../proportionPlayground.js';
import PaintChoice from '../../model/paint/PaintChoice.js';
import Side from '../../model/Side.js';
import TriangleNode from '../TriangleNode.js';
import PaintChoiceGradientNode from './PaintChoiceGradientNode.js';

// constants
const GRADIENT_WIDTH = 20;
const GRADIENT_HEIGHT = 300;

/**
 * @constructor
 * @extends {Node}
 *
 * @param {Bounds2} layoutBounds - the visible region for the screen
 * @param {PaintScene} scene - the model
 * @param {Property.<boolean>} revealProperty - true if the gradient triangle indicators representation should be shown
 * @param {Object} [options] - node options
 */
function GradientIndicatorNode( layoutBounds, scene, revealProperty, options ) {
  const self = this;

  // Create the gradients
  const gradientNodes = PaintChoice.CHOICES.map( function( paintChoice ) {
    const gradientNode = new PaintChoiceGradientNode( GRADIENT_WIDTH, GRADIENT_HEIGHT, paintChoice );
    gradientNode.paintChoice = paintChoice;
    return gradientNode;
  } );

  // Triangle indicators on the left/right
  const leftIndicator = new TriangleNode( Side.LEFT, { right: 0 } );
  const rightIndicator = new TriangleNode( Side.RIGHT, { left: GRADIENT_WIDTH } );

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

  /**
   * Auxiliary function that updates the left or right triangle indicator node.
   *
   * @param {Node} indicator - the left or right triangle node
   * @param {Splotch} splotchModel - the model
   * @param {function} condition - additional condition indicating whether the indicator node should be shown.
   * @returns {function}
   */
  const createIndicatorUpdateFunction = function( indicator, splotchModel, condition ) {
    return function() {
      const total = splotchModel.visibleLeftColorProperty.value + splotchModel.visibleRightColorProperty.value;
      if ( total < 1e-6 ) {
        indicator.visible = false;
      }
      else {
        indicator.visible = condition() && revealProperty.get();

        const proportion = splotchModel.visibleRightColorProperty.value / total;
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
    const fill = ( scene.areVisualRatiosEquivalent() && scene.showBothProperty.value ) ? 'black' : null;
    rightIndicator.fill = fill;
    leftIndicator.fill = fill;
  } );

  // Position the node
  scene.showBothProperty.link( function( showBoth ) {
    self.centerX = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
  } );

  this.mutate( options );
}

proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

inherit( Node, GradientIndicatorNode );
export default GradientIndicatorNode;