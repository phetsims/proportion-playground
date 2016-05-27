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
  var NecklaceSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/necklace/NecklaceSceneModel' );
  var PaintSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/paint/PaintSceneModel' );
  var BilliardsSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/billiards/BilliardsSceneModel' );
  var AppleSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/apples/AppleSceneModel' );
  var ProportionPlaygroundQueryParameters = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundQueryParameters' );

  /**
   * @constructor
   */
  function ExploreModel( predictMode ) {

    PropertySet.call( this, {
      scene: ProportionPlaygroundQueryParameters.SCENE // {number} @public , 0-indexed, indicating the scene
    } );

    // @public (read-only) These assignments provide improved highlighting and navigation in IntelliJ IDEA
    this.sceneProperty = this.sceneProperty || null;

    // @public
    this.necklaceSceneModel = new NecklaceSceneModel( predictMode );
    this.paintSceneModel = new PaintSceneModel( predictMode );
    this.billiardsSceneModel = new BilliardsSceneModel( predictMode );
    this.appleSceneModel = new AppleSceneModel( predictMode );

    // Also keep track of the models so they can be addressed as a group (for reset) or by index (for stepping)
    this.models = [
      this.necklaceSceneModel,
      this.paintSceneModel,
      this.billiardsSceneModel,
      this.appleSceneModel
    ];

    // @public (read-only) - for the Predict screen, show a reveal button
    this.predictMode = predictMode;
  }

  proportionPlayground.register( 'ExploreModel', ExploreModel );

  return inherit( PropertySet, ExploreModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.models.forEach( function( model ) {model.reset();} );
    },

    // @public
    step: function( dt ) {

      // If the model has a step function, call it.
      this.models[ this.scene ].step && this.models[ this.scene ].step( dt );
    }
  } );
} );