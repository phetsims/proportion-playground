// Copyright 2016-2022, University of Colorado Boulder

/**
 * Base class for Scene nodes, which includes the reval button for Predict screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import ResetButton from '../../../../scenery-phet/js/buttons/ResetButton.js';
import { AlignGroup, Node } from '../../../../scenery/js/imports.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import proportionPlayground from '../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColors from './ProportionPlaygroundColors.js';
import RevealButton from './RevealButton.js';

// left and right labels for the switches should all share
const switchAlignGroup = new AlignGroup();

class SceneNode extends Node {
  /**
   * @param {Scene} scene - Our scene to display
   * @param {Bounds2} layoutBounds - visible bounds within which the UI must fit
   * @param {Object} config
   */
  constructor( scene, layoutBounds, config ) {
    config = merge( {
      sceneIcon: null, // {Node}, @required - shown in the SceneSelectionControls
      leftControl: null, // {SceneRatioControl}, @required
      rightControl: null, // {SceneRatioControl}, @required
      leftSwitchIcon: null, // {Node}, @required - Left side of the showBoth ABSwitch
      rightSwitchIcon: null, // {Node}, @required - Right side of the showBoth ABSwitch
      controlAlign: 'right', // 'right' or 'bottom', direction from the pickerContainer
      canCenterControlButton: true, // Whether the control button can be centered when both left/right are shown
      tandem: Tandem.REQUIRED
    }, config );

    assert && assert( config.sceneIcon );
    assert && assert( config.leftControl );
    assert && assert( config.rightControl );
    assert && assert( config.leftSwitchIcon );
    assert && assert( config.rightSwitchIcon );

    super( {
      tandem: config.tandem
    } );

    // @protected
    this.layoutBounds = layoutBounds;
    this.leftControl = config.leftControl;
    this.rightControl = config.rightControl;

    // @private
    this.controlAlign = config.controlAlign;
    this.revealBothOffset = config.revealBothOffset;
    this.canCenterControlButton = config.canCenterControlButton;

    // @public {Scene} - The main model for this scene
    this.scene = scene;

    // @public {Node} - Will be displayed in the scene selection radio group
    this.sceneIcon = config.sceneIcon;

    this.mutate( {
      children: [
        this.rightControl,
        this.leftControl
      ]
    } );

    this.leftSwitchIcon = switchAlignGroup.createBox( config.leftSwitchIcon, { xAlign: 'right' } );
    this.rightSwitchIcon = switchAlignGroup.createBox( config.rightSwitchIcon, { xAlign: 'left' } );

    // @private {Node} - A button that will either handle revealing the scene's visual representation, or will refresh the scene.
    this.controlButton = null;

    // For predict mode, add a reveal button that show the representations
    if ( scene.predictMode ) {
      this.controlButton = new RevealButton( scene.revealProperty, {
        tandem: config.tandem.createTandem( 'revealButton' )
      } );
    }
    // Otherwise, have a 'Refresh' button, see https://github.com/phetsims/proportion-playground/issues/55
    else {
      this.controlButton = new ResetButton( {
        listener: () => {
          scene.ratios.forEach( sceneRatio => {
            sceneRatio.reset();
          } );
        },
        baseColor: ProportionPlaygroundColors.refreshBackgroundProperty,

        // refreshButton
        tandem: config.tandem.createTandem( 'resetButton' )
      } );
    }
    this.addChild( this.controlButton );
  }

  /**
   * Steps forward in time.
   * @public
   *
   * @param {number} dt - In seconds
   * @param {Bounds2} visibleBounds
   */
  step( dt, visibleBounds ) {
    this.leftControl.step && this.leftControl.step( dt, visibleBounds );
    this.rightControl.step && this.rightControl.step( dt, visibleBounds );
  }

  /**
   * Adds the "showBoth" ABSwitch.
   * @public
   *
   * We have to do this later, since we need all of the scenes' switchIcons to be created/sized first. When ABSwitch
   * can handle resizing content, we can inline this.
   */
  addShowBothSwitch() {
    this.addChild( new ABSwitch( this.scene.showBothProperty,
      false, this.leftSwitchIcon,
      true, this.rightSwitchIcon, {
        centerBottom: this.layoutBounds.centerBottom.plusXY( 0, -15 ),
        tandem: this.tandem.createTandem( 'showBothSwitch' )
      } ) );
  }

  /**
   * Moves the reveal button to the desired position.
   * @protected
   */
  updateControlButton() {
    // Only does something if we have a button
    if ( !this.controlButton ) { return; }

    if ( this.controlAlign === 'right' ) {
      if ( this.scene.showBothProperty.value ) {
        if ( this.canCenterControlButton ) {
          this.controlButton.centerX = this.layoutBounds.centerX;
        }
        else {
          // 10 amount of space for the larger button
          this.controlButton.centerX = this.layoutBounds.right - ProportionPlaygroundConstants.BUTTON_RIGHT_CENTER_OFFSET;
        }
        this.controlButton.centerY = this.layoutBounds.bottom - 128;
      }
      else {
        const pickerContainerBounds = this.leftControl.localToParentBounds( this.leftControl.pickerContainer.bounds );
        this.controlButton.centerX = pickerContainerBounds.right + 62; // 30 amount of space for the larger button
        this.controlButton.centerY = this.layoutBounds.bottom - 128;
      }
    }
    else {
      this.controlButton.centerX = this.layoutBounds.centerX;
      this.controlButton.centerY = this.layoutBounds.bottom - 100;
    }
  }
}

proportionPlayground.register( 'SceneNode', SceneNode );

export default SceneNode;
