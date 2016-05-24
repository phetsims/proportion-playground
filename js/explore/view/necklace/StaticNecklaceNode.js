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

  // constants
  var pathOptions = { stroke: 'black', lineWidth: 2 };

  function StaticNecklaceNode( roundBeadCount, squareBeadCount ) {

    // approximate as polygon, then we can mutate points and curve segments to make it look more like a necklace

    var numBeads = roundBeadCount + squareBeadCount;
    var numberPoints = numBeads;
    var angleBetweenPoints = Math.PI * 2 / numberPoints;
    var sideLength = 23;
    if ( roundBeadCount + squareBeadCount === 3 ) {
      sideLength = 35;
    }
    var children = [];
    var k = 0;
    if ( numBeads === 0 || numBeads === 1 ) {
      for ( k = 0; k < roundBeadCount; k++ ) {
        children.push( new RoundBeadNode() );
      }
      for ( k = 0; k < squareBeadCount; k++ ) {
        children.push( new SquareBeadNode() );
      }

      children.unshift( new Circle( 12, _.extend( { y: -15 }, pathOptions ) ) );
    }
    else if ( numBeads === 2 ) {
      var x = 0;
      for ( k = 0; k < roundBeadCount; k++ ) {
        children.push( new RoundBeadNode( { x: x } ) );
        x += 22;
      }
      for ( k = 0; k < squareBeadCount; k++ ) {
        children.push( new SquareBeadNode( { x: x } ) );
        x += 22;
      }
      children.unshift( new Circle( 14, _.extend( { y: -11, x: (7 + 14) / 2 }, pathOptions ) ) ); // TODO: factor out numbers
    }
    else {

      // see http://mathworld.wolfram.com/RegularPolygon.html
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

      // smoothing step
      // for ( i = 0; i < vertices.length; i++ ) {
      //   var pre = vertices[ i - 1 ];
      //   var post = vertices[ i + 1 ];
      //   if ( pre && post ) {
      //     vertices[ i ].set( pre.blend( post, 0.5 ) );
      //   }
      //   vertices[ i ].addXY( Math.random() * randomAmount - randomAmount / 2, Math.random() * randomAmount - randomAmount / 2 );
      // }

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

        // TODO: generalize range or factor out
        for ( var m = 20; m >= 1 && !match; m-- ) { // search for many pattern occurrences first
          for ( var na = 0; na <= 20 && !match; na++ ) {
            for ( var nb = 0; nb <= 20 && !match; nb++ ) {
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

      // for each repeat
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
  }

  proportionPlayground.register( 'StaticNecklaceNode', StaticNecklaceNode );

  return inherit( Node, StaticNecklaceNode, {} );
} );