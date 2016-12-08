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
  var BilliardsTableControl = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableControl' );
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
   */
  function BilliardsSceneNode( scene, layoutBounds ) {
    var self = this;

    // Create the left/right tables
    var billiardsTableLeftControl = new BilliardsTableControl( layoutBounds, scene.leftTable, scene.revealProperty, {
      centerY: layoutBounds.centerY
    } );
    var billiardsTableRightControl = new BilliardsTableControl( layoutBounds, scene.rightTable, scene.revealProperty, {
      centerY: layoutBounds.centerY,
      side: 'right'
    } );

    SceneNode.call( this, scene, layoutBounds, {
      leftSwitchIcon: new BilliardTableIcon( 120, 120, ICON_SCALE_OPTIONS ),
      rightSwitchIcon: new HBox( {
        spacing: 10,
        children: [
          new BilliardTableIcon( 100, 100, ICON_SCALE_OPTIONS ),
          new BilliardTableIcon( 100, 100, ICON_SCALE_OPTIONS ) ]
      } ),
      children: [ billiardsTableLeftControl, billiardsTableRightControl ]
    } );

    // When the ABSwitch is toggled, show/hide the rightmost table and update the layout.
    scene.showBothProperty.link( function( showBoth ) {
      if ( showBoth ) {
        billiardsTableLeftControl.left = 20;
        billiardsTableRightControl.right = layoutBounds.right - 20;
        self.mutateRevealButton( { left: layoutBounds.left + 10 } ); // TODO: better handling of the reveal button
      }
      else {
        billiardsTableLeftControl.setBilliardsCenter( layoutBounds.centerX );
        self.mutateRevealButton( { left: layoutBounds.left + 200 } ); // TODO: better handling of the reveal button
      }
    } );
  }

  proportionPlayground.register( 'BilliardsSceneNode', BilliardsSceneNode );

  return inherit( SceneNode, BilliardsSceneNode );
} );
