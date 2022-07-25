// Copyright 2016-2022, University of Colorado Boulder

/**
 * Vertical color gradient that shows triangles that move based on user input events. Very similar in intent and
 * implementation to AppleGraphNode.js
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../../axon/js/Multilink.js';
import TriangleNode from '../../../../../scenery-phet/js/TriangleNode.js';
import { Node } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import PaintChoice from '../../model/paint/PaintChoice.js';
import PaintChoiceGradientNode from './PaintChoiceGradientNode.js';

// constants
const GRADIENT_WIDTH = 20;
const GRADIENT_HEIGHT = 300;

class GradientIndicatorNode extends Node {
  /**
   * @param {Bounds2} layoutBounds - the visible region for the screen
   * @param {PaintScene} scene - the model
   * @param {Property.<boolean>} revealProperty - true if the gradient triangle indicators representation should be shown
   * @param {Object} [options] - node options
   */
  constructor( layoutBounds, scene, revealProperty, options ) {

    // Create the gradients
    const gradientNodes = PaintChoice.CHOICES.map( paintChoice => {
      const gradientNode = new PaintChoiceGradientNode( GRADIENT_WIDTH, GRADIENT_HEIGHT, paintChoice );
      gradientNode.paintChoice = paintChoice;
      return gradientNode;
    } );

    // Triangle indicators on the left/right
    const leftIndicator = new TriangleNode( { pointDirection: 'right', triangleHeight: 10,
      triangleWidth: 17 } );
    const rightIndicator = new TriangleNode( { pointDirection: 'left', triangleHeight: 10,
      triangleWidth: 17 } );

    // Show colored/gray based on the user selection
    scene.paintChoiceProperty.link( paintChoice => {
      gradientNodes.forEach( gradientNode => {
        gradientNode.visible = gradientNode.paintChoice === paintChoice;
        if ( gradientNode.visible ) {
          leftIndicator.right = gradientNode.left;
          rightIndicator.left = gradientNode.right;
        }
      } );
    } );

    super( {
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
    const createIndicatorUpdateFunction = ( indicator, splotchModel, condition ) => () => {
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

    // Update the left triangle indicator node when its parameters change.
    Multilink.multilink( [
      scene.leftSplotch.visibleLeftColorProperty,
      scene.leftSplotch.visibleRightColorProperty,
      revealProperty
    ], createIndicatorUpdateFunction( leftIndicator, scene.leftSplotch, () => true ) );

    // Update the right triangle indicator node when its parameters change.
    Multilink.multilink( [
      scene.rightSplotch.visibleLeftColorProperty,
      scene.rightSplotch.visibleRightColorProperty,
      scene.showBothProperty,
      revealProperty
    ], createIndicatorUpdateFunction( rightIndicator, scene.rightSplotch, () => scene.showBothProperty.value ) );

    // Update the fills of the triangle indicator nodes
    Multilink.multilink( [
      scene.leftSplotch.visibleLeftColorProperty,
      scene.leftSplotch.visibleRightColorProperty,
      scene.rightSplotch.visibleLeftColorProperty,
      scene.rightSplotch.visibleRightColorProperty,
      scene.showBothProperty
    ], () => {
      const fill = ( scene.areVisualRatiosEquivalent() && scene.showBothProperty.value ) ? 'black' : null;
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    } );

    // Position the node
    scene.showBothProperty.link( showBoth => {
      this.centerX = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    this.mutate( options );
  }
}

proportionPlayground.register( 'GradientIndicatorNode', GradientIndicatorNode );

export default GradientIndicatorNode;