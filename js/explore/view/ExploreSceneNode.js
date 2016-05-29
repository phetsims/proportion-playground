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
  var RevealButton = require( 'PROPORTION_PLAYGROUND/explore/view/RevealButton' );

  /**
   *
   * @param {Bounds2} layoutBounds - visible bounds within which the UI must fit
   * @param {Property.<boolean>} revealProperty - true if the representations should be shown
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @param {number} revealButtonDistanceFromLayoutBoundsBottom - how high from the bottom of the screen to place the
   *                 reveal button
   * @param {Object} [options] - node options
   * @constructor
   */
  function ExploreSceneNode( layoutBounds, revealProperty, predictMode, revealButtonDistanceFromLayoutBoundsBottom, options ) {
    this.layoutBounds = layoutBounds;
    Node.call( this, options );

    // For predict mode, add a reveal button that show the representations
    if ( predictMode ) {

      // @private
      this.revealButton = new RevealButton( revealProperty, {
        bottom: layoutBounds.maxY - revealButtonDistanceFromLayoutBoundsBottom
      } );
      this.addChild( this.revealButton );
    }
  }

  proportionPlayground.register( 'ExploreSceneNode', ExploreSceneNode );

  return inherit( Node, ExploreSceneNode, {

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
     * @param {Node} abSwitch - the switch that chooses between 1-2 representations
     */
    moveABSwitchToBottomCenter: function( abSwitch ) {
      abSwitch.centerBottom = this.layoutBounds.centerBottom.plusXY( 0, -5 );
    }
  } );
} );