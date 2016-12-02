// Copyright 2016, University of Colorado Boulder

/**
 * The model for a single paint splotch. Colors are combined in the view.
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
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );

  /**
   * @constructor
   *
   * @param {BooleanProperty} visibleProperty - Whether we are visible or not
   */
  function Splotch( visibleProperty ) {

    // @public {NumberProperty} - Amount of paint from the color choice on the left
    this.leftColorCountProperty = new NumberProperty( 0 );

    // @public {NumberProperty} - Amount of paint form the color choice on the right
    this.rightColorCountProperty = new NumberProperty( 0 );

    // @public (read-only) the range for colors
    this.colorCountRange = new Range( 0, 20 );

    SceneRatio.call( this, visibleProperty, [
      this.leftColorCountProperty,
      this.rightColorCountProperty
    ] );
  }

  proportionPlayground.register( 'Splotch', Splotch );

  return inherit( SceneRatio, Splotch );
} );
