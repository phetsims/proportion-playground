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
  var NecklaceSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/NecklaceSceneModel' );
  var PaintSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/PaintSceneModel' );

  /**
   * @constructor
   */
  function ExploreModel() {

    PropertySet.call( this, {
      scene: 1
    } );
    this.necklaceSceneModel = new NecklaceSceneModel();
    this.paintSceneModel = new PaintSceneModel();

    // This line provided for code highlighting and navigation in IntelliJ IDEA
    // TODO: Delete this line
    this.sceneProperty = this.sceneProperty || null;
  }

  proportionPlayground.register( 'ExploreModel', ExploreModel );

  return inherit( PropertySet, ExploreModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.necklaceSceneModel.reset();
    },
    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );