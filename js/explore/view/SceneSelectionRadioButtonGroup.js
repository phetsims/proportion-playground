// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  function SceneSelectionRadioButtonGroup( sceneProperty, options ) {
    var textOptions = { fontSize: 36 };
    RadioButtonGroup.call( this, sceneProperty, [ {
      value: 0,
      node: new Text( 'Necklace', textOptions )
    }, {
      value: 1,
      node: new Text( 'Paint', textOptions )
    }, {
      value: 2,
      node: new Text( 'Billiards', textOptions )
    }, {
      value: 3,
      node: new Text( 'Apples', textOptions )
    } ], {
      orientation: 'horizontal',
      buttonContentXMargin: 30,
      buttonContentYMargin: 15,
      selectedStroke: PhetColorScheme.RESET_ALL_BUTTON_BASE_COLOR,
      selectedLineWidth: 4,
      baseColor: 'white'
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'SceneSelectionRadioButtonGroup', SceneSelectionRadioButtonGroup );

  return inherit( RadioButtonGroup, SceneSelectionRadioButtonGroup );
} );