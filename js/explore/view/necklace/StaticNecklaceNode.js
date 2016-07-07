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
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Random = require( 'DOT/Random' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/RoundBeadNode' );
  var Shape = require( 'KITE/Shape' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/SquareBeadNode' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var PATH_OPTIONS = { stroke: 'black', lineWidth: 2 };
  var ROTATE_UPRIGHT = -Math.PI / 2;

  /**
   * @param {number} roundBeadCount - number of round beads
   * @param {number} squareBeadCount - number of square beads
   * @param {Object} [options] - node options
   * @constructor
   */
  function StaticNecklaceNode( roundBeadCount, squareBeadCount, options ) {

    var numBeads = roundBeadCount + squareBeadCount;

    // Number of vertices is one more than number of beads to account for a gap.
    var numVertices = numBeads + 1;
    var angelBetweenVertices = Math.PI * 2 / numVertices;
    var sideLength = ProportionPlaygroundConstants.BEAD_DIAMETER + 5;

    // seed for the random number generator determined by proportion
    var seed = squareBeadCount === 0 ? 30 : roundBeadCount / squareBeadCount;
    var random = new Random( { seed: seed } );

    // special sidelength for necklaces with three beads
    if ( roundBeadCount + squareBeadCount === 3 ) {
      sideLength = 2 * ProportionPlaygroundConstants.BEAD_DIAMETER - 1;
    }

    // layer for necklace line and beads
    var children = [];

    // points that determine the shape of the necklace line
    var splinePoints = [];

    var k = 0;

    // one bead
    if ( numBeads === 1 ) {

      // show the one bead at the bottom of a circle
      for ( k = 0; k < roundBeadCount; k++ ) {
        children.push( new RoundBeadNode() );
      }
      for ( k = 0; k < squareBeadCount; k++ ) {
        children.push( new SquareBeadNode() );
      }

      // shape for the necklace line
      var oneBeadShape = new Shape();

      // if one round bead, draw the same shape as twenty round beads
      if ( roundBeadCount === 1 ) {
        splinePoints = [ new Vector2( 7, 1 ),
          new Vector2( -7, 1 ),
          new Vector2( -13, -27 ),
          new Vector2( 9, -28 )
        ];
      }

      // if one square bead, draw the same shape as twenty square beads
      else {
        splinePoints = [ new Vector2( 10, 0 ),
          new Vector2( -11, 0 ),
          new Vector2( -12, -24 ),
          new Vector2( 12, -24 )
        ];
      }

      oneBeadShape.cardinalSpline( splinePoints, { tension: -0.75, isClosedLineSegments: true } );
      children.unshift( new Path( oneBeadShape, PATH_OPTIONS ) );

    }

    // two beads
    else if ( numBeads === 2 ) {

      // Show two beads at the bottom of the circle.
      var x = 0;
      for ( k = 0; k < roundBeadCount; k++ ) {
        children.push( new RoundBeadNode( { x: x } ) );
        x += 22;
      }
      for ( k = 0; k < squareBeadCount; k++ ) {
        children.push( new SquareBeadNode( { x: x } ) );
        x += 22;
      }

      // if all round beads, draw the same shape as twenty round beads
      if ( roundBeadCount === 2 ) {
        splinePoints = [
          new Vector2( 10 + 11, 1 ),
          new Vector2( -10 + 11, 1 ),
          new Vector2( -14 + 11, -27 ),
          new Vector2( 10 + 11, -29 )
        ];
      }

      // if all square beads, draw the same shape as twenty square beads
      else if ( squareBeadCount === 2 ) {
        splinePoints = [
          new Vector2( 11 + 11, 0 ),
          new Vector2( -12 + 11, 0 ),
          new Vector2( -13 + 11, -25 ),
          new Vector2( 13 + 11, -25 )
        ];
      }
      // if one bead of each kind, draw same shape as twenty round and twenty square beads
      else {
        splinePoints = [ new Vector2( 0 + 11, 5 ),
          new Vector2( -20 + 11, -17 ),
          new Vector2( 0 + 11, -40 ),
          new Vector2( 20 + 11, -17 )
        ];
      }

      // shape for necklace line
      var twoBeadShape = new Shape();

      // tension empirically determined to make necklace look realistic
      twoBeadShape.cardinalSpline( splinePoints, { tension: -0.75, isClosedLineSegments: true } );
      children.unshift( new Path( twoBeadShape, PATH_OPTIONS ) );

    }

    // more than two beads
    else {

      // approximate as polygon with beads between each vertex, see http://mathworld.wolfram.com/RegularPolygon.html
      var R = 1 / 2 * sideLength / Math.sin( Math.PI / numVertices );

      // make beads closer together as there are more of them
      var rScale = Util.linear( 3, ProportionPlaygroundConstants.MAX_BEADS, 1.5, 1, numVertices );
      if ( numVertices <= 20 ) {
        R = R * rScale;
      }
      var vertices = [];

      // Use repulsion of random points to make the shape look more natural.

      // use apothem to calculate random repulsion poitns so they don't fall outside the polygon
      // see http://www.mathopenref.com/apothem.html   
      var apothem = R * Math.cos( Math.PI / numVertices );

      // randomly choose 1, 2, 3, or 4 repulsion points
      var randomNumber = random.random() * 4;
      var repulsionPoints = [];
      var divisionAngle = Math.PI / 2;

      // create repulsion points
      for ( var g = 0; g < randomNumber; g++ ) {

        // choose a random radius in a range 0.2 - 0.5 of the apothem
        var randomRadius = ( random.random() * 0.3 + 0.2 ) * apothem;

        // separate repulsion points by quadrant to prevent too much concentrated repulsion
        var randomAngle = random.random() * Math.PI / 2 / randomNumber + g * divisionAngle;
        var repulsor = Vector2.createPolar( randomRadius, randomAngle );
        repulsionPoints.push( repulsor );
      }

      // loop through vertices and change according to repulsion points
      for ( var i = 0; i < numVertices; i++ ) {
        var angle = ( i + 0.5 ) * angelBetweenVertices + ROTATE_UPRIGHT;
        var perfectVertex = Vector2.createPolar( R, angle );
        var newRadius = R;

        // loop through repulsion points and change the vertex
        for ( g = 0; g < repulsionPoints.length; g++ ) {
          var difference = repulsionPoints[ g ].distance( perfectVertex );
          var amount = Math.pow( ( apothem - difference ), 2 );
          var change = amount / R;
          newRadius += change;
        }

        var vertex = Vector2.createPolar( newRadius, angle );
        vertices.push( vertex );
      }

      // Set up pairs of vertices - between each pair of vertices will be a bead
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

        // search for greatest common divisor of a and b
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

      // Between each pair of vertices, we must put a bead in the center
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

      // Resize necklace to be smaller so beads are closer together
      var radiusScale = ProportionPlaygroundConstants.BEAD_DIAMETER / minSideLength;

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

        // If it is the last pair, move center further away for a curved gap.
        else {
          centers[ i ] = center.addXY( 15 * Math.cos( center.angle() ), 15 * Math.sin( center.angle() ) );
        }
      }

      // the black line of the necklace
      var shape = new Shape();
      for ( i = 0; i < centers.length - 1; i++ ) {
        center = centers[ i ];

        // Have the last bead connect to the first bead.
        var nextCenter = i === centers.length - 2 ? centers[ 0 ] : centers[ i + 1 ];

        // the more vertices, the less curved the necklace line connecting to each bead
        var strength = 20 / numVertices + 2;

        // control point for the quadratic curve
        var control = center.blend( nextCenter, 0.5 );

        // curve necklace line based on a certain degree of strength
        control.addXY( strength * Math.cos( control.angle() ), strength * Math.sin( control.angle() ) );

        // gap is more curved/bumpy han the rest of the black line
        if ( i === centers.length - 2 ) {
          control = centers[ centers.length - 1 ];
        }

        shape.moveToPoint( center );
        shape.quadraticCurveToPoint( control, nextCenter );
      }

      children.unshift( new Path( shape, PATH_OPTIONS ) );
    }

    Node.call( this, {
      children: children
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'StaticNecklaceNode', StaticNecklaceNode );

  return inherit( Node, StaticNecklaceNode );
} );

