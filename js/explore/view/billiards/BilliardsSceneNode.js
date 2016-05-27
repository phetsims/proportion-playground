// Copyright 2016, University of Colorado Boulder

/**
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

  function BilliardsSceneNode( layoutBounds, billiardsSceneModel, predictMode ) {
    var billiardsSceneNode = this;
    var billiardsTableNode1 = new BilliardsTableNodeWithSpinners( layoutBounds, billiardsSceneModel.table1, billiardsSceneModel.revealProperty );
    var billiardsTableNode2 = new BilliardsTableNodeWithSpinners( layoutBounds, billiardsSceneModel.table2, billiardsSceneModel.revealProperty, {
      side: 'right'
    } );
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
    this.necklaceSceneModel = billiardsSceneModel;

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
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 );

    billiardsTableNode1.y = 20;
    billiardsTableNode2.y = 20;
  }

  proportionPlayground.register( 'BilliardsSceneNode', BilliardsSceneNode );

  return inherit( ExploreSceneNode, BilliardsSceneNode );
} );