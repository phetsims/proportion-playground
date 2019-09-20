// Copyright 2017-2019, University of Colorado Boulder

/**
 * Scenery-Node-based Necklace display based on a Layout property.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrea Lin
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const NecklaceLayout = require( 'PROPORTION_PLAYGROUND/common/model/necklace/NecklaceLayout' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const RoundBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/RoundBeadNode' );
  const SquareBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/SquareBeadNode' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {Property.<NecklaceLayout>} layoutProperty
   * @param {Object} [options] - node options
   */
  function NecklaceGraphicNode( layoutProperty, options ) {
    Node.call( this );

    // @private {Node} - Holds all of the content, so that a translation can be applied to everything (that isn't part
    // of our top-level Node's transform).
    this.container = new Node();
    this.addChild( this.container );

    // @private {Path} - The chain/string behind the beads
    this.chain = new Path( null, {
      stroke: ProportionPlaygroundColorProfile.necklaceStringProperty,
      lineWidth: 2
    } );
    this.container.addChild( this.chain );

    // @private {Node} - Holds all of the beads
    this.beadContainer = new Node();
    this.container.addChild( this.beadContainer );

    // @private {Array.<RoundBeadNode>} - Always grows to lazily create, and sets unused ones invisible.
    this.roundBeads = [];

    // @private {Array.<SquareBeadNode>} - Always grows to lazily create, and sets unused ones invisible.
    this.squareBeads = [];

    layoutProperty.link( this.setLayout.bind( this ) );

    this.mutate( options );
  }

  proportionPlayground.register( 'NecklaceGraphicNode', NecklaceGraphicNode );

  return inherit( Node, NecklaceGraphicNode, {
    /**
     * Rebuilds the necklace display to show the given layout.
     * @public
     *
     * @param {NecklaceLayout} layout
     */
    setLayout: function( layout ) {
      const roundBeadCount = layout.roundBeadCount;
      const squareBeadCount = layout.squareBeadCount;

      // Only show the background chain if we have beads.
      this.chain.visible = roundBeadCount > 0 || squareBeadCount > 0;

      // Adds beads up to the amount that we need (don't need to remove extras, they will be set to invisible).
      while ( this.roundBeads.length < roundBeadCount ) {
        const roundBead = new RoundBeadNode();
        this.beadContainer.addChild( roundBead );
        this.roundBeads.push( roundBead );
      }
      while ( this.squareBeads.length < squareBeadCount ) {
        const squareBead = new SquareBeadNode( 0 );
        this.beadContainer.addChild( squareBead );
        this.squareBeads.push( squareBead );
      }

      // Toggle visibilities, repositioning hidden beads so it won't affect our bounds.
      let i;
      for ( i = 0; i < this.roundBeads.length; i++ ) {
        const roundVisible = i < roundBeadCount;
        this.roundBeads[ i ].visible = i < roundBeadCount;
        if ( !roundVisible ) {
          this.roundBeads[ i ].translation = Vector2.ZERO; // Don't have it mess with our bounds
        }
      }
      for ( i = 0; i < this.squareBeads.length; i++ ) {
        const squareVisible = i < squareBeadCount;
        this.squareBeads[ i ].visible = squareVisible;
        if ( !squareVisible ) {
          this.squareBeads[ i ].translation = Vector2.ZERO; // Don't have it mess with our bounds
        }
      }

      // Adjust the chain's shape
      this.chain.shape = layout.shape;

      // Adjust the translation of everything
      this.container.translation = layout.containerTranslation;

      // Update the beads
      for ( i = 0; i < layout.roundBeads.length; i++ ) {
        this.roundBeads[ i ].translation = layout.roundBeads[ i ].center;
      }
      for ( i = 0; i < layout.squareBeads.length; i++ ) {
        this.squareBeads[ i ].translation = layout.squareBeads[ i ].center;
        this.squareBeads[ i ].setBeadRotation( layout.squareBeads[ i ].angle );
      }
    }
  }, {
    /**
     * Creates a static Necklace graphic.
     * @public
     *
     * @param {number} roundBeadCount
     * @param {number} squareBeadCount
     * @param {Object} [options] - node options
     */
    createStaticNecklace: function( roundBeadCount, squareBeadCount, options ) {
      return new NecklaceGraphicNode( new Property( NecklaceLayout.getLayout( roundBeadCount, squareBeadCount ) ), options );
    }
  } );
} );
