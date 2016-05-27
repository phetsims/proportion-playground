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
  var PropertySet = require( 'AXON/PropertySet' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @param {Object} [otherProperties] - additional properties to be added to the PropertySet.
   * @constructor
   */
  function ExploreSceneModel( predictMode, otherProperties ) {
    this.predictMode = predictMode;

    PropertySet.call( this, _.extend( {
      reveal: !predictMode, // {boolean} @public - true if the answer is being shown
      showBoth: false // {boolean} @public - true if both representations should be shown
    }, otherProperties ) );

    // @public (read-only) These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.revealProperty = this.revealProperty || null;
    this.showBothProperty = this.showBothProperty || null;
  }

  proportionPlayground.register( 'ExploreSceneModel', ExploreSceneModel );

  return inherit( PropertySet, ExploreSceneModel, {

    /**
     * Register properties that would trigger a revealed representation to be hidden, in the Predict screen.
     *
     * @param {Property[]} properties - the array of Property instances that cause the representation to be masked
     * @protected
     */
    registerChangeProperties: function( properties ) {
      assert && assert( this.predictMode, 'only register change properties for predict mode' );
      var exploreSceneModel = this;

      // In the predict screen, when one of the spinner is changed, hide the representations again.
      Property.multilink( properties, function() {
        exploreSceneModel.reveal = false;
      } );
    }
  } );
} );