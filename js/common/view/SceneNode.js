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
  var Line = require( 'SCENERY/nodes/Line' );

  /**
   * @constructor
   *
   * @param {Scene} scene - Our scene to display
   * @param {Bounds2} layoutBounds - visible bounds within which the UI must fit
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @param {number} revealButtonDistanceFromLayoutBoundsBottom - how high from the bottom of the screen to place the
   *                 reveal button
   * @param {Object} [options] - node options
   */
  function SceneNode( scene, layoutBounds, predictMode, revealButtonDistanceFromLayoutBoundsBottom, options ) {
    this.scene = scene;
    this.layoutBounds = layoutBounds;
    Node.call( this, options );

    // For predict mode, add a reveal button that show the representations
    if ( predictMode ) {

      // @private
      this.revealButton = new RevealButton( scene.revealProperty, {
        bottom: layoutBounds.maxY - revealButtonDistanceFromLayoutBoundsBottom
      } );
      this.addChild( this.revealButton );
    }
  }

  proportionPlayground.register( 'SceneNode', SceneNode );

  return inherit( Node, SceneNode, {

    /**
     * Mutate the reveal, often to set its location.
     * @param {Object} [options] - options for the reveal button
     * @protected
     */
    mutateRevealButton: function( options ) {
      this.revealButton && this.revealButton.mutate( options );
    },

    /**
     * Position the ABSwitch at the bottom center of the screen.
     * As long as the height of the labels is less than or equal to 1.6 (empirically chosen) times the height of the
     * toggle button, the toggle button location will remain fixed.
     * @param {Node} abSwitch - the switch that chooses between 1-2 representations
     */
    moveABSwitchToBottomCenter: function( abSwitch ) {

      // find center coordinates of the toggle button (onOffSwitch)
      var buttonX = abSwitch.children[ 0 ].center.x;
      var buttonY = abSwitch.children[ 0 ].center.y;

      // the greatest width of the two labels
      var maxLabelWidth = Math.max( abSwitch.children[ 1 ].width, abSwitch.children[ 2 ].width );

      // Calculate the layout bound values of the ab switch.
      // The new width is based on the max label width and the new height is 1.6 times the height of the toggle button.
      var halfWidth = maxLabelWidth + abSwitch.children[ 0 ].width;
      var halfHeight = abSwitch.children[ 0 ].height * 0.8;

      // Add horizontal and vertical struts that cause the center of ABSwitch to be the same as center of button.
      var HStrut = new Line( buttonX - halfWidth, buttonY, buttonX + halfWidth, buttonY );
      var VStrut = new Line( buttonX, buttonY - halfHeight, buttonX, buttonY + halfHeight );
      abSwitch.addChild( HStrut );
      abSwitch.addChild( VStrut );
      HStrut.moveToBack();
      VStrut.moveToBack();

      // position ABSwitch at the bottom center of the screen, with some spacing
      abSwitch.centerBottom = this.layoutBounds.centerBottom.plusXY( 0, -5 );
    }
  } );
} );
