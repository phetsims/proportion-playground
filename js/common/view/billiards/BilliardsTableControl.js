// Copyright 2016, University of Colorado Boulder

/**
 * Shows a single billiards table with its associated NumberPickers to change the size.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableNode' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var Vector2 = require( 'DOT/Vector2' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // strings
  var lengthString = require( 'string!PROPORTION_PLAYGROUND/length' );
  var widthString = require( 'string!PROPORTION_PLAYGROUND/width' );

  /**
   * @constructor
   *
   * @param {Bounds2} layoutBounds - coordinates within which all user interface components must be visible
   * @param {BilliardsTable} billiardsTable - the model
   * @param {Property.<boolean>} revealProperty - indicates whether the billiards table should be shown
   * @param {Object} [options] - node layout options
   */
  function BilliardsTableControl( layoutBounds, billiardsTable, revealProperty, options ) {
    SceneRatioControl.call( this, billiardsTable, {
      leftPickerColor: ProportionPlaygroundConstants.BILLIARDS_BROWN,
      leftPickerLabel: lengthString,
      rightPickerColor: ProportionPlaygroundConstants.BILLIARDS_BROWN,
      rightPickerLabel: widthString
    } );

    // TODO: enum? Or have this on the model?
    options = _.extend( { side: 'left' }, options );

    // The table itself, with the ball/holes/gridlines/etc.
    var billiardsTableNode = new BilliardsTableNode( new Vector2( 280, layoutBounds.centerY ), billiardsTable, {
      x: options.side === 'left' ? 0 : -100
    } );

    this.children = [
      new VBox( {
        spacing: 30,
        y: 100,
        centerX: options.side === 'left' ? 0 : 450, // position around the origin
        children: [
          this.leftPicker,
          this.rightPicker
        ]
      } ),
      billiardsTableNode
    ];
  }

  proportionPlayground.register( 'BilliardsTableControl', BilliardsTableControl );

  return inherit( SceneRatioControl, BilliardsTableControl );
} );
