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
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var Random = require( 'DOT/Random' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/RoundBeadNode' );
  var Shape = require( 'KITE/Shape' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/SquareBeadNode' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BEAD_DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;

  function shapeFromSplintPoints( splinePoints ) {
    return new Shape().cardinalSpline( splinePoints, {
      tension: -0.75,
      isClosedLineSegments: true
    } ).makeImmutable();
  }

  var ONE_ROUND_BEAD_SPAPE = shapeFromSplintPoints( [
    new Vector2( 0.38 * BEAD_DIAMETER, 0.05 * BEAD_DIAMETER ),
    new Vector2( -0.38 * BEAD_DIAMETER, 0.05 * BEAD_DIAMETER ),
    new Vector2( -0.72 * BEAD_DIAMETER, -1.5 * BEAD_DIAMETER ),
    new Vector2( 0.5 * BEAD_DIAMETER, -1.55 * BEAD_DIAMETER )
  ] );

  var ONE_SQUARE_BEAD_SPAPE = shapeFromSplintPoints( [
    new Vector2( 0.55 * BEAD_DIAMETER, 0 ),
    new Vector2( -0.61 * BEAD_DIAMETER, 0 ),
    new Vector2( -0.66 * BEAD_DIAMETER, -1.33 * BEAD_DIAMETER ),
    new Vector2( 0.66 * BEAD_DIAMETER, -1.33 * BEAD_DIAMETER )
  ] );

  var TWO_BEAD_OFFSET = BEAD_DIAMETER - 7;

  // if all round beads, draw the same shape as twenty round beads
  var TWO_ROUND_BEADS_SHAPE = shapeFromSplintPoints( [
    new Vector2( 0.55 * BEAD_DIAMETER + TWO_BEAD_OFFSET, 0.05 * BEAD_DIAMETER ),
    new Vector2( -0.55 * BEAD_DIAMETER + TWO_BEAD_OFFSET, 0.05 * BEAD_DIAMETER ),
    new Vector2( -0.78 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -1.5 * BEAD_DIAMETER ),
    new Vector2( 0.55 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -1.61 * BEAD_DIAMETER )
  ] );

  // if all square beads, draw the same shape as twenty square beads
  var TWO_SQUARE_BEADS_SHAPE = shapeFromSplintPoints( [
    new Vector2( 0.61 * BEAD_DIAMETER + TWO_BEAD_OFFSET, 0 ),
    new Vector2( -0.66 * BEAD_DIAMETER + TWO_BEAD_OFFSET, 0 ),
    new Vector2( -0.71 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -1.39 * BEAD_DIAMETER ),
    new Vector2( 0.71 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -1.29 * BEAD_DIAMETER )
  ] );

  // if one bead of each kind, draw same shape as twenty round and twenty square beads
  var TWO_MIXED_BEADS_SHAPE = shapeFromSplintPoints( [
    new Vector2( TWO_BEAD_OFFSET, 5 ),
    new Vector2( -1.11 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -0.94 * BEAD_DIAMETER ),
    new Vector2( TWO_BEAD_OFFSET, -2.22 * BEAD_DIAMETER ),
    new Vector2( 1.11 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -0.94 * BEAD_DIAMETER )
  ] );

  var repulsionPointMap = {};
  function getRepulsionPoints( roundBeadCount, squareBeadCount ) {
    var seed = squareBeadCount === 0 ? 30 : roundBeadCount / squareBeadCount;
    var repulsionPoints = repulsionPointMap[ seed ];

    if ( !repulsionPoints ) {
      var random = new Random( { seed: seed } );
      repulsionPoints = [];
      repulsionPointMap[ seed ] = repulsionPoints;

      var numRepulsionPoints = random.nextIntBetween( 1, 4 );
      // create repulsion points
      for ( var g = 0; g < numRepulsionPoints; g++ ) {
        // separate repulsion points by quadrant to prevent too much concentrated repulsion
        var angle = Math.PI / 2 * ( random.nextDouble() / numRepulsionPoints + g );
        var radius = ( random.nextDouble() * 0.3 + 0.2 ); // 0.2 - 0.5, ratio of apothem

        repulsionPoints.push( Vector2.createPolar( radius, angle ) );
      }
    }
    return repulsionPoints;
  }

  var layoutMap = {};
  // approximate necklace as polygon with beads between each vertex, see http://mathworld.wolfram.com/RegularPolygon.html
  function getMultiBeadLayout( roundBeadCount, squareBeadCount ) {
    var key = roundBeadCount + ',' + squareBeadCount;
    if ( layoutMap[ key ] ) {
      return layoutMap[ key ];
    }

    var result = {
      shape: new Shape(),
      roundBeads: [],
      squareBeads: []
    };
    layoutMap[ key ] = result;

    var numBeads = roundBeadCount + squareBeadCount;

    // Number of vertices is one more than number of beads to account for a gap.
    var numVertices = numBeads + 1;
    var angelBetweenVertices = Math.PI * 2 / numVertices;

    // empirical, larger spacing with only 3 beads
    var sideLength = ( numBeads === 3 ? 1.94 : 1.28 ) * BEAD_DIAMETER;

    // circumradius of the polygon, used to find polar coordinates for the vertices
    var R = 1 / 2 * sideLength / Math.sin( Math.PI / numVertices );

    // make beads closer together as there are more of them
    if ( numVertices <= 20 ) {
      R *= Util.linear( 3, ProportionPlaygroundConstants.BEAD_COUNT_RANGE.max, 1.5, 1, numVertices );
    }

    // Use repulsion of random points to make the shape look more natural.
    // apothem of the polygon, see http://www.mathopenref.com/apothem.html
    var apothem = R * Math.cos( Math.PI / numVertices );

    // Scale up the repulsion points to our size
    var repulsionPoints = getRepulsionPoints( roundBeadCount, squareBeadCount ).map( function( point ) {
      return point.timesScalar( apothem );
    } );

    // loop through vertices and change according to repulsion points
    var vertices = [];
    for ( var i = 0; i < numVertices; i++ ) {
      var angle = ( i + 0.5 ) * angelBetweenVertices - Math.PI / 2;
      var perfectVertex = Vector2.createPolar( R, angle );
      var newRadius = R;

      if ( roundBeadCount > 0 && squareBeadCount > 0 ) {
        // loop through repulsion points and change the vertex
        for ( var g = 0; g < repulsionPoints.length; g++ ) {
          var difference = repulsionPoints[ g ].distance( perfectVertex );
          var amount = Math.pow( ( apothem - difference ), 2 );
          var change = amount / R;
          newRadius += change;
        }
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

    var gcd = Util.gcd( roundBeadCount, squareBeadCount );
    var types = _.flatten( _.range( 0, gcd ).map( function() {
      return _.times( squareBeadCount / gcd, function() { return 'square'; } ).concat(
               _.times( roundBeadCount / gcd, function() { return 'round'; } ) );
    } ) );

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
    var radiusScale = BEAD_DIAMETER / minSideLength;

    for ( i = 0; i < centers.length; i++ ) {
      var oldCenter = centers[ i ];

      // Add 5 to the radius to give some more space between beads
      var extraSpace = 0.28 * BEAD_DIAMETER;
      centers[ i ] = Vector2.createPolar( radiusScale * oldCenter.magnitude() + extraSpace, oldCenter.angle() );
    }

    // Instantiate the beads between each vertex
    for ( i = 0; i < centers.length; i++ ) {
      center = centers[ i ];
      angle = pairs[ i ].end.minus( pairs[ i ].start ).angle();

      // Add a bead if it is not the last pair
      if ( i !== centers.length - 1 ) {
        if ( types[ i ] === 'round' ) {
          result.roundBeads.push( {
            center: center
          } );
        } else {
          result.squareBeads.push( {
            center: center,
            angle: angle
          } );
        }
      }

      // If it is the last pair, move center further away for a curved gap.
      else {
        centers[ i ] = center.addXY( 15 * Math.cos( center.angle() ), 15 * Math.sin( center.angle() ) );
      }
    }

    // the black line of the necklace
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

      // gap is more curved/bumpy than the rest of the black line
      if ( i === centers.length - 2 ) {
        control = centers[ centers.length - 1 ];
      }

      result.shape.moveToPoint( center );
      result.shape.quadraticCurveToPoint( control, nextCenter );
    }

    result.shape.makeImmutable();

    return result;
  }
  window.getMultiBeadLayout = getMultiBeadLayout;

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
        this.chain.shape = ONE_ROUND_BEAD_SPAPE;
        this.roundBeads[ 0 ].translation = Vector2.ZERO;
        this.container.translation = new Vector2( 1.3514828985498655, 12.636803053853306 );
      }
      else if ( roundBeadCount === 2 && squareBeadCount === 0 ) {
        this.chain.shape = TWO_ROUND_BEADS_SHAPE;
        this.roundBeads[ 0 ].translation = Vector2.ZERO;
        this.roundBeads[ 1 ].translation = new Vector2( TWO_BEAD_OFFSET * 2, 0 );
        this.container.translation = new Vector2( -11, 12.991498868074157 );
      }
      else if ( roundBeadCount === 1 && squareBeadCount === 1 ) {
        this.chain.shape = TWO_MIXED_BEADS_SHAPE;
        this.roundBeads[ 0 ].translation = Vector2.ZERO;
        this.squareBeads[ 0 ].translation = new Vector2( TWO_BEAD_OFFSET * 2, 0 );
        this.squareBeads[ 0 ].setBeadRotation( 0 );
        this.container.translation = new Vector2( -11, 15.785 );
      }
      else if ( roundBeadCount === 0 && squareBeadCount === 1 ) {
        this.chain.shape = ONE_SQUARE_BEAD_SPAPE;
        this.squareBeads[ 0 ].translation = Vector2.ZERO;
        this.squareBeads[ 0 ].setBeadRotation( 0 );
        this.container.translation = new Vector2( 0.2394730404209664, 10.390542501611892 );
      }
      else if ( roundBeadCount === 0 && squareBeadCount === 2 ) {
        this.chain.shape = TWO_SQUARE_BEADS_SHAPE;
        this.squareBeads[ 0 ].translation = Vector2.ZERO;
        this.squareBeads[ 0 ].setBeadRotation( 0 );
        this.squareBeads[ 1 ].translation = new Vector2( TWO_BEAD_OFFSET * 2, 0 );
        this.squareBeads[ 1 ].setBeadRotation( 0 );
        this.container.translation = new Vector2( -10.753124040624703, 10.534079717389499 );
      }
      else if ( roundBeadCount > 0 || squareBeadCount > 0 ) {
        this.container.translation = ( roundBeadCount + squareBeadCount === 3 ) ? new Vector2( 0, -5 ) : Vector2.ZERO;
        // general case with 3+ beads
        var layout = getMultiBeadLayout( roundBeadCount, squareBeadCount );
        this.chain.shape = layout.shape;
        for ( i = 0; i < layout.roundBeads.length; i++ ) {
          this.roundBeads[ i ].translation = layout.roundBeads[ i ].center;
        }
        for ( i = 0; i < layout.squareBeads.length; i++ ) {
          this.squareBeads[ i ].translation = layout.squareBeads[ i ].center;
          this.squareBeads[ i ].setBeadRotation( layout.squareBeads[ i ].angle );
        }
      }

      // 0x3 Vector2(3.552713678800501e-15, -4.640104555964172)


      // console.log( this.container.localBounds.center.negated().toString() );
      // ( roundBeadCount || squareBeadCount ) && ( this.container.center = Vector2.ZERO );
    }
  } );
} );
