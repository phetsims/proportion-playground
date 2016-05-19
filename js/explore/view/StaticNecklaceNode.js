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
  var Fraction = require( 'PHETCOMMON/model/Fraction' );

  function StaticNecklaceNode( roundBeadCount, squareBeadCount ) {

    // approximate as polygon, then we can mutate points and curve segments to make it look more like a necklace

    var numBeads = roundBeadCount + squareBeadCount;
    var numberPoints = numBeads;
    var angleBetweenPoints = Math.PI * 2 / numberPoints;
    var sideLength = 24;
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

      var reduced = new Fraction( roundBeadCount, squareBeadCount );
      reduced.reduce();
      var wholePart = reduced.denominator > 0 ? Math.floor( reduced.numerator / reduced.denominator ) : 0;
      var remainingFraction = new Fraction( reduced.numerator - wholePart * reduced.denominator, reduced.denominator );
      console.log( wholePart + ' ' + remainingFraction.numerator + '/' + remainingFraction.denominator );

      var interleave = false;
      var ratio = wholePart;
      if ( remainingFraction.numerator === 0 ) {
        // OK to interleave
        interleave = true;

      }

      // TODO: Also do the reverse, denominator/numerator


      // see http://mathworld.wolfram.com/RegularPolygon.html
      var R = 1 / 2 * sideLength / Math.sin( Math.PI / numberPoints );
      if ( numberPoints === 3 ) {
        R = R * 2;
      }
      var vertices = [];

      for ( var i = 0; i < numberPoints; i++ ) {
        var point = Vector2.createPolar( R, i * angleBetweenPoints );
        vertices.push( point );
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

      var remainingRoundBeads = roundBeadCount;
      var usedRoundBeads = 0;
      var usedSquareBeads = 0;

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

      for ( i = 0; i < pairs.length; i++ ) {
        var pair = pairs[ i ];
        var center = pair.start.blend( pair.end, 0.5 );
        var angle = pair.end.minus( pair.start ).angle();
        if ( types[ i ] === 'round' ) {
          children.push( new RoundBeadNode( { center: center } ) );
        }
        else {
          children.push( new SquareBeadNode( { center: center, rotation: angle } ) );
        }
      }
    }


    Node.call( this, {
      children: children
    } );
  }

  proportionPlayground.register( 'StaticNecklaceNode', StaticNecklaceNode );

  return inherit( Node, StaticNecklaceNode, {} );
} );