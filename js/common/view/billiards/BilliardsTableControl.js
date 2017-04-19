// Copyright 2016, University of Colorado Boulder

/**
 * Shows a single billiards table with its associated NumberPickers to change the size.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var lengthString = require( 'string!PROPORTION_PLAYGROUND/length' );
  var widthString = require( 'string!PROPORTION_PLAYGROUND/width' );

  /**
   * @constructor
   * @extends {SceneRatioControl}
   *
   * @param {Bounds2} layoutBounds - coordinates within which all user interface components must be visible
   * @param {BilliardsTable} billiardsTable - the model
   * @param {Property.<boolean>} revealProperty - indicates whether the billiards table should be shown
   * @param {Object} [options] - node layout options
   */
  function BilliardsTableControl( layoutBounds, billiardsTable, revealProperty, options ) {
    SceneRatioControl.call( this, billiardsTable, ProportionPlaygroundColorProfile.billiardsBorderProperty,
                                                  ProportionPlaygroundColorProfile.billiardsBorderProperty, {
      leftPickerLabel: lengthString,
      rightPickerLabel: widthString,
      pickerLabelMaxWidth: 70
    } );

    assert && assert( options.side, 'side is required' );

    options = _.extend( {
      side: null, // {Side} - Required, assertion above
      allowDragToResize: false // Whether resizing is allowed
    }, options );

    // @public - The table itself, with the ball/holes/gridlines/etc.
    this.billiardsTableNode = new BilliardsTableNode( billiardsTable, {
      allowDragToResize: options.allowDragToResize
    } );

    this.pickerContainer = new VBox( {
      spacing: 30,
      children: [
        this.leftPicker,
        this.rightPicker
      ]
    } );
    this.addChild( new HBox( {
      spacing: 30,
      children: options.side === Side.LEFT ? [ this.pickerContainer, this.billiardsTableNode ] :
                                             [ this.billiardsTableNode, this.pickerContainer ]
    } ) );

    this.mutate( options );
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
