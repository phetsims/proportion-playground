// Copyright 2016, University of Colorado Boulder

/**
 * Displays a single instance of the repeating pattern for a single necklace.
 * @public
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BEAD_SIZE = 9;

  // {Node} - Will have multiple parents, used as a single graphic node
  var roundBeadNode = new Circle( BEAD_SIZE / 2, {
    fill: ProportionPlaygroundColorProfile.necklaceRoundBeadProperty
  } );

  // {Node} - Will have multiple parents, used as a single graphic node
  var squareBeadNode = new Rectangle( 0, 0, BEAD_SIZE, BEAD_SIZE, {
    fill: ProportionPlaygroundColorProfile.necklaceSquareBeadProperty,
    center: Vector2.ZERO
  } );

  // {number} - Vertical offset between nodes
  var NODE_OFFSET = roundBeadNode.height + 1.5;

  // {number} - Maximum number of beads visible in a pattern (20,20 will reduce to 1,1)
  var MAX_BEADS = 2 * ProportionPlaygroundConstants.BEAD_COUNT_RANGE.max - 1;

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {Necklace} necklace
   * @param {Object} [options]
   */
  function PatternNode( necklace, options ) {
    Node.call( this );

    // Construct nodes for every possible bead
    var roundBeadNodes = _.range( 0, MAX_BEADS ).map( function( n ) {
      return new Node( {
        children: [ roundBeadNode ],
        y: NODE_OFFSET * n
      } );
    } );
    var squareBeadNodes = _.range( 0, MAX_BEADS ).map( function( n ) {
      return new Node( {
        children: [ squareBeadNode ],
        y: NODE_OFFSET * n
      } );
    } );
    roundBeadNodes.forEach( this.addChild.bind( this ) );
    squareBeadNodes.forEach( this.addChild.bind( this ) );

    // Toggle visibility based on current counts
    Property.multilink( [ necklace.roundBeadCountProperty, necklace.squareBeadCountProperty ], function( roundBeadCount, squareBeadCount ) {
      var gcd = Util.gcd( roundBeadCount, squareBeadCount );
      if ( gcd !== 0 ) {
        roundBeadCount /= gcd;
        squareBeadCount /= gcd;
      }
      for ( var i = 0; i < MAX_BEADS; i++ ) {
        roundBeadNodes[ i ].visible = i < roundBeadCount;
        squareBeadNodes[ i ].visible = ( i >= roundBeadCount ) && ( i < squareBeadCount + roundBeadCount );
      }
    } );

    this.mutate( options );
  }

  proportionPlayground.register( 'PatternNode', PatternNode );

  return inherit( Node, PatternNode );
} );
