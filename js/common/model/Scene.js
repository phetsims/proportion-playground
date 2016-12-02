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
   * @constructor
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function Scene( predictMode ) {
    this.predictMode = predictMode;

    // @public {BooleanProperty} - Whether the visual representation is being shown
    // TODO: consider rename
    this.revealProperty = new BooleanProperty( !predictMode );

    // @public {BooleanProperty} - Whether both representations are shown
    // TODO: consider rename
    this.showBothProperty = new BooleanProperty( false );

    //TODO: Close to being able to avoid passing in predictMode at all
    if ( predictMode ) {
      // In the predict screen, hide representations when one of the spinners is changed
      Property.multilink( this.quantityProperties, this.revealProperty.set.bind( this.revealProperty, false ) );
    }
  }

  proportionPlayground.register( 'Scene', Scene );

  return inherit( Object, Scene, {
    /**
     * Resets the scene
     * @public
     */
    reset: function() {
      // Owned properties
      this.revealProperty.reset();
      this.showBothProperty.reset();
    }
  } );
} );
