// Copyright 2016, University of Colorado Boulder

/**
 * Shows a vertical representation of the price per apple with moving triangles on the left and right sides to indicate
 * where the simulation is at. Very similar in intent and implementation to GradientIndicatorNode.js
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Util = require( 'DOT/Util' );
  var TriangleNode = require( 'PROPORTION_PLAYGROUND/common/view/TriangleNode' );
  var Property = require( 'AXON/Property' );

  // constants
  var ARROW_OVERSHOOT = 30; // how far the arrowhead goes past the top tick
  var ARROW_WIDTH = 3;
  var ARROW_HEIGHT = 300;
  var ARROW_LINE_WIDTH = 2;

  /**
   * @constructor
   *
   * @param {AppleScene} scene - the model
   * @param {Object} [options] - Node options
   */
  function AppleGraphNode( scene, options ) {
    // The vertical arrow for the graph
    var arrowNode = new ArrowNode( 0, ARROW_HEIGHT, 0, -ARROW_OVERSHOOT, { tailWidth: ARROW_LINE_WIDTH } );

    // Tick marks for 0, 1/2 and 1 up the chart.
    var lineOptions = { stroke: 'black', lineWidth: ARROW_LINE_WIDTH };
    arrowNode.addChild( new Line( -10, 0, 10, 0, lineOptions ).mutate( {
      centerY: Util.linear( 0, 20, ARROW_HEIGHT, 0, 20 )
    } ) );
    arrowNode.addChild( new Line( -10, 0, 10, 0, lineOptions ).mutate( {
      centerY: Util.linear( 0, 20, ARROW_HEIGHT, 0, 10 )
    } ) );
    arrowNode.addChild( new Line( -10, 0, 10, 0, lineOptions ).mutate( {
      centerY: Util.linear( 0, 20, ARROW_HEIGHT, 0, 0 )
    } ) );

    // Create the triangle indicators
    var leftIndicator = new TriangleNode( 'left', { right: -ARROW_WIDTH / 2 } );
    var rightIndicator = new TriangleNode( 'right', { left: ARROW_WIDTH / 2 } );

    Node.call( this, {
      children: [
        arrowNode,
        leftIndicator,
        rightIndicator
      ]
    } );

    /**
     *
     * @param {Node} indicator - the left/right triangle node
     * @param {AppleGroup} appleGroup - the model
     * @param {function} condition - supplemental condition for showing the indicator
     * @returns {Function}
     */
    var updateIndicator = function( indicator, appleGroup, condition ) {
      return function() {
        if ( appleGroup.numberOfApplesProperty.value === 0 ) {
          indicator.visible = false;
        }
        else {
          indicator.visible = condition() && scene.revealProperty.get();
          var costPerApple = appleGroup.totalCostProperty.value / appleGroup.numberOfApplesProperty.value;
          indicator.centerY = Util.linear( 0, 20, ARROW_HEIGHT, 0, costPerApple );
        }
      };
    };

    // Update the left indicator when salient properties change
    Property.multilink( [
      scene.redAppleGroup.totalCostProperty,
      scene.redAppleGroup.numberOfApplesProperty,
      scene.revealProperty
    ], updateIndicator( leftIndicator, scene.redAppleGroup, function() {return true;} ) );

    // Update the right indicator when salient properties change
    Property.multilink( [
      scene.greenAppleGroup.totalCostProperty,
      scene.greenAppleGroup.numberOfApplesProperty,
      scene.showBothProperty,
      scene.revealProperty
    ], updateIndicator( rightIndicator, scene.greenAppleGroup, function() {return scene.showBothProperty.value;} ) );

    // Update the indicator fills when salient properties change
    Property.multilink( [
      scene.redAppleGroup.totalCostProperty,
      scene.redAppleGroup.numberOfApplesProperty,
      scene.greenAppleGroup.totalCostProperty,
      scene.greenAppleGroup.numberOfApplesProperty,
      scene.showBothProperty
    ], function() {
      var fill = ( scene.areRatiosEquivalent() && scene.showBothProperty.value ) ? 'black' : 'white';
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    } );

    this.mutate( options );
  }

  proportionPlayground.register( 'AppleGraphNode', AppleGraphNode );

  return inherit( Node, AppleGraphNode );
} );