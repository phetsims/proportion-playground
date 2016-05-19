// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NecklaceModel = require( 'PROPORTION_PLAYGROUND/explore/model/NecklaceModel' );
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function NecklaceSceneModel() {
    PropertySet.call( this, { showBothNecklaces: false } );

    this.necklace1Model = new NecklaceModel();
    this.necklace2Model = new NecklaceModel();
  }

  proportionPlayground.register( 'NecklaceSceneModel', NecklaceSceneModel );
  
  return inherit( PropertySet, NecklaceSceneModel, {} );
} );