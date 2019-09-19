// Copyright 2016-2017, University of Colorado Boulder

/**
 * Model for the Explore Screen, which is also reused (with a flag) for the Predict Screen
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AppleScene = require( 'PROPORTION_PLAYGROUND/common/model/apples/AppleScene' );
  const BilliardsScene = require( 'PROPORTION_PLAYGROUND/common/model/billiards/BilliardsScene' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NecklaceScene = require( 'PROPORTION_PLAYGROUND/common/model/necklace/NecklaceScene' );
  const PaintScene = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintScene' );
  const Property = require( 'AXON/Property' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundQueryParameters = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundQueryParameters' );

  /**
   * @constructor
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function ProportionModel( predictMode ) {
    // @public (read-only) - the model for each scene
    this.necklaceScene = new NecklaceScene( predictMode );
    this.paintScene = new PaintScene( predictMode );
    this.billiardsScene = new BilliardsScene( predictMode );
    this.appleScene = new AppleScene( predictMode );

    // @private {Array.<Scene>} - List of all scenes in order (can be handled as a group)
    this.scenes = [
      this.necklaceScene,
      this.paintScene,
      this.billiardsScene,
      this.appleScene
    ];

    // @public {Property.<Scene>} - Our currently-selected scene (can change with a query parameter)
    this.sceneProperty = new Property( this.scenes[ ProportionPlaygroundQueryParameters.scene ] );

    // @public (read-only) - for the Predict screen, show a reveal button
    this.predictMode = predictMode;
  }

  proportionPlayground.register( 'ProportionModel', ProportionModel );

  return inherit( Object, ProportionModel, {
    /**
     * Reset the model and all of the scenes.
     * @public
     */
    reset: function() {
      this.sceneProperty.reset();

      this.scenes.forEach( function( scene ) {
        scene.reset();
      } );
    },

    /**
     * Step forward in time by dt.
     * @public
     *
     * @param {number} dt - time passed in seconds
     */
    step: function( dt ) {
      // Cap DT at the top level
      dt = Math.min( dt, 0.25 );

      this.sceneProperty.value.step( dt );
    }
  } );
} );
