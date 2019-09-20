// Copyright 2016-2019, University of Colorado Boulder

/**
 * The model for a single necklace, which is a collection of round and square beads.  The pattern (order of beads)
 * is implemented in the view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NecklaceLayout = require( 'PROPORTION_PLAYGROUND/common/model/necklace/NecklaceLayout' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  const SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );

  /**
   * @constructor
   * @extends {SceneRatio}
   *
   * @param {number} initialRoundCount - Initial number of round beads
   * @param {number} initialSquareCount - Initial number of square beads
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   */
  function Necklace( initialRoundCount, initialSquareCount, visibleProperty, controlsVisibleProperty ) {
    // @public {NumberProperty} - Quantity of round beads in the necklace
    this.roundBeadCountProperty = new NumberProperty( initialRoundCount );

    // @public {NumberProperty} - Quantity of square beads in the necklace
    this.squareBeadCountProperty = new NumberProperty( initialSquareCount );

    // @public {Property.<NecklaceLayout>}
    this.layoutProperty = new DerivedProperty( [
        this.roundBeadCountProperty,
        this.squareBeadCountProperty ],
      function( roundBeadCount, squareBeadCount ) {
        return NecklaceLayout.getLayout( roundBeadCount, squareBeadCount );
      } );

    SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
      this.roundBeadCountProperty, ProportionPlaygroundConstants.BEAD_COUNT_RANGE,
      this.squareBeadCountProperty, ProportionPlaygroundConstants.BEAD_COUNT_RANGE );
  }

  proportionPlayground.register( 'Necklace', Necklace );

  return inherit( SceneRatio, Necklace );
} );
