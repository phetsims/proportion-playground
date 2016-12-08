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
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   */
  function Splotch( visibleProperty, controlsVisibleProperty ) {

    // @public {NumberProperty} - Amount of paint from the color choice on the left
    this.leftColorCountProperty = new NumberProperty( 0 );

    // @public {NumberProperty} - Amount of paint form the color choice on the right
    this.rightColorCountProperty = new NumberProperty( 0 );

    // @public (read-only) the range for colors
    //TODO: do we need this outside of the SceneRatio call?
    this.colorCountRange = new Range( 0, 20 );

    SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
                     this.leftColorCountProperty, this.colorCountRange,
                     this.rightColorCountProperty, this.colorCountRange );
  }

  proportionPlayground.register( 'Splotch', Splotch );

  return inherit( SceneRatio, Splotch );
} );
