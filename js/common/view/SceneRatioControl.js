// Copyright 2016, University of Colorado Boulder

/**
 * Base type for a combined visual representation with controls (spinners, etc.) for the ratio-based items
 * (necklaces, billiard tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  var Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );

  var PICKER_BOTTOM = 540;

  /**
   * @constructor
   *
   * @param {SceneRatio} sceneRatio
   * @param {Object} [options]
   */
  function SceneRatioControl( sceneRatio, options ) {
    options = _.extend( {
      // Usually one color is provided, but we need to handle multiple colors for the paint scene.
      // If there is more than one color, then paintChoiceProperty will control which color is visible.
      leftPickerColorProperty: null, // {Property.<Color>} TODO: suitable defaults in this defaults block?
      rightPickerColorProperty: null, // {Property.<Color>}
      // Other options provided directly to the picker
      leftPickerOptions: {}, // {Object}
      rightPickerOptions: {}, // {Object}
      leftPickerLabel: null, // {Node|string|null}
      rightPickerLabel: null, // {Node|string|null}
      paintChoiceProperty: null, // {Property.<PaintChoice>|null} - Currently true when the second color should be shown.
      pickerLabelMaxWidth: 150
    }, options );

    Node.call( this, options );

    sceneRatio.controlsVisibleProperty.linkAttribute( this, 'visible' );

    /**
     * Creates a Node representing a single picker (may include multiple pickers due to needing multiple colors)
     * @private
     *
     * @param {Property.<number>} property - The numeric value
     * @param {Range} range - The range of possible values
     * @param {Property.<Color>} colorProperty
     * @param {Node|string|null} label - If available, will be placed above the picker. Strings will use Text.
     * @param {Side} side - Whether we are the left picker or right.
     * @param {Object} pickerOptions - Any options to provide directly to the NumberPicker
     * @returns {Node}
     */
    function createPickers( property, range, colorProperty, label, side, pickerOptions ) {
      // Use MutableOptionsNode, see https://github.com/phetsims/scenery-phet/issues/287
      var staticOptions = _.extend( { scale: 2 }, pickerOptions );
      var dynamicOptions = { color: colorProperty };
      var picker = new MutableOptionsNode( NumberPicker, [ property, new Property( range ) ], staticOptions, dynamicOptions );

      // If there is a label, we'll add it above the picker
      if ( label ) {
        // Convert a string label to a Text node.
        if ( typeof label === 'string' ) {
          label = new Text( label, {
            maxWidth: options.pickerLabelMaxWidth, //TODO: check
            font: ProportionPlaygroundConstants.CONTROL_FONT
          } );
        }

        return new VBox( {
          spacing: 10,
          children: [
            label,
            picker
          ]
        } );
      // With no label, return the picker directly
      } else {
        return picker;
      }
    }

    // @protected {Node}
    this.leftPicker = createPickers( sceneRatio.leftProperty, sceneRatio.leftRange, options.leftPickerColorProperty,
                                     options.leftPickerLabel, Side.LEFT, options.leftPickerOptions );
    this.rightPicker = createPickers( sceneRatio.rightProperty, sceneRatio.rightRange, options.rightPickerColorProperty,
                                      options.rightPickerLabel, Side.RIGHT, options.rightPickerOptions );

    // @protected {Node|null} - Will be initialized when one of the add-picker functions is called.
    this.pickerContainer = null;
  }

  proportionPlayground.register( 'SceneRatioControl', SceneRatioControl );

  return inherit( Node, SceneRatioControl, {
    /**
     * Add both pickers to the bottom-middle.
     * @protected
     */
    addBottomPickers: function() {
      this.pickerContainer = new HBox( {
        spacing: 15,
        bottom: PICKER_BOTTOM,
        centerX: 0,
        align: 'bottom', // Some have labels of different height on top
        children: [ this.leftPicker, this.rightPicker ]
      } );
      this.addChild( this.pickerContainer );
    },

    /**
     * Add both pickers to the bottom, with horizontal centers specified
     * @protected
     *
     * @param {number} leftPickerX
     * @param {number} rightPickerX
     */
    addBottomPickersWithLocation: function( leftPickerX, rightPickerX ) {
      this.leftPicker.centerX = leftPickerX;
      this.rightPicker.centerX = rightPickerX;
      this.leftPicker.bottom = this.rightPicker.bottom = PICKER_BOTTOM;
      this.pickerContainer = new Node( {
        children: [ this.leftPicker, this.rightPicker ]
      } );
      this.addChild( this.pickerContainer );
    }
  } );
} );
