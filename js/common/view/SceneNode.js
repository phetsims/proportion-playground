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
  var ABSwitch = require( 'SUN/ABSwitch' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );

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
      leftControl: null, // {Node}
      rightControl: null, // {Node}
      leftSwitchIcon: null, // {Node}, required
      rightSwitchIcon: null, // {Node}, required
      revealLocation: 'right' // 'right' or 'bottom', direction from the pickerContainer
    }, options );

    // @protected
    this.layoutBounds = options.layoutBounds;
    this.leftControl = options.leftControl;
    this.rightControl = options.rightControl;

    // @private
    this.revealLocation = options.revealLocation;
    this.revealBothOffset = options.revealBothOffset;

    // @public {Scene} - The main model for this scene
    this.scene = scene;
    this.layoutBounds = layoutBounds;
    Node.call( this, {
      children: [
        this.leftControl,
        this.rightControl
      ]
    } );

    this.leftSwitchIcon = switchAlignGroup.createBox( options.leftSwitchIcon, { xAlign: 'right' } );
    this.rightSwitchIcon = switchAlignGroup.createBox( options.rightSwitchIcon, { xAlign: 'left' } );

    // For predict mode, add a reveal button that show the representations
    if ( scene.predictMode ) {
      // @private
      this.revealButton = new RevealButton( scene.revealProperty, scene.valueChangedProperty, {
        bottom: layoutBounds.maxY - 87 //TODO: layout customization needed here?
      } );
      this.addChild( this.revealButton );
    }
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

    // TODO: with option
    canCenterRevealButton: function() {
      return true;
    },

    /**
     * Moves the reveal button to the desired position.
     * @protected
     */
    updateRevealButton: function() {
      // Only does something if we have a button
      if ( !this.revealButton ) { return; }

      if ( this.revealLocation === 'right' ) {
        if ( this.scene.showBothProperty.value ) {
          if ( this.canCenterRevealButton() ) {
            this.revealButton.centerX = this.layoutBounds.centerX;
          }
          else {
            this.revealButton.right = this.layoutBounds.right - 10;
          }
          this.revealButton.centerY = this.layoutBounds.bottom - 128;
        }
        else {
          var pickerContainerBounds = this.leftControl.localToParentBounds( this.leftControl.pickerContainer.bounds );
          this.revealButton.left = pickerContainerBounds.right + 30;
          this.revealButton.centerY = this.layoutBounds.bottom - 128;
        }
      } else {
        this.revealButton.centerX = this.layoutBounds.centerX;
        this.revealButton.centerY = this.layoutBounds.bottom - 100;
      }
    }
  } );
} );
