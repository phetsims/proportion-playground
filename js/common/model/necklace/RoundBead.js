// Copyright 2017, University of Colorado Boulder

/**
 * Simple model for the location of a round bead
 *
 * @author Jonathan Olson
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {Vector2} center - The center (in model coordinates) of the bead
   */
  function RoundBead( center ) {

    // @public {Vector2}
    this.center = center;
  }

  proportionPlayground.register( 'RoundBead', RoundBead );

  return inherit( Object, RoundBead );
} );
