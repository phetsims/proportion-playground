// Copyright 2016-2020, University of Colorado Boulder

/**
 * Base type for a combined visual representation with controls (spinners, etc.) for the ratio-based items
 * (necklaces, billiard tables, splotches, etc.)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Property from '../../../../axon/js/Property.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import NumberPicker from '../../../../scenery-phet/js/NumberPicker.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import MutableOptionsNode from '../../../../sun/js/MutableOptionsNode.js';
import proportionPlayground from '../../proportionPlayground.js';
import Side from '../model/Side.js';
import ProportionPlaygroundConstants from '../ProportionPlaygroundConstants.js';

// Bottom y value in layoutBounds for the pickers
const PICKER_BOTTOM = 540;

/**
 * @constructor
 * @extends {Node}
 *
 * @param {SceneRatio} sceneRatio
 * @param {Property.<Color>} leftPickerColorProperty - The color of the left picker's arrows
 * @param {Property.<Color>} rightPickerColorProperty - The color of the right picker's arrows
 * @param {Object} [options] - node options
 */
function SceneRatioControl( sceneRatio, leftPickerColorProperty, rightPickerColorProperty, options ) {
  options = merge( {
    leftPickerOptions: {}, // {Object} - Directly provided to the picker (for additional options)
    rightPickerOptions: {}, // {Object} - Directly provided to the picker (for additional options)
    leftPickerLabel: null, // {Node|string|null}
    rightPickerLabel: null, // {Node|string|null}
    pickerLabelMaxWidth: 150 // {number}
  }, options );

  Node.call( this, options );

  sceneRatio.controlsVisibleProperty.linkAttribute( this, 'visible' );

  /**
   * Creates a Node representing a single picker (may include multiple pickers due to needing multiple colors)
   * @private
   *
   * @param {Side} side - Whether we are the left picker or right.
   * @param {Node|string|null} label - If available, will be placed above the picker. Strings will use Text.
   * @param {Object} pickerOptions - Any options to provide directly to the NumberPicker
   * @returns {Node}
   */
  function createPickers( side, label, pickerOptions ) {
    // Use MutableOptionsNode, see https://github.com/phetsims/scenery-phet/issues/287
    const staticOptions = merge( {
      scale: 2,
      valueMaxWidth: 40,
      timerInterval: 100
    }, pickerOptions );
    const dynamicOptions = {
      color: side === Side.LEFT ? leftPickerColorProperty : rightPickerColorProperty
    };
    const picker = new MutableOptionsNode( NumberPicker, [ sceneRatio.getProperty( side ), new Property( sceneRatio.getRange( side ) ) ], staticOptions, dynamicOptions );

    // If there is a label, we'll add it above the picker
    if ( label ) {
      // Convert a string label to a Text node.
      if ( typeof label === 'string' ) {
        label = new Text( label, {
          maxWidth: options.pickerLabelMaxWidth,
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
    }
    // With no label, return the picker directly
    else {
      return picker;
    }
  }

  // @protected {Node}
  this.leftPicker = createPickers( Side.LEFT, options.leftPickerLabel, options.leftPickerOptions );
  this.rightPicker = createPickers( Side.RIGHT, options.rightPickerLabel, options.rightPickerOptions );

  // @protected {Node|null} - Will be initialized when one of the add-picker functions is called.
  this.pickerContainer = null;
}

proportionPlayground.register( 'SceneRatioControl', SceneRatioControl );

inherit( Node, SceneRatioControl, {
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
  addBottomPickersWithPosition: function( leftPickerX, rightPickerX ) {
    this.leftPicker.centerX = leftPickerX;
    this.rightPicker.centerX = rightPickerX;
    this.leftPicker.bottom = this.rightPicker.bottom = PICKER_BOTTOM;
    this.pickerContainer = new Node( {
      children: [ this.leftPicker, this.rightPicker ]
    } );
    this.addChild( this.pickerContainer );
  }
} );

export default SceneRatioControl;
