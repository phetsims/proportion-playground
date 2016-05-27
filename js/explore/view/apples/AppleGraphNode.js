// Copyright 2016, University of Colorado Boulder

/**
 * TODO: duplicated code with the paint one
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

  function AppleGraphNode( layoutBounds, appleSceneModel, revealProperty, options ) {
    var appleGraphNode = this;

    var arrowWidth = 3;
    var arrowHeight = 300;
    var arrowLineWidth = 2;
    var arrowNode = new ArrowNode( 0, arrowHeight, 0, -ARROW_OVERSHOOT, { tailWidth: arrowLineWidth } );
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

    Property.multilink( [
      appleSceneModel.redAppleGroup.totalCostProperty,
      appleSceneModel.redAppleGroup.numberOfApplesProperty,
      revealProperty
    ], createIndicatorUpdateFunction( leftIndicator, appleSceneModel.redAppleGroup, function() {return true;} ) );

    Property.multilink( [
      appleSceneModel.greenAppleGroup.totalCostProperty,
      appleSceneModel.greenAppleGroup.numberOfApplesProperty,
      appleSceneModel.showBothProperty,
      revealProperty
    ], createIndicatorUpdateFunction( rightIndicator, appleSceneModel.greenAppleGroup, function() {return appleSceneModel.showBoth;} ) );

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

    appleSceneModel.showBothProperty.link( function( showBoth ) {
      appleGraphNode.x = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    this.centerY = 250;
  }

  proportionPlayground.register( 'AppleGraphNode', AppleGraphNode );

  return inherit( Node, AppleGraphNode );
} );