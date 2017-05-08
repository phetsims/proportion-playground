// Copyright 2016-2017, University of Colorado Boulder

/**
 * Shows a vertical representation of the price per apple with moving triangles on the left and right sides to indicate
 * where the simulation is at. Very similar in intent and implementation to GradientIndicatorNode.js
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  var Shape = require( 'KITE/Shape' );
  var Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TriangleNode = require( 'PROPORTION_PLAYGROUND/common/view/TriangleNode' );
  var Util = require( 'DOT/Util' );

  var appleCostString = require( 'string!PROPORTION_PLAYGROUND/appleCost' );

  // constants
  var ARROW_OVERSHOOT = 30; // how far the arrowhead goes past the top tick
  var ARROW_WIDTH = 3;
  var ARROW_HEIGHT = 290;
  var ARROW_LINE_WIDTH = 2;

  var TICK_X = 10;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {AppleScene} scene - the model
   * @param {Object} [options] - Node options
   */
  function AppleGraphNode( scene, options ) {
    // The vertical arrow for the graph
    var arrowNode = new ArrowNode( 0, ARROW_HEIGHT, 0, -ARROW_OVERSHOOT, { tailWidth: ARROW_LINE_WIDTH } );

    // Tick marks for 0, 1/2 and 1 up the chart.
    var tickLocations = [ 0, 0.5, 1 ].map( function( ratio ) {
      return Util.linear( 0, 1, ARROW_HEIGHT, 0, ratio );
    } );
    // moveTo/lineTo for each tick
    var tickShape = _.reduce( tickLocations, function( shape, location ) {
      return shape.moveTo( -TICK_X, location )
        .lineTo( TICK_X, location );
    }, new Shape() );
    arrowNode.addChild( new Path( tickShape, {
      stroke: 'black',
      lineWidth: ARROW_LINE_WIDTH
    } ) );

    // Create the triangle indicators
    var leftIndicator = new TriangleNode( Side.LEFT, { right: -ARROW_WIDTH / 2 } );
    var rightIndicator = new TriangleNode( Side.RIGHT, { left: ARROW_WIDTH / 2 } );

    var label = new Text( appleCostString, {
      font: ProportionPlaygroundConstants.CONTROL_FONT,
      centerX: arrowNode.centerX,
      bottom: arrowNode.top - 10,
      maxWidth: 170
    } );

    Node.call( this, {
      children: [
        arrowNode,
        leftIndicator,
        rightIndicator,
        label
      ]
    } );

    /**
     * @param {Node} indicator - the left/right triangle node
     * @param {AppleGroup} appleGroup - the model
     */
    function updateIndicator( indicator, appleGroup ) {
      indicator.visible = appleGroup.numberOfApplesProperty.value > 0 && appleGroup.visibleProperty.value;
      var costPerApple = appleGroup.totalCostProperty.value / appleGroup.numberOfApplesProperty.value;
      if ( isFinite( costPerApple ) ) {
        indicator.centerY = Util.linear( 0, 20, ARROW_HEIGHT, 0, costPerApple );
      }
    }

    // TODO: rename apple groups, since one is not green anymore!
    var updateLeftIndicator = updateIndicator.bind( undefined, leftIndicator, scene.redAppleGroup );
    var updateRightIndicator = updateIndicator.bind( undefined, rightIndicator, scene.greenAppleGroup );

    scene.redAppleGroup.visibleChangeEmitter.addListener( updateLeftIndicator );
    scene.greenAppleGroup.visibleChangeEmitter.addListener( updateRightIndicator );
    updateLeftIndicator();
    updateRightIndicator();

    // Update the indicator fills when salient properties change
    Property.multilink( scene.quantityProperties.concat( [ scene.showBothProperty ] ), function() {
      // TODO: get the 'black'. Does it need to be the screen background color?
      var colorProperty = scene.predictMode ? ProportionPlaygroundColorProfile.predictBackgroundProperty : ProportionPlaygroundColorProfile.exploreBackgroundProperty;
      var fill = ( scene.areRatiosEquivalent() && scene.showBothProperty.value ) ? 'black' : colorProperty;
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    } );

    this.mutate( options );
  }

  proportionPlayground.register( 'AppleGraphNode', AppleGraphNode );

  return inherit( Node, AppleGraphNode );
} );
