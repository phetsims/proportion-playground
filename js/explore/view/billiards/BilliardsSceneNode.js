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
  var BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/explore/view/billiards/BilliardsTableNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var GradientIndicatorNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/GradientIndicatorNode' );

  function BilliardsSceneNode( layoutBounds, billiardsSceneModel ) {
    var billiardsTableNode1 = new BilliardsTableNode( billiardsSceneModel.splotch1Model, billiardsSceneModel.grayscaleProperty );
    var billiardsTableNode2 = new BilliardsTableNode( billiardsSceneModel.splotch2Model, billiardsSceneModel.grayscaleProperty );
    var createText = function( text ) {
      return new Text( text, { fontSize: 22 } );
    };
    var abSwitch = new ABSwitch( billiardsSceneModel.showBothSplotchesProperty, false, createText( 'one' ), true, createText( 'two' ) );

    Node.call( this, {
      children: [ billiardsTableNode1, billiardsTableNode2, abSwitch ]
    } );
    this.necklaceSceneModel = billiardsSceneModel;

    billiardsSceneModel.showBothSplotchesProperty.link( function( showBothNecklaces ) {
      billiardsTableNode2.visible = showBothNecklaces;

      // Controllable necklace nodes have x=0 at their center
      if ( showBothNecklaces ) {
        billiardsTableNode1.x = layoutBounds.width * 1 / 3;
        billiardsTableNode2.x = layoutBounds.width * 2 / 3;
      }
      else {
        billiardsTableNode1.x = layoutBounds.width / 2;
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 );

    var grayscaleCheckBox = new CheckBox( new Text( 'Black & White', { fontSize: 22 } ), billiardsSceneModel.grayscaleProperty, {
      left: layoutBounds.left + 5,
      bottom: layoutBounds.bottom - 5
    } );
    this.addChild( grayscaleCheckBox );

    var gradientIndicatorNode = new GradientIndicatorNode( layoutBounds, billiardsSceneModel, {} );
    this.addChild( gradientIndicatorNode );
  }

  proportionPlayground.register( 'BilliardsSceneNode', BilliardsSceneNode );

  return inherit( Node, BilliardsSceneNode, {} );
} );