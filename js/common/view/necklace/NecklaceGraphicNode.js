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
  var Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/SquareBeadNode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   *
   * @param {number} roundBeadCount - number of round beads
   * @param {number} squareBeadCount - number of square beads
   * @param {Object} [options] - node options
   */
  function NecklaceGraphicNode( roundBeadCount, squareBeadCount, options ) {
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

    this.setBeadCounts( roundBeadCount, squareBeadCount );

    this.mutate( options );
  }

  proportionPlayground.register( 'NecklaceGraphicNode', NecklaceGraphicNode );

  return inherit( Node, NecklaceGraphicNode, {
    setBeadCounts: function( roundBeadCount, squareBeadCount ) {
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
          this.roundBeads[ i ].translation = Vector2.ZERO;
        }
      }
      for ( i = 0; i < this.squareBeads.length; i++ ) {
        var squareVisible = i < squareBeadCount;
        this.squareBeads[ i ].visible = squareVisible;
        if ( !squareVisible ) {
          this.squareBeads[ i ].translation = Vector2.ZERO;
        }
      }

      if ( roundBeadCount === 1 && squareBeadCount === 0 ) {
        this.chain.shape = Necklace.ONE_ROUND_BEAD_SPAPE;
        this.roundBeads[ 0 ].translation = Vector2.ZERO;
        this.container.translation = new Vector2( 1.3514828985498655, 12.636803053853306 );
      }
      else if ( roundBeadCount === 2 && squareBeadCount === 0 ) {
        this.chain.shape = Necklace.TWO_ROUND_BEADS_SHAPE;
        this.roundBeads[ 0 ].translation = Vector2.ZERO;
        this.roundBeads[ 1 ].translation = new Vector2( Necklace.TWO_BEAD_OFFSET * 2, 0 );
        this.container.translation = new Vector2( -11, 12.991498868074157 );
      }
      else if ( roundBeadCount === 1 && squareBeadCount === 1 ) {
        this.chain.shape = Necklace.TWO_MIXED_BEADS_SHAPE;
        this.roundBeads[ 0 ].translation = Vector2.ZERO;
        this.squareBeads[ 0 ].translation = new Vector2( Necklace.TWO_BEAD_OFFSET * 2, 0 );
        this.squareBeads[ 0 ].setBeadRotation( 0 );
        this.container.translation = new Vector2( -11, 15.785 );
      }
      else if ( roundBeadCount === 0 && squareBeadCount === 1 ) {
        this.chain.shape = Necklace.ONE_SQUARE_BEAD_SPAPE;
        this.squareBeads[ 0 ].translation = Vector2.ZERO;
        this.squareBeads[ 0 ].setBeadRotation( 0 );
        this.container.translation = new Vector2( 0.2394730404209664, 10.390542501611892 );
      }
      else if ( roundBeadCount === 0 && squareBeadCount === 2 ) {
        this.chain.shape = Necklace.TWO_SQUARE_BEADS_SHAPE;
        this.squareBeads[ 0 ].translation = Vector2.ZERO;
        this.squareBeads[ 0 ].setBeadRotation( 0 );
        this.squareBeads[ 1 ].translation = new Vector2( Necklace.TWO_BEAD_OFFSET * 2, 0 );
        this.squareBeads[ 1 ].setBeadRotation( 0 );
        this.container.translation = new Vector2( -10.753124040624703, 10.534079717389499 );
      }
      else if ( roundBeadCount > 0 || squareBeadCount > 0 ) {
        this.container.translation = ( roundBeadCount + squareBeadCount === 3 ) ? new Vector2( 0, -5 ) : Vector2.ZERO;
        // general case with 3+ beads
        var layout = Necklace.getMultiBeadLayout( roundBeadCount, squareBeadCount );
        this.chain.shape = layout.shape;
        for ( i = 0; i < layout.roundBeads.length; i++ ) {
          this.roundBeads[ i ].translation = layout.roundBeads[ i ].center;
        }
        for ( i = 0; i < layout.squareBeads.length; i++ ) {
          this.squareBeads[ i ].translation = layout.squareBeads[ i ].center;
          this.squareBeads[ i ].setBeadRotation( layout.squareBeads[ i ].angle );
        }
      }
    }
  } );
} );
