// Copyright 2016, University of Colorado Boulder

/**
 * An immutable necklace node, used in icons and recreated by NecklaceNode when bead count changes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/SquareBeadNode' );
  var Vector2 = require( 'DOT/Vector2' );
  var Util = require( 'DOT/Util' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // constants
  var pathOptions = { stroke: 'black', lineWidth: 2 };
  var maxBeads = ProportionPlaygroundConstants.maxBeads;

  /**
   *
   * @param {number} roundBeadCount - number of round beads
   * @param {number} squareBeadCount - number of square beads
   * @param {Object} [options] - node options
   * @constructor
   */
  function StaticNecklaceNode( roundBeadCount, squareBeadCount, options ) {

    var numBeads = roundBeadCount + squareBeadCount;
    var numberPoints = numBeads;
    var angleBetweenPoints = Math.PI * 2 / numberPoints;
    var sideLength = 23;
    if ( roundBeadCount + squareBeadCount === 3 ) {
      sideLength = 35;
    }
    var children = [];
    var k = 0;

    // For one bead, show at the bottom of a circle
    if ( numBeads === 1 ) {
      for ( k = 0; k < roundBeadCount; k++ ) {
        children.push( new RoundBeadNode() );
      }
      for ( k = 0; k < squareBeadCount; k++ ) {
        children.push( new SquareBeadNode() );
      }

      children.unshift( new Circle( 12, _.extend( { y: -15 }, pathOptions ) ) );
    }
    else if ( numBeads === 2 ) {

      // Show two beads at the bottom of the circle
      var x = 0;
      for ( k = 0; k < roundBeadCount; k++ ) {
        children.push( new RoundBeadNode( { x: x } ) );
        x += 22;
      }
      for ( k = 0; k < squareBeadCount; k++ ) {
        children.push( new SquareBeadNode( { x: x } ) );
        x += 22;
      }
      var radius = 14;
      children.unshift( new Circle( radius, _.extend( { y: -11, x: radius * 1.5 / 2 }, pathOptions ) ) );
    }
    else if ( numBeads > 2 ) {

      // approximate as polygon with beads between each vertex, see http://mathworld.wolfram.com/RegularPolygon.html
      var R = 1 / 2 * sideLength / Math.sin( Math.PI / numberPoints );
      var rScale = Util.linear( 3, 20, 1.5, 1, numberPoints );
      if ( numberPoints <= 20 ) {
        R = R * rScale;
      }
      var vertices = [];

      for ( var i = 0; i < numberPoints; i++ ) {
        var point = Vector2.createPolar( R, i * angleBetweenPoints );
        vertices.push( point );
      }

      // randomize vertices
      var randomAmount = Util.linear( 3, 40, 4, 10, numberPoints );
      for ( i = 0; i < vertices.length; i++ ) {
        vertices[ i ].addXY( Math.random() * randomAmount - randomAmount / 2, Math.random() * randomAmount - randomAmount / 2 );
      }

      // between each pair of vertices, we must put a bead
      var pairs = [];
      for ( i = 0; i < vertices.length - 1; i++ ) {
        pairs.push( { start: vertices[ i ], end: vertices[ i + 1 ] } );
      }
      // join last->first
      if ( vertices.length > 0 ) {
        pairs.push( { start: vertices[ vertices.length - 1 ], end: vertices[ 0 ] } );
      }

      // Choose bead types
      // a = number round
      // b = number square
      // n = # within pattern
      // m = # of patterns
      var types = [];

      var a = roundBeadCount;
      var b = squareBeadCount;

      // Brute force search for pattern
      var solver = function() {

        for ( var m = maxBeads; m >= 1 && !match; m-- ) { // search for many pattern occurrences first
          for ( var na = 0; na <= maxBeads && !match; na++ ) {
            for ( var nb = 0; nb <= maxBeads && !match; nb++ ) {
              if ( m * na === a && m * nb === b ) {
                return { m: m, na: na, nb: nb };
              }
            }
          }
        }
        assert && assert( false, 'no solution found' );
      };

      var match = false;
      var solution = solver();
      var m = solution.m;
      var na = solution.na;
      var nb = solution.nb;

      // for each instance of the repeated pattern
      for ( i = 0; i < m; i++ ) {

        // add round
        for ( var j = 0; j < na; j++ ) {
          types.push( 'round' );
        }
        // add square
        for ( var tk = 0; tk < nb; tk++ ) {
          types.push( 'square' );
        }
      }

      // Instantiate the beads between each vertex
      var centers = [];
      for ( i = 0; i < pairs.length; i++ ) {
        var pair = pairs[ i ];
        var center = pair.start.blend( pair.end, 0.5 );
        centers.push( center );
        var angle = pair.end.minus( pair.start ).angle();
        if ( types[ i ] === 'round' ) {
          children.push( new RoundBeadNode( { center: center } ) );
        }
        else {
          children.push( new SquareBeadNode( { center: center, rotation: angle } ) );
        }
      }

      // The black line of the necklace
      var shape = new Shape();
      for ( i = 0; i < centers.length; i++ ) {
        center = centers[ i ];
        var nextCenter = i === centers.length - 1 ? centers[ 0 ] : centers[ i + 1 ];
        shape.moveToPoint( center );
        shape.lineToPoint( nextCenter );
      }

      children.unshift( new Path( shape, pathOptions ) );
    }

    Node.call( this, {
      children: children
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'StaticNecklaceNode', StaticNecklaceNode );

  return inherit( Node, StaticNecklaceNode );
} );