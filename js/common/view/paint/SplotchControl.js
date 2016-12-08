// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable SplotchNode with its associated NumberPickers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var ColorMap = require( 'PROPORTION_PLAYGROUND/common/view/paint/ColorMap' );

  /**
   *
   * @param {Splotch} splotch - the model
   * @param {Property.<boolean>} grayscaleProperty - property that indicates whether colors are shown as grayscale
   * @param {Property.<boolean>} revealProperty - indicates whether the billiards table should be shown
   * @constructor
   */
  function SplotchControl( splotch, grayscaleProperty, revealProperty ) {
    SceneRatioControl.call( this, splotch, {
      leftPickerColors: [ ColorMap.getColor( 0 ), 'black' ],
      rightPickerColors: [ ColorMap.getColor( 1 ), 'white' ],
      pickerColorProperty: grayscaleProperty
    } );

    this.addChild( new SplotchNode( splotch, grayscaleProperty ) ); // TODO: how is this positioned?
    this.addBottomPickers();
  }

  proportionPlayground.register( 'SplotchControl', SplotchControl );

  return inherit( SceneRatioControl, SplotchControl );
} );
