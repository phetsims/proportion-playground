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
  var VBox = require( 'SCENERY/nodes/VBox' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

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
      rightPickerLabel: null // {Node|string}
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

    //TODO {Node}
    this.leftPicker = createPicker( sceneRatio.leftProperty, sceneRatio.leftRange, options.leftPickerColor, options.leftPickerLabel, options.leftPickerOptions );
    this.rightPicker = createPicker( sceneRatio.rightProperty, sceneRatio.rightRange, options.rightPickerColor, options.rightPickerLabel, options.rightPickerOptions );
  }

  proportionPlayground.register( 'SceneRatioControl', SceneRatioControl );

  return inherit( Node, SceneRatioControl );
} );
