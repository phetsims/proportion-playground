// Copyright 2016-2022, University of Colorado Boulder

/**
 * Shows a single billiards table with its associated NumberPickers to change the size.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../../phet-core/js/merge.js';
import { HBox, VBox } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundStrings from '../../../ProportionPlaygroundStrings.js';
import Side from '../../model/Side.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';
import SceneRatioControl from '../SceneRatioControl.js';
import BilliardsTableNode from './BilliardsTableNode.js';

const lengthString = ProportionPlaygroundStrings.length;
const widthString = ProportionPlaygroundStrings.width;

class BilliardsTableControl extends SceneRatioControl {
  /**
   * @param {BilliardsTable} billiardsTable - the model
   * @param {Tandem} tandem
   * @param {Object} config - node layout config
   */
  constructor( billiardsTable, tandem, config ) {
    super(
      billiardsTable,
      ProportionPlaygroundColors.billiardsBorderProperty,
      ProportionPlaygroundColors.billiardsBorderProperty,
      tandem,
      {
        leftPickerLabel: lengthString,
        rightPickerLabel: widthString,
        pickerLabelMaxWidth: 70
      }
    );

    assert && assert( config.side, 'side is required' );

    config = merge( {
      side: null, // {Side} - Required, assertion above
      allowDragToResize: false // Whether resizing is allowed
    }, config );

    // @public - The table itself, with the ball/holes/gridlines/etc.
    this.billiardsTableNode = new BilliardsTableNode( billiardsTable, tandem.createTandem( 'billiardsTableNode' ), {
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

  /**
   * Sets the center of our billiardsTableNode (not our whole control) to the given centerX.
   * @public
   *
   * @param {number} centerX
   */
  setBilliardsCenter( centerX ) {
    this.x = centerX - this.billiardsTableNode.centerX;
  }
}

proportionPlayground.register( 'BilliardsTableControl', BilliardsTableControl );

export default BilliardsTableControl;