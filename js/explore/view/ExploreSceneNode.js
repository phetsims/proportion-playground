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
   * @param layoutBounds
   * @param {revealProperty:Property.<boolean>} model with a revealProperty
   * @param predictMode
   * @param revealButtonDistanceFromLayoutBoundsBottom
   * @param options
   * @constructor
   */
  function ExploreSceneNode( layoutBounds, model, predictMode, revealButtonDistanceFromLayoutBoundsBottom, options ) {
    this.layoutBounds = layoutBounds;
    Node.call( this, options );
    if ( predictMode ) {

      // @private
      this.revealButton = new RevealButton( model.revealProperty, {
        bottom: layoutBounds.maxY - revealButtonDistanceFromLayoutBoundsBottom
      } );
      this.addChild( this.revealButton );
    }
  }

  proportionPlayground.register( 'ExploreSceneNode', ExploreSceneNode );

  return inherit( Node, ExploreSceneNode, {
    mutateRevealButton: function( options ) {
      this.revealButton && this.revealButton.mutate( options );
    },
    moveABSwitchToBottomCenter: function( abSwitch ) {
      abSwitch.centerBottom = this.layoutBounds.centerBottom.plusXY( 0, -5 );
    }
  } );
} );