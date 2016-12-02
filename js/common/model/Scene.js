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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function Scene( predictMode ) {
    // @public {boolean} - Whether predictions should be made for this scene.
    this.predictMode = predictMode;

    // @public {BooleanProperty} - Whether the visual representation is being shown
    // TODO: consider rename
    this.revealProperty = new BooleanProperty( !predictMode );

    // @public {BooleanProperty} - Whether both representations are shown
    // TODO: consider rename
    this.showBothProperty = new BooleanProperty( false );

    // @public {Property.<boolean>} - Whether the left ratio is visible.
    this.leftVisibleProperty = this.revealProperty;

    // @public {Property.<boolean>} - Whether the right ratio is visible.
    this.rightVisibleProperty = DerivedProperty.and( [ this.revealProperty, this.showBothProperty ] );
  }

  proportionPlayground.register( 'Scene', Scene );

  return inherit( Object, Scene, {
    /**
     * Initializes the Scene with the two SceneRatio objects.
     * @protected
     *
     * @param {SceneRatio} leftRatio
     * @param {SceneRatio} rightRatio
     */
    initializeRatios: function( leftRatio, rightRatio ) {
      // @public {Array.<SceneRatio>}
      this.ratios = [ leftRatio, rightRatio ];

      // @public {Array.<NumberProperty>}
      this.quantityProperties = leftRatio.quantityProperties.concat( rightRatio.quantityProperties );

      //TODO: Close to being able to avoid passing in predictMode at all
      if ( this.predictMode ) {
        // In the predict screen, hide representations when one of the spinners is changed
        Property.multilink( this.quantityProperties, this.revealProperty.set.bind( this.revealProperty, false ) );
      }
    },

    /**
     * Returns whether our two ratios are equivalent (handling division by 0 properly).
     * @public
     *
     * @returns {boolean}
     */
    areRatiosEquivalent: function() {
      return this.ratios[ 0 ].isEquivalentTo( this.ratios[ 1 ] );
    },

    /**
     * Steps the scene forward in time.
     * @public
     *
     * @param {number} dt
     */
    step: function( dt ) {
      // Default is no-op (override when behavior is needed)
    },

    /**
     * Resets the scene
     * @public
     */
    reset: function() {
      // Owned properties
      this.revealProperty.reset();
      this.showBothProperty.reset();

      this.ratios.forEach( function( sceneRatio ) {
        sceneRatio.reset();
      } );
    }
  } );
} );
