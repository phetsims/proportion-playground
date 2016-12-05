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
      leftSwitchIcon: null, // {Node}, required
      rightSwitchIcon: null // {Node}, required
    }, options );

    // @public {Scene} - The main model for this scene
    this.scene = scene;
    this.layoutBounds = layoutBounds;
    Node.call( this, options );

    this.leftSwitchIcon = switchAlignGroup.createBox( options.leftSwitchIcon, { xAlign: 'right' } );
    this.rightSwitchIcon = switchAlignGroup.createBox( options.rightSwitchIcon, { xAlign: 'left' } );

    // For predict mode, add a reveal button that show the representations
    if ( scene.predictMode ) {
      // @private
      this.revealButton = new RevealButton( scene.revealProperty, {
        bottom: layoutBounds.maxY - 87 //TODO: layout customization needed here?
      } );
      this.addChild( this.revealButton );
    }
  }

  proportionPlayground.register( 'SceneNode', SceneNode );

  return inherit( Node, SceneNode, {
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
        centerBottom: this.layoutBounds.centerBottom.plusXY( 0, -5 )
      } ) );
    },

    /**
     * Mutate the reveal, often to set its location.
     * @param {Object} [options] - options for the reveal button
     * @protected
     */
    mutateRevealButton: function( options ) {
      //TODO: improve
      this.revealButton && this.revealButton.mutate( options );
    }
  } );
} );
