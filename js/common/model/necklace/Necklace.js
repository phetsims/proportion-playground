// Copyright 2016, University of Colorado Boulder

/**
 * The model for a single necklace, which is a collection of round and square beads.  The pattern (order of beads)
 * is implemented in the view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NecklaceLayout = require( 'PROPORTION_PLAYGROUND/common/model/necklace/NecklaceLayout' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );

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
