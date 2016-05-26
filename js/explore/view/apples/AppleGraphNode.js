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

    // TODO: duplicated with below
    var updateLeftIndicator = function() {
      var costPerApple = appleSceneModel.redAppleGroup.totalCost / appleSceneModel.redAppleGroup.numberOfApples;
      if ( appleSceneModel.redAppleGroup.numberOfApples === 0 ) {
        leftIndicator.visible = false;
      }
      else {
        leftIndicator.visible = revealProperty.get();
        leftIndicator.centerY = Util.linear( 0, 20, arrowHeight, 0, costPerApple );
      }
    };

    appleSceneModel.redAppleGroup.totalCostProperty.link( updateLeftIndicator );
    appleSceneModel.redAppleGroup.numberOfApplesProperty.link( updateLeftIndicator );
    revealProperty.link( updateLeftIndicator );

    // TODO: Factor out duplicated with above
    var updateRightIndicator = function() {

      var costPerApple = appleSceneModel.greenAppleGroup.totalCost / appleSceneModel.greenAppleGroup.numberOfApples;
      if ( appleSceneModel.greenAppleGroup.numberOfApples === 0 ) {
        rightIndicator.visible = false;
      }
      else {
        rightIndicator.visible = appleSceneModel.showBoth && revealProperty.get();
        rightIndicator.centerY = Util.linear( 0, 20, arrowHeight, 0, costPerApple );
      }
    };

    // TODO: evaluate multilink properties throughout the sim
    appleSceneModel.greenAppleGroup.totalCostProperty.link( updateRightIndicator );
    appleSceneModel.greenAppleGroup.numberOfApplesProperty.link( updateRightIndicator );
    appleSceneModel.showBothProperty.link( updateRightIndicator );
    revealProperty.link( updateRightIndicator );

    var updateTriangleFills = function() {
      var equivalent = appleSceneModel.redAppleGroup.hasEquivalentValue( appleSceneModel.greenAppleGroup );
      var fill = (equivalent && appleSceneModel.showBoth) ? 'black' : 'white';
      rightIndicator.fill = fill;
      leftIndicator.fill = fill;
    };
    appleSceneModel.redAppleGroup.totalCostProperty.link( updateTriangleFills );
    appleSceneModel.redAppleGroup.numberOfApplesProperty.link( updateTriangleFills );
    appleSceneModel.greenAppleGroup.totalCostProperty.link( updateTriangleFills );
    appleSceneModel.greenAppleGroup.numberOfApplesProperty.link( updateTriangleFills );
    appleSceneModel.showBothProperty.link( updateTriangleFills );

    appleSceneModel.showBothProperty.link( function( showBoth ) {
      appleGraphNode.x = showBoth ? layoutBounds.centerX : layoutBounds.right * 0.7;
    } );

    this.centerY = 250;
  }

  proportionPlayground.register( 'AppleGraphNode', AppleGraphNode );

  return inherit( Node, AppleGraphNode, {} );
} );