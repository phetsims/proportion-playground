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
  var BilliardsTableNodeWithSpinners = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableNodeWithSpinners' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var BilliardTableIcon = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardTableIcon' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var SceneNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneNode' );

  // constants
  var ICON_SCALE_OPTIONS = { scale: 0.3 };

  /**
   * @constructor
   *
   * @param {BilliardsSceneNode} scene - the model
   * @param {Bounds2} layoutBounds - the region within which all visual components should be layed out
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function BilliardsSceneNode( scene, layoutBounds, predictMode ) {
    var self = this;

    // Create the left/right tables
    var billiardsTableNode1 = new BilliardsTableNodeWithSpinners( layoutBounds, scene.leftTable, scene.revealProperty );
    var billiardsTableNode2 = new BilliardsTableNodeWithSpinners( layoutBounds, scene.rightTable, scene.revealProperty, {
      side: 'right'
    } );

    // Create the switch that toggles between 1 or 2 tables showing.
    var abSwitch = new ABSwitch( scene.showBothProperty,
      false, new BilliardTableIcon( 120, 120, ICON_SCALE_OPTIONS ),
      true, new HBox( {
        spacing: 10,
        children: [
          new BilliardTableIcon( 100, 100, ICON_SCALE_OPTIONS ),
          new BilliardTableIcon( 100, 100, ICON_SCALE_OPTIONS ) ]
      } )
    );

    SceneNode.call( this, scene, layoutBounds, predictMode, 60, {
      children: [ billiardsTableNode1, billiardsTableNode2, abSwitch ]
    } );

    // When the ABSwitch is toggled, show/hide the rightmost table and update the layout.
    scene.showBothProperty.link( function( showBoth ) {
      billiardsTableNode2.visible = showBoth;

      if ( showBoth ) {
        billiardsTableNode1.left = 10;
        billiardsTableNode2.right = layoutBounds.right - 10;
        self.mutateRevealButton( { left: layoutBounds.left + 10 } );
      }
      else {
        billiardsTableNode1.left = 200;
        self.mutateRevealButton( { left: layoutBounds.left + 200 } );
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

  return inherit( SceneNode, BilliardsSceneNode );
} );
