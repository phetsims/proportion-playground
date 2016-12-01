// Copyright 2016, University of Colorado Boulder

/**
 * Model for the Explore Screen, which is also reused (with a flag) for the Predict Screen
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NecklaceScene = require( 'PROPORTION_PLAYGROUND/common/model/necklace/NecklaceScene' );
  var PaintScene = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintScene' );
  var BilliardsScene = require( 'PROPORTION_PLAYGROUND/common/model/billiards/BilliardsScene' );
  var AppleScene = require( 'PROPORTION_PLAYGROUND/common/model/apples/AppleScene' );
  var ProportionPlaygroundQueryParameters = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundQueryParameters' );

  /**
   * @constructor
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function ProportionModel( predictMode ) {
    // @public {number} 0-indexed, indicating the scene
    //TODO: consider this containing the entire sceneModel
    this.sceneProperty = new Property( ProportionPlaygroundQueryParameters.scene );

    // @public (read-only) - the model for each scene
    this.necklaceSceneModel = new NecklaceScene( predictMode );
    this.paintSceneModel = new PaintScene( predictMode );
    this.billiardsSceneModel = new BilliardsScene( predictMode );
    this.appleSceneModel = new AppleScene( predictMode );

    // Also keep track of the models so they can be addressed as a group (for reset) or by index (for stepping)
    // @private
    this.models = [
      this.necklaceSceneModel,
      this.paintSceneModel,
      this.billiardsSceneModel,
      this.appleSceneModel
    ];

    // @public (read-only) - for the Predict screen, show a reveal button
    this.predictMode = predictMode;
  }

  proportionPlayground.register( 'ProportionModel', ProportionModel );

  return inherit( Object, ProportionModel, {
    /**
     * Reset the model and all of the models for each scene.
     * @public
     */
    reset: function() {
      this.sceneProperty.reset();
      this.models.forEach( function( model ) {
        model.reset();
      } );
    },

    /**
     * Step forward in time by dt
     * @public
     *
     * @param {number} dt - time passed in seconds
     */
    step: function( dt ) {

      // If the model has a step function, call it.
      var activeModel = this.models[ this.sceneProperty.value ];
      activeModel.step && activeModel.step( dt );
    }
  } );
} );
