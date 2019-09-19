// Copyright 2016-2017, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with NumberPickers to change the amount of each type of bead.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const NecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceNode' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const RoundBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/RoundBeadNode' );
  const SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  const SquareBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/SquareBeadNode' );

  /**
   * @constructor
   * @extends {SceneRatioControl}
   *
   * @param {Necklace} necklace - the model
   */
  function NecklaceControl( necklace ) {
    SceneRatioControl.call( this, necklace, ProportionPlaygroundColorProfile.necklaceRoundBeadProperty,
      ProportionPlaygroundColorProfile.necklaceSquareBeadProperty, {
        leftPickerLabel: new RoundBeadNode(),
        rightPickerLabel: new SquareBeadNode( 0 )
      } );

    // The necklace itself
    this.addChild( new NecklaceNode( necklace ) );
    this.addBottomPickers();
  }

  proportionPlayground.register( 'NecklaceControl', NecklaceControl );

  return inherit( SceneRatioControl, NecklaceControl );
} );
