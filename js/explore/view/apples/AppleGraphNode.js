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
  var TriangleNode = require( 'PROPORTION_PLAYGROUND/explore/view/TriangleNode' );
  var Property = require( 'AXON/Property' );

  // constants
  var ARROW_OVERSHOOT = 30; // how far the arrowhead goes past the top tick
  var arrowWidth = 3;
  var arrowHeight = 300;
  var arrowLineWidth = 2;

  /**
   *
   * @param {Bounds2} layoutBounds - the visible screen bounds in view coordinates (before isometric scaling)
   * @param {AppleSceneModel} appleSceneModel - the model
   * @param {Property} revealProperty - true if the representation is being shown.
   * @param {Object} [options] - Node options
   * @constructor
   */
  function AppleGraphNode( layoutBounds, appleSceneModel, revealProperty, options ) {
    var appleGraphNode = this;

    // The vertical arrow for the graph
    var arrowNode = new ArrowNode( 0, arrowHeight, 0, -ARROW_OVERSHOOT, { tailWidth: arrowLineWidth } );

    // Tick marks for 0, 1/2 and 1 up the chart.
    var lineOptions = { stroke: 'black', lineWidth: arrowLineWidth };
    arrowNode.addChild( new Line( -10, 0, 10, 0, lineOptions ).mutate( {
      centerY: Util.linear( 0, 20, arrowHeight, 0, 20 )
    } ) );
    arrowNode.addChild( new Line( -10, 0, 10, 0, lineOptions ).mutate( {
      centerY: Util.linear( 0, 20, arrowHeight, 0, 10 )
    } ) );
    arrowNode.addChild( new Line( -10, 0, 10, 0, lineOptions ).mutate( {
      centerY: Util.linear( 0, 20, arrowHeight, 0, 0 )
    } ) );

    // Create the triangle indicators
    var leftIndicator = new TriangleNode( 'left', { right: 0 } );
    var rightIndicator = new TriangleNode( 'right', { left: arrowWidth } );

    Node.call( this, {
      children: [
        arrowNode,
        leftIndicator,
        rightIndicator
      ]
    } );

    this.mutate( options );

    /**
     *
     * @param {Node} - indicator the left/right triangle node
     * @param {AppleGroupModel} appleGroup - the model
     * @param {function} condition - supplemental condition for showing the indicator
     * @returns {Function}
     */
    var createIndicatorUpdateFunction = function( indicator, appleGroup, condition ) {
      return function() {
        var costPerApple = appleGroup.totalCost / appleGroup.numberOfApples;
        if ( appleGroup.numberOfApples === 0 ) {
          indicator.visible = false;
        }
        else {
          indicator.visible = condition() && revealProperty.get();
          indicator.centerY = Util.linear( 0, 20, arrowHeight, 0, costPerApple );
        }
      };
    };

    // Update the left indicator when salient properties change
    Property.multilink( [
      appleSceneModel.redAppleGroup.totalCostProperty,
      appleSceneModel.redAppleGroup.numberOfApplesProperty,
      revealProperty
    ], createIndicatorUpdateFunction( leftIndicator, appleSceneModel.redAppleGroup, function() {return true;} ) );

    // Update the right indicator when salient properties change
    Property.multilink( [
      appleSceneModel.greenAppleGroup.totalCostProperty,
      appleSceneModel.greenAppleGroup.numberOfApplesProperty,
      appleSceneModel.showBothProperty,
      revealProperty
    ], createIndicatorUpdateFunction( rightIndicator, appleSceneModel.greenAppleGroup, function() {return appleSceneModel.showBoth;} ) );

    // Update the indicator fills when salient properties change
    Property.multilink( [
      appleSceneModel.redAppleGroup.totalCostProperty,
      appleSceneModel.redAppleGroup.numberOfApplesProperty,
      appleSceneModel.greenAppleGroup.totalCostProperty,
      appleSceneModel.greenAppleGroup.numberOfApplesProperty,
      appleSceneModel.showBothProperty
    ], function() {
      var equivalent = appleSceneModel.redAppleGroup.hasEquivalentValue( appleSceneModel.greenAppleGroup );
      var fill = (equivalent && appleSceneModel.showBoth) ? 'black' : 'white';
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    } );

    // Set the location of the graph
    appleSceneModel.showBothProperty.link( function( showBoth ) {
      appleGraphNode.x = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );
    this.centerY = 250;
  }

  proportionPlayground.register( 'AppleGraphNode', AppleGraphNode );

  return inherit( Node, AppleGraphNode );
} );