// Copyright 2016, University of Colorado Boulder

/**
 * An immutable necklace node, used in icons and recreated by NecklaceNode when bead count changes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrea Lin
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
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Random = require( 'DOT/Random' );

  // constants
  var pathOptions = { stroke: 'black', lineWidth: 2 };
  var rotateUpright = -Math.PI / 2;

  /**
   * @param {number} roundBeadCount - number of round beads
   * @param {number} squareBeadCount - number of square beads
   * @param {Object} [options] - node options
   * @constructor
   */
  function StaticNecklaceNode( roundBeadCount, squareBeadCount, options ) {

    var numBeads = roundBeadCount + squareBeadCount;

    // Number of vertices is one more than number of beads to account for a gap.
    var numberPoints = numBeads + 1;
    var angleBetweenPoints = Math.PI * 2 / numberPoints;
    var sideLength = ProportionPlaygroundConstants.beadDiameter + 5;

    // seed for the random number generator is determined by proportion
    var seed = squareBeadCount === 0 ? 30 : roundBeadCount / squareBeadCount;
    var random = new Random( { seed: seed } );

    if ( roundBeadCount + squareBeadCount === 3 ) {
      sideLength = 2 * ProportionPlaygroundConstants.beadDiameter - 1;
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

      // Skewed circle for one beaded necklace
      var oneBeadShape = new Shape();

      var points = [];
      // if there is one round bead, draw it a certain shape
      if ( roundBeadCount === 1 ) {
        points = [ new Vector2( 7, 1 ),
          new Vector2( -11, 0 ),
          new Vector2( -12, -24 ),
          new Vector2( 12, -24 )
        ];

      }
      // if one square bead, another shape
      else {
        points = [ new Vector2( 10, 0 ),
          new Vector2( -11, 0 ),
          new Vector2( -12, -24 ),
          new Vector2( 12, -24 )
        ];
      }

      oneBeadShape.cardinalSpline( points, { tension: -0.75, isClosedLineSegments: true } );
      children.unshift( new Path( oneBeadShape, pathOptions ) );

    } else if ( numBeads === 2 ) {

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

      // if all round beads, draw a certain shape
      if ( roundBeadCount === 2 ) {
        points = [
          new Vector2( 10 + 11, 1 ),
          new Vector2( -10 + 11, 1 ),
          new Vector2( -14 + 11, -27 ),
          new Vector2( 10 + 11, -29 )
        ];
      }
      // if all square beads
      else if ( squareBeadCount === 2 ) {
        points = [
          new Vector2( 11 + 11, 0 ),
          new Vector2( -12 + 11, 0 ),
          new Vector2( -13 + 11, -25 ),
          new Vector2( 13 + 11, -25 )
        ];
      }
      // if there is one bead of each kind
      else {
        points = [ new Vector2( 0 + 11, 5 ),
          new Vector2( -20 + 11, -17 ),
          new Vector2( 0 + 11, -40 ),
          new Vector2( 20 + 11, -17 )
        ];
      }
      // Skewed circle for two beaded necklace
      var twoBeadShape = new Shape();

      // tension empirically determined to make necklace look realistic
      twoBeadShape.cardinalSpline( points, { tension: -0.75, isClosedLineSegments: true } );
      children.unshift( new Path( twoBeadShape, pathOptions ) );

    } else if ( numBeads > 2 ) {

      // approximate as polygon with beads between each vertex, see http://mathworld.wolfram.com/RegularPolygon.html
      var R = 1 / 2 * sideLength / Math.sin( Math.PI / numberPoints );

      // make beads closer together as there are more of them
      var rScale = Util.linear( 3, ProportionPlaygroundConstants.maxBeads, 1.5, 1, numberPoints );
      if ( numberPoints <= 20 ) {
        R = R * rScale;
      }
      var vertices = [];

      // Use attraction of random points to make the necklace look more natural

      // Find the apothem of the polygon, see http://www.mathopenref.com/apothem.html   
      var apothem = R * Math.cos( Math.PI / numberPoints );

      // Randomly choose 1, 2, 3, or 4 repulsion points
      var randomNumber = random.random() * 4;
      var repulsionPoints = [];
      var divisionAngle = Math.PI / 2;

      for ( var g = 0; g < randomNumber; g++ ) {
        // Choose a random radius in a range 0.2 - 0.5 of the apothem
        var randomRadius = ( random.random() * 0.3 + 0.2 ) * apothem;
        // Separate repulsion points by quadrant
        var randomAngle = random.random() * Math.PI / 2 / randomNumber + g * divisionAngle;
        var repulsor = Vector2.createPolar( randomRadius, randomAngle );
        repulsionPoints.push( repulsor );
      }

      // Change vertices according to repulsion points
      for ( var i = 0; i < numberPoints; i++ ) {
        var angle = ( i + 0.5 ) * angleBetweenPoints + rotateUpright;
        var perfectPoint = Vector2.createPolar( R, angle );
        var newRadius = R;

        for ( g = 0; g < repulsionPoints.length; g++ ) {
          var difference = repulsionPoints[ g ].distance( perfectPoint );
          var amount = Math.pow( ( apothem - difference ), 2 );
          var change = amount / R;
          newRadius += change;
        }

        var point = Vector2.createPolar( newRadius, angle );
        vertices.push( point );
      }

      // Between each pair of vertices, we must put a bead
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
      var types = [];

      var a = roundBeadCount;
      var b = squareBeadCount;

      /**
       * Searches for the bead pattern to be displayed by finding the greatest common divisor. 
       * @returns {Object} - dictionary for m, na, and nb. m is the number of patterns, na is the number of round beads 
       * per pattern, and nb is the number of square beads per pattern.
       */
      var solver = function() {

        // If there is only one type of bead, there is only one pattern occurence
        if ( a === 0 || b === 0 ) {
          return { m: 1, na: a, nb: b };
        }

        // Search for greatest common divisor of a and b
        for ( var m = a; m >= 1; m-- ) {
          if ( a % m === 0 && b % m === 0 ) {
            return { m: m, na: a / m, nb: b / m };
          }
        }

        assert && assert( false, 'no solution found' );
      };

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

      // Create centers on pairs
      var centers = [];
      for ( i = 0; i < pairs.length; i++ ) {
        var pair = pairs[ i ];
        var center = pair.start.blend( pair.end, 0.5 );
        centers.push( center );
      }

      // Find the shortest distance between any two centers
      var minSideLength = centers[ centers.length - 1 ].distance( centers[ 0 ] );
      for ( i = 0; i < centers.length - 1; i++ ) {
        var newLength = centers[ i ].distance( centers[ i + 1 ] );
        if ( newLength < minSideLength ) {
          minSideLength = newLength;
        }

      }

      // Resize necklace down so beads are closer together
      var radiusScale = ProportionPlaygroundConstants.beadDiameter / minSideLength;

      for ( i = 0; i < centers.length; i++ ) {
        var oldCenter = centers[ i ];
        // Add 5 to the radius to give some more space between beads
        centers[ i ] = Vector2.createPolar( radiusScale * oldCenter.magnitude() + 5, oldCenter.angle() );
      }

      // Instantiate the beads between each vertex
      for ( i = 0; i < centers.length; i++ ) {
        center = centers[ i ];
        angle = pairs[ i ].end.minus( pairs[ i ].start ).angle();
        // Add a bead if it is not the last pair
        if ( i !== centers.length - 1 ) {
          if ( types[ i ] === 'round' ) {
            children.push( new RoundBeadNode( { center: center } ) );
          } else {
            children.push( new SquareBeadNode( { center: center, rotation: angle } ) );
          }
        }
        // If it is the last pair, move center further away for a curved gap
        else {
          centers[ i ] = center.addXY( 15 * Math.cos( center.angle() ), 15 * Math.sin( center.angle() ) );
        }
      }

      // The black line of the necklace
      var shape = new Shape();

      for ( i = 0; i < centers.length - 1; i++ ) {
        center = centers[ i ];

        // Have the last bead connect to the first bead
        var nextCenter = i === centers.length - 2 ? centers[ 0 ] : centers[ i + 1 ];

        var strength = 20 / numberPoints + 2;

        var control = center.blend( nextCenter, 0.5 );
        control.addXY( strength * Math.cos( control.angle() ), strength * Math.sin( control.angle() ) );

        // Have the gap be more curved than the rest of the black line
        if ( i === centers.length - 2 ) {
          control = centers[ centers.length - 1 ];
        }

        shape.moveToPoint( center );
        shape.quadraticCurveToPoint( control, nextCenter );
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

