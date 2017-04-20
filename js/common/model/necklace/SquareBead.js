// Copyright 2017, University of Colorado Boulder

/**
 * Simple model for the location of a square bead
 *
 * @author Jonathan Olson
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {Vector2} center - The center (in model coordinates) of the bead.
   * @param {number} angle - Rotation applied to the bead, so it is aligned along the necklace's string.
   */
  function SquareBead( center, angle ) {

    // @public {Vector2}
    this.center = center;

    // @public {number}
    this.angle = angle;
  }

  proportionPlayground.register( 'SquareBead', SquareBead );

  return inherit( Object, SquareBead );
} );
