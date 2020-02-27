// Copyright 2016-2019, University of Colorado Boulder

/**
 * Shows a vertical representation of the price per apple with moving triangles on the left and right sides to indicate
 * where the simulation is at. Very similar in intent and implementation to GradientIndicatorNode.js
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import Utils from '../../../../../dot/js/Utils.js';
import Shape from '../../../../../kite/js/Shape.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import ArrowNode from '../../../../../scenery-phet/js/ArrowNode.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import proportionPlaygroundStrings from '../../../proportion-playground-strings.js';
import proportionPlayground from '../../../proportionPlayground.js';
import Side from '../../model/Side.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColorProfile from '../ProportionPlaygroundColorProfile.js';
import TriangleNode from '../TriangleNode.js';

const appleCostString = proportionPlaygroundStrings.appleCost;

// constants
const ARROW_OVERSHOOT = 30; // how far the arrowhead goes past the top tick
const ARROW_WIDTH = 3;
const ARROW_HEIGHT = 290;
const ARROW_LINE_WIDTH = 2;

const TICK_X = 10;

/**
 * @constructor
 * @extends {Node}
 *
 * @param {AppleScene} scene - the model
 * @param {Object} [options] - Node options
 */
function AppleGraphNode( scene, options ) {
  // The vertical arrow for the graph
  const arrowNode = new ArrowNode( 0, ARROW_HEIGHT, 0, -ARROW_OVERSHOOT, { tailWidth: ARROW_LINE_WIDTH } );

  // Tick marks for 0, 1/2 and 1 up the chart.
  const tickLocations = [ 0, 0.5, 1 ].map( function( ratio ) {
    return Utils.linear( 0, 1, ARROW_HEIGHT, 0, ratio );
  } );
  // moveTo/lineTo for each tick
  const tickShape = _.reduce( tickLocations, function( shape, location ) {
    return shape.moveTo( -TICK_X, location )
      .lineTo( TICK_X, location );
  }, new Shape() );
  arrowNode.addChild( new Path( tickShape, {
    stroke: 'black',
    lineWidth: ARROW_LINE_WIDTH
  } ) );

  // Create the triangle indicators
  const leftIndicator = new TriangleNode( Side.LEFT, { right: -ARROW_WIDTH / 2 } );
  const rightIndicator = new TriangleNode( Side.RIGHT, { left: ARROW_WIDTH / 2 } );

  const label = new Text( appleCostString, {
    font: ProportionPlaygroundConstants.CONTROL_FONT,
    centerX: arrowNode.centerX,
    bottom: arrowNode.top - 10,
    maxWidth: 170
  } );

  const updateLeftIndicator = updateIndicator.bind( undefined, leftIndicator, scene.leftAppleGroup );
  const updateRightIndicator = updateIndicator.bind( undefined, rightIndicator, scene.rightAppleGroup );

  scene.leftAppleGroup.visibleChangeEmitter.addListener( updateLeftIndicator );
  scene.rightAppleGroup.visibleChangeEmitter.addListener( updateRightIndicator );
  updateLeftIndicator();
  updateRightIndicator();

  // Update the indicator fills when salient properties change
  Property.multilink( scene.quantityProperties.concat( [ scene.showBothProperty ] ), function() {
    const colorProperty = scene.predictMode ? ProportionPlaygroundColorProfile.predictBackgroundProperty : ProportionPlaygroundColorProfile.exploreBackgroundProperty;
    const fill = ( scene.areRatiosEquivalent() && scene.showBothProperty.value ) ? 'black' : colorProperty;
    rightIndicator.fill = fill;
    leftIndicator.fill = fill;
  } );

  assert && assert( !options.children, 'Unsupported option' );
  options.children = [
    arrowNode,
    leftIndicator,
    rightIndicator,
    label
  ];

  Node.call( this, options );
}

proportionPlayground.register( 'AppleGraphNode', AppleGraphNode );

inherit( Node, AppleGraphNode );

/**
 * Callback to update a triangular indicator.
 * @private
 *
 * @param {Node} indicator - the left/right triangle node
 * @param {AppleGroup} appleGroup - the model
 */
function updateIndicator( indicator, appleGroup ) {
  indicator.visible = appleGroup.numberOfApplesProperty.value > 0 && appleGroup.visibleProperty.value;
  const costPerApple = appleGroup.totalCostProperty.value / appleGroup.numberOfApplesProperty.value;
  if ( isFinite( costPerApple ) ) {
    indicator.centerY = Utils.linear( 0, 20, ARROW_HEIGHT, 0, costPerApple );
  }
}

export default AppleGraphNode;