// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function PaintSceneModel() {
    PropertySet.call( this, { showBothNecklaces: false } );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.showBothNecklacesProperty = this.showBothNecklacesProperty || null;

    // this.necklace1Model = new NecklaceModel();
    // this.necklace2Model = new NecklaceModel();
  }

  proportionPlayground.register( 'PaintSceneModel', PaintSceneModel );

  return inherit( PropertySet, PaintSceneModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.necklace1Model.reset();
      this.necklace2Model.reset();
    }
  } );
} );