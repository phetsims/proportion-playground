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
  var Node = require( 'SCENERY/nodes/Node' );
  var BilliardsTableNodeWithSpinners = require( 'PROPORTION_PLAYGROUND/explore/view/billiards/BilliardsTableNodeWithSpinners' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var BilliardTableIcon = require( 'PROPORTION_PLAYGROUND/explore/view/billiards/BilliardTableIcon' );
  var HBox = require( 'SCENERY/nodes/HBox' );

  function BilliardsSceneNode( layoutBounds, billiardsSceneModel ) {
    var billiardsTableNode1 = new BilliardsTableNodeWithSpinners( layoutBounds, billiardsSceneModel.table1 );
    var billiardsTableNode2 = new BilliardsTableNodeWithSpinners( layoutBounds, billiardsSceneModel.table2, {
      side: 'right'
    } );
    var abSwitch = new ABSwitch( billiardsSceneModel.showBothTablesProperty,
      false, new BilliardTableIcon( 120, 120, { scale: 0.3 } ), // TODO: factor out scale
      true, new HBox( {
        spacing: 10,
        children: [
          new BilliardTableIcon( 100, 100, { scale: 0.3 } ),
          new BilliardTableIcon( 100, 100, { scale: 0.3 } ) ]
      } )
    );

    Node.call( this, {
      children: [ billiardsTableNode1, billiardsTableNode2, abSwitch ]
    } );
    this.necklaceSceneModel = billiardsSceneModel;

    billiardsSceneModel.showBothTablesProperty.link( function( showBothNecklaces ) {
      billiardsTableNode2.visible = showBothNecklaces;

      // Controllable necklace nodes have x=0 at their center
      if ( showBothNecklaces ) {
        billiardsTableNode1.left = 10;
        billiardsTableNode2.right = layoutBounds.right - 10;
      }
      else {
        billiardsTableNode1.left = 200;
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 );

    billiardsTableNode1.y = 20;
    billiardsTableNode2.y = 20;
  }

  proportionPlayground.register( 'BilliardsSceneNode', BilliardsSceneNode );

  return inherit( Node, BilliardsSceneNode, {} );
} );