// Copyright 2016-2022, University of Colorado Boulder

/**
 * The base class for an Explore/Predict scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import proportionPlayground from '../../proportionPlayground.js';

class Scene extends PhetioObject {
  /**
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @param {Tandem} tandem
   */
  constructor( predictMode, tandem ) {
    super( {
      phetioType: SceneIO,
      tandem: tandem
    } );

    // @public {Array.<SceneRatio>} - Initialized to a 2-length array (left and right ratios) in initializeRatios().
    this.ratios = [];

    // @public {Array.<NumberProperty>} - Initialized to a 2-length array (left and right quantity properties) in
    // initializeRatios().
    this.quantityProperties = [];

    // @public {boolean} - Whether predictions should be made for this scene.
    this.predictMode = predictMode;

    // @public {BooleanProperty} - Whether the visual representation is being shown
    this.revealProperty = new BooleanProperty( !predictMode, {
      tandem: tandem.createTandem( 'revealProperty' )
    } );

    // @public {BooleanProperty} - Whether both representations are shown
    this.showBothProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showBothProperty' )
    } );

    // @public {Property.<boolean>} - Whether the left ratio is visible.
    this.leftVisibleProperty = this.revealProperty;

    // @public {Property.<boolean>} - Whether the right ratio is visible.
    this.rightVisibleProperty = DerivedProperty.and( [ this.revealProperty, this.showBothProperty ] );

    // @public {Property.<boolean>} - Whether the controls for the left ratio are visible
    this.leftControlsVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'leftControlsVisibleProperty' )
    } );

    // @public {Property.<boolean>} - Whether the controls for the right ratio are visible
    this.rightControlsVisibleProperty = this.showBothProperty;
  }

  /**
   * Initializes the Scene with the two SceneRatio objects.
   * @protected
   *
   * @param {SceneRatio} leftRatio
   * @param {SceneRatio} rightRatio
   */
  initializeRatios( leftRatio, rightRatio ) {
    this.ratios = [ leftRatio, rightRatio ];
    this.quantityProperties = leftRatio.quantityProperties.concat( rightRatio.quantityProperties );

    if ( this.predictMode ) {
      // In the predict screen, hide representations when one of the spinners is changed
      Multilink.multilink( this.quantityProperties, this.revealProperty.set.bind( this.revealProperty, false ) );
    }
  }

  /**
   * Returns whether our two ratios are equivalent (handling division by 0 properly).
   * @public
   *
   * @returns {boolean}
   */
  areRatiosEquivalent() {
    return this.ratios[ 0 ].isEquivalentTo( this.ratios[ 1 ] );
  }

  /**
   * Steps the scene forward in time.
   * @public
   *
   * @param {number} dt
   */
  step( dt ) {
    // Default is no-op (override when behavior is needed)
  }

  /**
   * Resets the scene
   * @public
   */
  reset() {
    // Owned properties
    this.revealProperty.reset();
    this.showBothProperty.reset();

    this.ratios.forEach( sceneRatio => {
      sceneRatio.reset();
    } );
  }
}

const SceneIO = new IOType( 'SceneIO', {
  valueType: Scene,
  documentation: 'A scene showing one or two ratios',
  toStateObject( scene ) {
    return {};
  }
} );
Scene.SceneIO = SceneIO;

proportionPlayground.register( 'Scene', Scene );

export default Scene;