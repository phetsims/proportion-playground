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
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Range = require( 'DOT/Range' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );

  /**
   * @constructor
   *
   * @param {BooleanProperty} visibleProperty - Whether we are visible or not
   */
  function Necklace( visibleProperty ) {
    // @public {NumberProperty} - Quantity of round beads in the necklace
    this.roundBeadCountProperty = new NumberProperty( 0 );

    // @public {NumberProperty} - Quantity of square beads in the necklace
    this.squareBeadCountProperty = new NumberProperty( 0 );

    // @public {Range} - Allowed range of bead counts
    this.beadCountRange = new Range( 0, ProportionPlaygroundConstants.MAX_BEADS );

    SceneRatio.call( this, visibleProperty, [
      this.roundBeadCountProperty,
      this.squareBeadCountProperty
    ] );
  }

  proportionPlayground.register( 'Necklace', Necklace );

  return inherit( SceneRatio, Necklace );
} );