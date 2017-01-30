// Copyright 2014-2015, University of Colorado Boulder

/**
 * Colors for the Proportion Playground sim.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  var Color = require( 'SCENERY/util/Color' );

  // Initial colors for each profile, by string key. If a basics/projector color is not defined, it will take the
  // 'default' value provided.
  // NOTE: This is NOT provided to clients directly, but is passed to the PropertySet constructor.
  var ProportionPlaygroundColorProfile = new ColorProfile( {
    background: { default: new Color( '#fcf3eb' ) }
  }, [ 'default' ] );

  proportionPlayground.register( 'ProportionPlaygroundColorProfile', ProportionPlaygroundColorProfile );

  return ProportionPlaygroundColorProfile;
} );
