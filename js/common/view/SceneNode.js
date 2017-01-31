// Copyright 2016, University of Colorado Boulder

/**
 * Base class for Explore Scene nodes, which includes the reval button (for Predict screens).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RevealButton = require( 'PROPORTION_PLAYGROUND/common/view/RevealButton' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var ResetButton = require( 'SCENERY_PHET/buttons/ResetButton' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );

  // left and right labels for the switches should all share
  var switchAlignGroup = new AlignGroup();

  /**
   * @constructor
   *
   * @param {Scene} scene - Our scene to display
   * @param {Bounds2} layoutBounds - visible bounds within which the UI must fit
   * @param {Object} [options] - node options
   */
  function SceneNode( scene, layoutBounds, options ) {
    options = _.extend( {
      sceneIcon: null, // {Node}, required
      leftControl: null, // {Node}, required
      rightControl: null, // {Node}, required
      leftSwitchIcon: null, // {Node}, required
      rightSwitchIcon: null, // {Node}, required
      controlLocation: 'right', // 'right' or 'bottom', direction from the pickerContainer
      canCenterControlButton: true // Whether the control button can be centered when both left/right are shown
    }, options );

    // @protected
    this.layoutBounds = layoutBounds;
    this.leftControl = options.leftControl;
    this.rightControl = options.rightControl;

    // @private
    this.controlLocation = options.controlLocation;
    this.revealBothOffset = options.revealBothOffset;
    this.canCenterControlButton = options.canCenterControlButton;

    // @public {Scene} - The main model for this scene
    this.scene = scene;

    // @public {Node} - Will be displayed in the scene selection radio group
    this.sceneIcon = options.sceneIcon;

    Node.call( this, {
      children: [
        this.leftControl,
        this.rightControl
      ]
    } );

    this.leftSwitchIcon = switchAlignGroup.createBox( options.leftSwitchIcon, { xAlign: 'right' } );
    this.rightSwitchIcon = switchAlignGroup.createBox( options.rightSwitchIcon, { xAlign: 'left' } );

    // @private {Node} - A button that will either handle revealing the scene's visual representation, or will refresh the scene.
    this.controlButton = null; 

    // For predict mode, add a reveal button that show the representations
    if ( scene.predictMode ) {
      this.controlButton = new RevealButton( scene.revealProperty );
    }
    // Otherwise, have a 'Refresh' button, see https://github.com/phetsims/proportion-playground/issues/55
    else {
      this.controlButton = new MutableOptionsNode( ResetButton, [], {
        listener: function() {
          scene.ratios.forEach( function( sceneRatio ) {
            sceneRatio.reset();
          } );
        },
      }, {
        baseColor: ProportionPlaygroundColorProfile.refreshBackgroundProperty
      } );
    }
    this.addChild( this.controlButton );
  }

  proportionPlayground.register( 'SceneNode', SceneNode );

  return inherit( Node, SceneNode, {
    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt - In seconds
     * @param {Bounds2} visibleBounds
     */
    step: function( dt, visibleBounds ) {
      this.leftControl.step && this.leftControl.step( dt, visibleBounds );
      this.rightControl.step && this.rightControl.step( dt, visibleBounds );
    },

    /**
     * Adds the "showBoth" ABSwitch.
     * @public
     *
     * We have to do this later, since we need all of the scenes' switchIcons to be created/sized first. When ABSwitch
     * can handle resizing content, we can inline this.
     */
    addShowBothSwitch: function() {
      this.addChild( new ABSwitch( this.scene.showBothProperty,
        false, this.leftSwitchIcon,
        true, this.rightSwitchIcon, {
        centerBottom: this.layoutBounds.centerBottom.plusXY( 0, -15 )
      } ) );
    },

    /**
     * Moves the reveal button to the desired position.
     * @protected
     */
    updateControlButton: function() {
      // Only does something if we have a button
      if ( !this.controlButton ) { return; }

      if ( this.controlLocation === 'right' ) {
        if ( this.scene.showBothProperty.value ) {
          if ( this.canCenterControlButton ) {
            this.controlButton.centerX = this.layoutBounds.centerX;
          }
          else {
            this.controlButton.centerX = this.layoutBounds.right - 42; // 10 amount of space for the larger button
          }
          this.controlButton.centerY = this.layoutBounds.bottom - 128;
        }
        else {
          var pickerContainerBounds = this.leftControl.localToParentBounds( this.leftControl.pickerContainer.bounds );
          this.controlButton.centerX = pickerContainerBounds.right + 62; // 30 amount of space for the larger button
          this.controlButton.centerY = this.layoutBounds.bottom - 128;
        }
      } else {
        this.controlButton.centerX = this.layoutBounds.centerX;
        this.controlButton.centerY = this.layoutBounds.bottom - 100;
      }
    }
  } );
} );
