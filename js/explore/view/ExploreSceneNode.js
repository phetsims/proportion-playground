// Copyright 2016, University of Colorado Boulder

/**
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

  function ExploreSceneNode( layoutBounds, paintSceneModel, predictMode, revealButtonDistanceFromLayoutBoundsBottom, options ) {

    Node.call( this, options );
    if ( predictMode ) {

      // @private
      this.revealButton = new RevealButton( paintSceneModel.revealProperty, {
        bottom: layoutBounds.maxY - revealButtonDistanceFromLayoutBoundsBottom
      } );
      this.addChild( this.revealButton );
    }
  }

  proportionPlayground.register( 'ExploreSceneNode', ExploreSceneNode );

  return inherit( Node, ExploreSceneNode, {
    mutateRevealButton: function( options ) {
      this.revealButton && this.revealButton.mutate( options );
    }
  } );
} );