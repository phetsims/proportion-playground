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
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );

  /**
   *
   * @param {Splotch} splotch - the model
   * @param {Property.<PaintChoice>} paintChoiceProperty - Holds our current paint choice
   * @param {Property.<boolean>} revealProperty - indicates whether the billiards table should be shown
   * @constructor
   */
  function SplotchControl( splotch, paintChoiceProperty, revealProperty ) {
    SceneRatioControl.call( this, splotch, {
      leftPickerColors: PaintChoice.CHOICES.map( function( choice ) { return choice.leftColor; } ),
      rightPickerColors: PaintChoice.CHOICES.map( function( choice ) { return choice.rightColor; } ),
      paintChoiceProperty: paintChoiceProperty
    } );

    this.addChild( new SplotchNode( splotch, paintChoiceProperty ) ); // TODO: how is this positioned?
    this.addBottomPickers();
  }

  proportionPlayground.register( 'SplotchControl', SplotchControl );

  return inherit( SceneRatioControl, SplotchControl );
} );
