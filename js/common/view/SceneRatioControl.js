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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  var PICKER_BOTTOM = 550;

  /**
   * @constructor
   *
   * @param {SceneRatio} sceneRatio
   */
  function SceneRatioControl( sceneRatio, options ) {
    options = _.extend( {
      //TODO doc
      leftPickerColor: 'black',
      rightPickerColor: 'black',
      leftPickerOptions: {},
      rightPickerOptions: {},
      leftPickerLabel: null, // {Node|string}
      rightPickerLabel: null, // {Node|string}
      pickerColorProperty: null
    }, options );

    Node.call( this, options );

    sceneRatio.controlsVisibleProperty.linkAttribute( this, 'visible' );

    function createPicker( property, range, color, label, pickerOptions ) {
      var picker = new NumberPicker(
        property,
        new Property( range ),
        _.extend( {
          color: color,
          scale: 2
        }, pickerOptions )
      );

      if ( label ) {
        if ( typeof label === 'string' ) {
          label = new Text( label, {
            maxWidth: 180, //TODO: check
            font: new PhetFont( ProportionPlaygroundConstants.CONTROL_FONT_SIZE )
          } );
        }
        return new VBox( {
          spacing: 10,
          children: [
            label,
            picker
          ]
        } );
      } else {
        return picker;
      }
    }

    function createPickers( property, range, color, label, pickerOptions ) {
      if ( color instanceof Array ) {
        var pickers = color.map( function( singleColor ) {
          return createPicker( property, range, singleColor, label, pickerOptions );
        } );
        // Only show the picker that should be visible
        options.pickerColorProperty.link( function( showSecond ) {
          pickers[ 0 ].visible = !showSecond;
          pickers[ 1 ].visible = showSecond;
        } );
        return new Node( {
          children: pickers
        } );
      }
      else {
        return createPicker( property, range, color, label, pickerOptions );
      }
    }

    //TODO {Node}
    this.leftPicker = createPickers( sceneRatio.leftProperty, sceneRatio.leftRange, options.leftPickerColor, options.leftPickerLabel, options.leftPickerOptions );
    this.rightPicker = createPickers( sceneRatio.rightProperty, sceneRatio.rightRange, options.rightPickerColor, options.rightPickerLabel, options.rightPickerOptions );
    this.pickerContainer = null; // @protected
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
