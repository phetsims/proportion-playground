// Copyright 2016-2020, University of Colorado Boulder

/**
 * Shows a single billiards table with its associated NumberPickers to change the size.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import proportionPlaygroundStrings from '../../../proportionPlaygroundStrings.js';
import proportionPlayground from '../../../proportionPlayground.js';
import Side from '../../model/Side.js';
import ProportionPlaygroundColorProfile from '../ProportionPlaygroundColorProfile.js';
import SceneRatioControl from '../SceneRatioControl.js';
import BilliardsTableNode from './BilliardsTableNode.js';

const lengthString = proportionPlaygroundStrings.length;
const widthString = proportionPlaygroundStrings.width;

/**
 * @constructor
 * @extends {SceneRatioControl}
 *
 * @param {BilliardsTable} billiardsTable - the model
 * @param {Object} config - node layout config
 */
function BilliardsTableControl( billiardsTable, config ) {
  SceneRatioControl.call( this, billiardsTable, ProportionPlaygroundColorProfile.billiardsBorderProperty,
    ProportionPlaygroundColorProfile.billiardsBorderProperty, {
      leftPickerLabel: lengthString,
      rightPickerLabel: widthString,
      pickerLabelMaxWidth: 70
    } );

  assert && assert( config.side, 'side is required' );

  config = merge( {
    side: null, // {Side} - Required, assertion above
    allowDragToResize: false // Whether resizing is allowed
  }, config );

  // @public - The table itself, with the ball/holes/gridlines/etc.
  this.billiardsTableNode = new BilliardsTableNode( billiardsTable, {
    allowDragToResize: config.allowDragToResize
  } );

  // @protected @override - We need more customization for positioning for the billiards scene, so we create our own
  // pickerContainer instead of calling a function to create it.
  this.pickerContainer = new VBox( {
    spacing: 30,
    children: [
      this.leftPicker,
      this.rightPicker
    ]
  } );
  this.addChild( new HBox( {
    spacing: 30,
    children: config.side === Side.LEFT ? [ this.pickerContainer, this.billiardsTableNode ] :
      [ this.billiardsTableNode, this.pickerContainer ],
    excludeInvisibleChildrenFromBounds: false
  } ) );

  this.mutate( config );
}

proportionPlayground.register( 'BilliardsTableControl', BilliardsTableControl );

inherit( SceneRatioControl, BilliardsTableControl, {
  /**
   * Sets the center of our billiardsTableNode (not our whole control) to the given centerX.
   * @public
   *
   * @param {number} centerX
   */
  setBilliardsCenter: function( centerX ) {
    this.x = centerX - this.billiardsTableNode.centerX;
  }
} );

export default BilliardsTableControl;