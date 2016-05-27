// Copyright 2016, University of Colorado Boulder

/**
 * The node for the Billiards Scene, including two tables and spinners for each.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var BilliardsTableNodeWithSpinners = require( 'PROPORTION_PLAYGROUND/explore/view/billiards/BilliardsTableNodeWithSpinners' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var BilliardTableIcon = require( 'PROPORTION_PLAYGROUND/explore/view/billiards/BilliardTableIcon' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var ExploreSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/ExploreSceneNode' );

  /**
   *
   * @param {Bounds2} layoutBounds - the region within which all visual components should be layed out
   * @param {BilliardsSceneNode} billiardsSceneModel - the model
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function BilliardsSceneNode( layoutBounds, billiardsSceneModel, predictMode ) {
    var billiardsSceneNode = this;

    // Create the left/right tables
    var billiardsTableNode1 = new BilliardsTableNodeWithSpinners( layoutBounds, billiardsSceneModel.table1, billiardsSceneModel.revealProperty );
    var billiardsTableNode2 = new BilliardsTableNodeWithSpinners( layoutBounds, billiardsSceneModel.table2, billiardsSceneModel.revealProperty, {
      side: 'right'
    } );

    // Create the switch that toggles between 1 or 2 tables showing.
    var scaleOptions = { scale: 0.3 };
    var abSwitch = new ABSwitch( billiardsSceneModel.showBothProperty,
      false, new BilliardTableIcon( 120, 120, scaleOptions ),
      true, new HBox( {
        spacing: 10,
        children: [
          new BilliardTableIcon( 100, 100, scaleOptions ),
          new BilliardTableIcon( 100, 100, scaleOptions ) ]
      } )
    );

    ExploreSceneNode.call( this, layoutBounds, billiardsSceneModel, predictMode, 60, {
      children: [ billiardsTableNode1, billiardsTableNode2, abSwitch ]
    } );

    // When the ABSwitch is toggled, show/hide the rightmost table and update the layout.
    billiardsSceneModel.showBothProperty.link( function( showBoth ) {
      billiardsTableNode2.visible = showBoth;

      if ( showBoth ) {
        billiardsTableNode1.left = 10;
        billiardsTableNode2.right = layoutBounds.right - 10;
        billiardsSceneNode.mutateRevealButton( { left: layoutBounds.left + 10 } );
      }
      else {
        billiardsTableNode1.left = 200;
        billiardsSceneNode.mutateRevealButton( { left: layoutBounds.left + 200 } );
      }
    } );

    // Position the ABSwitch at the bottom center of the layout bounds.
    this.moveABSwitchToBottomCenter( abSwitch );

    // Move the tables down a bit so they are centered vertically
    var tableNodeOffsetY = 20;
    billiardsTableNode1.y = tableNodeOffsetY;
    billiardsTableNode2.y = tableNodeOffsetY;
  }

  proportionPlayground.register( 'BilliardsSceneNode', BilliardsSceneNode );

  return inherit( ExploreSceneNode, BilliardsSceneNode );
} );