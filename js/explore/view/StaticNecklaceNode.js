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
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/SquareBeadNode' );
  var Vector2 = require( 'DOT/Vector2' );
  var Util = require( 'DOT/Util' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function StaticNecklaceNode( roundBeadCount, squareBeadCount ) {

    // approximate as polygon, then we can mutate points and curve segments to make it look more like a necklace

    var numBeads = roundBeadCount + squareBeadCount;
    var numberPoints = numBeads;
    var angleBetweenPoints = Math.PI * 2 / numberPoints;
    var sideLength = 20;
    var children = [];
    var k = 0;
    if ( numBeads === 1 ) {
      for ( k = 0; k < roundBeadCount; k++ ) {
        children.push( new RoundBeadNode() );
      }
      for ( k = 0; k < squareBeadCount; k++ ) {
        children.push( new SquareBeadNode() );
      }
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

      var usedRoundBeads = 0;

      var types = [];
      for ( var j = 1; j < 100; j++ ) {
        if ( roundBeadCount === squareBeadCount * j ) {
          for ( i = 0; i < pairs.length; i++ ) {
            types.push( i % (j + 1) === 0 ? 'square' : 'round' );
          }
          break;
        }
      }
      if ( types.length === 0 ) {
        for ( j = 1; j < 100; j++ ) {
          if ( squareBeadCount === roundBeadCount * j ) {
            for ( i = 0; i < pairs.length; i++ ) {
              types.push( i % (j + 1) === 0 ? 'round' : 'square' );
            }
            break;
          }
        }
      }
      if ( types.length === 0 ) {
        for ( i = 0; i < pairs.length; i++ ) {
          if ( usedRoundBeads < roundBeadCount ) {
            types.push( 'round' );
            usedRoundBeads++;
          }
          else {
            types.push( 'square' );
          }
        }
      }

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

      children.unshift( new Path( shape, { stroke: 'black', lineWidth: 2 } ) );
    }

    Node.call( this, {
      children: children
    } );
  }

  proportionPlayground.register( 'StaticNecklaceNode', StaticNecklaceNode );

  return inherit( Node, StaticNecklaceNode, {} );
} );