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
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableNode' );
  var Vector2 = require( 'DOT/Vector2' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // strings
  var lengthString = require( 'string!PROPORTION_PLAYGROUND/length' );
  var widthString = require( 'string!PROPORTION_PLAYGROUND/width' );

  // constants
  var NUMBER_PICKER_OPTIONS = { scale: 2, color: ProportionPlaygroundConstants.BILLIARDS_BROWN };

  /**
   *
   * @param {Bounds2} layoutBounds - coordinates within which all user interface components must be visible
   * @param {BilliardsTable} billiardsTableModel - the model
   * @param {Property.<boolean>} revealProperty - indicates whether the billiards table should be shown
   * @param {Object} [options] - node layout options
   * @constructor
   */
  function BilliardsTableNodeWithSpinners( layoutBounds, billiardsTableModel, revealProperty, options ) {
    options = _.extend( { side: 'left' }, options );

    // The number pickers for choosing and displaying the length and width
    var lengthNumberPicker = new NumberPicker( billiardsTableModel.lengthProperty, new Property( billiardsTableModel.range ), NUMBER_PICKER_OPTIONS );
    var widthNumberPicker = new NumberPicker( billiardsTableModel.widthProperty, new Property( billiardsTableModel.range ), NUMBER_PICKER_OPTIONS );

    // The table itself, with the ball/holes/gridlines/etc.
    var billiardsTableNode = new BilliardsTableNode( new Vector2( 280, layoutBounds.centerY ), billiardsTableModel, {
      x: options.side === 'left' ? 0 : -100
    } );

    // Only show the table when it is revealed
    revealProperty.linkAttribute( billiardsTableNode, 'visible' );

    /**
     * Adds a text label to a spinner.
     *
     * @param {string} label - text to show for the spinner icon
     * @param {Node} node - spinner the label will be shown for
     * @returns {*}
     */
    var toVBox = function( label, node ) {
      return new VBox( {
        spacing: 15, children: [
          new Text( label, {
            maxWidth: 126, // ceiling value from ?stringTest=double for English
            fontSize: ProportionPlaygroundConstants.CONTROL_FONT_SIZE
          } ),
          node
        ]
      } );
    };

    // Super call
    Node.call( this, {
      children: [
        new VBox( {
          spacing: 30,
          y: 100,
          centerX: options.side === 'left' ? 0 : 450, // position around the origin
          children: [
            toVBox( lengthString, lengthNumberPicker ),
            toVBox( widthString, widthNumberPicker )
          ]
        } ),
        billiardsTableNode
      ]
    } );
  }

  proportionPlayground.register( 'BilliardsTableNodeWithSpinners', BilliardsTableNodeWithSpinners );

  return inherit( Node, BilliardsTableNodeWithSpinners );
} );
