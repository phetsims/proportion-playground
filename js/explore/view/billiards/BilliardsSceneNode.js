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

  function BilliardsSceneNode( layoutBounds, billiardsSceneModel ) {
    var billiardsTableNode1 = new BilliardsTableNodeWithSpinners( layoutBounds, billiardsSceneModel.table1 );
    var billiardsTableNode2 = new BilliardsTableNodeWithSpinners( layoutBounds, billiardsSceneModel.table2 );
    var createText = function( text ) {
      return new Text( text, { fontSize: 22 } );
    };
    var abSwitch = new ABSwitch( billiardsSceneModel.showBothTablesProperty, false, createText( 'one' ), true, createText( 'two' ) );

    Node.call( this, {
      children: [ billiardsTableNode1, billiardsTableNode2, abSwitch ]
    } );
    this.necklaceSceneModel = billiardsSceneModel;

    billiardsSceneModel.showBothTablesProperty.link( function( showBothNecklaces ) {
      billiardsTableNode2.visible = showBothNecklaces;

      // Controllable necklace nodes have x=0 at their center
      if ( showBothNecklaces ) {
        billiardsTableNode1.left = layoutBounds.left;
        billiardsTableNode2.left = layoutBounds.centerX;
      }
      else {
        billiardsTableNode1.left = layoutBounds.left;
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 );
  }

  proportionPlayground.register( 'BilliardsSceneNode', BilliardsSceneNode );

  return inherit( Node, BilliardsSceneNode, {} );
} );