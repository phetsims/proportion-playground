// Copyright 2016-2019, University of Colorado Boulder

/**
 * Shows a single billiards table with its associated NumberPickers to change the size.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  const Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const lengthString = require( 'string!PROPORTION_PLAYGROUND/length' );
  const widthString = require( 'string!PROPORTION_PLAYGROUND/width' );

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

    config = _.extend( {
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
        [ this.billiardsTableNode, this.pickerContainer ]
    } ) );

    this.mutate( config );
  }

  proportionPlayground.register( 'BilliardsTableControl', BilliardsTableControl );

  return inherit( SceneRatioControl, BilliardsTableControl, {
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
} );
