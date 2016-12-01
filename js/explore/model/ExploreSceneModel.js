// Copyright 2016, University of Colorado Boulder

/**
 * The base class for an Explore/Predict scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function ExploreSceneModel( predictMode ) {
    this.predictMode = predictMode;

    // @public {BooleanProperty} - Whether the visual representation is being shown
    // TODO: consider rename
    this.revealProperty = new BooleanProperty( !predictMode );

    // @public {BooleanProperty} - Whether both representations are shown
    // TODO: consider rename
    this.showBothProperty = new BooleanProperty( false );
  }

  proportionPlayground.register( 'ExploreSceneModel', ExploreSceneModel );

  return inherit( Object, ExploreSceneModel, {
    /**
     * Resets the scene
     * @public
     */
    reset: function() {
      this.revealProperty.reset();
      this.showBothProperty.reset();
    },

    /**
     * Register properties that would trigger a revealed representation to be hidden, in the Predict screen.
     * @protected
     *
     * TODO: better type doc
     * @param {Property[]} properties - the array of Property instances that cause the representation to be masked
     */
    registerChangeProperties: function( properties ) {
      assert && assert( this.predictMode, 'only register change properties for predict mode' );
      var self = this;

      // In the predict screen, when one of the spinner is changed, hide the representations again.
      Property.multilink( properties, function() {
        self.revealProperty.value = false;
      } );
    }
  } );
} );
