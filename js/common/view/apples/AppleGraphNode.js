// Copyright 2016-2019, University of Colorado Boulder

/**
 * Shows a vertical representation of the price per apple with moving triangles on the left and right sides to indicate
 * where the simulation is at. Very similar in intent and implementation to GradientIndicatorNode.js
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  const Shape = require( 'KITE/Shape' );
  const Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TriangleNode = require( 'PROPORTION_PLAYGROUND/common/view/TriangleNode' );
  const Util = require( 'DOT/Util' );

  // strings
  const appleCostString = require( 'string!PROPORTION_PLAYGROUND/appleCost' );

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
      return Util.linear( 0, 1, ARROW_HEIGHT, 0, ratio );
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
      indicator.centerY = Util.linear( 0, 20, ARROW_HEIGHT, 0, costPerApple );
    }
  }

  return AppleGraphNode;
} );
