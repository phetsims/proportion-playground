// Copyright 2016, University of Colorado Boulder

/**
 * TODO: doc
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/SquareBeadNode' );
  var Vector2 = require( 'DOT/Vector2' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   *
   * @param {Property.<NecklaceLayout>} - TODO: Make NecklaceLayout type!
   * @param {Object} [options] - node options
   */
  function NecklaceGraphicNode( layoutProperty, options ) {
    Node.call( this );

    this.container = new Node();
    this.addChild( this.container );

    this.chain = new Path( null, {
      stroke: ProportionPlaygroundColorProfile.necklaceStringProperty,
      lineWidth: 2
    } );
    this.container.addChild( this.chain );

    this.beadContainer = new Node();
    this.container.addChild( this.beadContainer );

    this.roundBeads = [];
    this.squareBeads = [];

    layoutProperty.link( this.setLayout.bind( this ) );

    this.mutate( options );
  }

  proportionPlayground.register( 'NecklaceGraphicNode', NecklaceGraphicNode );

  return inherit( Node, NecklaceGraphicNode, {
    setLayout: function( layout ) {
      var roundBeadCount = layout.roundBeadCount;
      var squareBeadCount = layout.squareBeadCount;

      this.chain.visible = roundBeadCount > 0 || squareBeadCount > 0;

      while ( this.roundBeads.length < roundBeadCount ) {
        var roundBead = new RoundBeadNode();
        this.beadContainer.addChild( roundBead );
        this.roundBeads.push( roundBead );
      }
      while ( this.squareBeads.length < squareBeadCount ) {
        var squareBead = new SquareBeadNode( 0 );
        this.beadContainer.addChild( squareBead );
        this.squareBeads.push( squareBead );
      }

      var i;
      for ( i = 0; i < this.roundBeads.length; i++ ) {
        var roundVisible = i < roundBeadCount;
        this.roundBeads[ i ].visible = i < roundBeadCount;
        if ( !roundVisible ) {
          this.roundBeads[ i ].translation = Vector2.ZERO; // Don't have it mess with our bounds
        }
      }
      for ( i = 0; i < this.squareBeads.length; i++ ) {
        var squareVisible = i < squareBeadCount;
        this.squareBeads[ i ].visible = squareVisible;
        if ( !squareVisible ) {
          this.squareBeads[ i ].translation = Vector2.ZERO; // Don't have it mess with our bounds
        }
      }

      this.chain.shape = layout.shape;
      this.container.translation = layout.containerTranslation;

      for ( i = 0; i < layout.roundBeads.length; i++ ) {
        this.roundBeads[ i ].translation = layout.roundBeads[ i ].center;
      }
      for ( i = 0; i < layout.squareBeads.length; i++ ) {
        this.squareBeads[ i ].translation = layout.squareBeads[ i ].center;
        this.squareBeads[ i ].setBeadRotation( layout.squareBeads[ i ].angle );
      }
    }
  }, {
    // TODO: doc
    createStaticNecklace: function( roundBeadCount, squareBeadCount, options ) {
      return new NecklaceGraphicNode( new Property( Necklace.getMultiBeadLayout( roundBeadCount, squareBeadCount ) ), options );
    }
  } );
} );
