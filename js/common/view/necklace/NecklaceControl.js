// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with NumberPickers to change the amount of each type of bead.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceNode' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/SquareBeadNode' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );

  /**
   * @constructor
   *
   * @param {Necklace} necklace - the model
   * @param {Property.<boolean>} revealProperty - true if the necklace should be shown.
   */
  function NecklaceControl( necklace, revealProperty ) {
    SceneRatioControl.call( this, necklace, {
      leftPickerColorProperty: ProportionPlaygroundColorProfile.necklaceRoundBeadProperty,
      leftPickerLabel: new RoundBeadNode(),
      rightPickerColorProperty: ProportionPlaygroundColorProfile.necklaceSquareBeadProperty,
      rightPickerLabel: new SquareBeadNode( 0 )
    } );

    // The necklace itself
    this.addChild( new NecklaceNode( necklace ) ); // TODO: how is this positioned?
    this.addBottomPickers();
  }

  proportionPlayground.register( 'NecklaceControl', NecklaceControl );

  return inherit( SceneRatioControl, NecklaceControl );
} );
