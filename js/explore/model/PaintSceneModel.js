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
  var SplotchModel = require( 'PROPORTION_PLAYGROUND/explore/model/SplotchModel' );

  function PaintSceneModel() {
    PropertySet.call( this, {
      showBothSplotches: false,
      grayscale: false
    } );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.showBothSplotchesProperty = this.showBothSplotchesProperty || null;
    this.grayscaleProperty = this.grayscaleProperty || null;

    this.splotch1Model = new SplotchModel();
    this.splotch2Model = new SplotchModel();
  }

  proportionPlayground.register( 'PaintSceneModel', PaintSceneModel );

  return inherit( PropertySet, PaintSceneModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.splotch1Model.reset();
      this.splotch2Model.reset();
    }
  } );
} );