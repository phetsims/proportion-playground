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
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Util = require( 'DOT/Util' );

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

    var triangleLength = 25;
    var triangleAltitude = Math.sqrt( 3 ) / 2 * triangleLength;
    var leftTriangleShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( triangleAltitude, triangleLength / 2 )
      .lineTo( 0, triangleLength )
      .lineTo( 0, 0 );
    var leftIndicator = new Path( leftTriangleShape, {
      stroke: 'black',
      lineWidth: 2,
      right: 0
    } );

    // TODO: Make it so you can drag the triangle indicator

    var rightTriangleShape = leftTriangleShape.transformed( Matrix3.scaling( -1, 1 ) );
    var rightIndicator = new Path( rightTriangleShape, {
      stroke: 'black', // TODO: factor out
      lineWidth: 2,
      left: arrowWidth
    } );

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
    revealProperty.link( updateLeftIndicator );

    var updateTriangleFills = function() {
      if ( appleSceneModel.redAppleGroup.ratio1 === appleSceneModel.greenAppleGroup.ratio1 &&
           appleSceneModel.redAppleGroup.ratio2 === appleSceneModel.greenAppleGroup.ratio2 ) {
        rightIndicator.fill = 'black';
      }
      else {
        rightIndicator.fill = 'white';
      }

      // TODO: factor out duplicated code
      if ( appleSceneModel.redAppleGroup.ratio1 === appleSceneModel.greenAppleGroup.ratio1 &&
           appleSceneModel.redAppleGroup.ratio2 === appleSceneModel.greenAppleGroup.ratio2 &&
           appleSceneModel.showBoth ) {
        leftIndicator.fill = 'black';
      }
      else {
        leftIndicator.fill = 'white';
      }
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