// Copyright 2016-2022, University of Colorado Boulder

/**
 * Encodes layout information about how the square/round beads and chain/string are positioned, given a count of
 * round and square beads.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrea Lin
 */

import Random from '../../../../../dot/js/Random.js';
import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { Shape } from '../../../../../kite/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import RoundBead from './RoundBead.js';
import SquareBead from './SquareBead.js';

// {number} - The diameter of beads (for the square bead, it's from the center of the bead to the center of a side)
const BEAD_DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;

// The horizontal offset in two-bead shapes from the vertical center-line to the beads.
// The "best" way would be to refactor all of the custom curves/positioning so things are
// curves centered about the origin created with a shared parameterized function
// (instead of many "magic" constants with custom x,y values for each curve).
// But this didn't seem to be worth the time/risk.
const TWO_BEAD_OFFSET = BEAD_DIAMETER - 7;

/**
 * Creates an immutable spline with specific parameters from a list of points.
 * @private
 *
 * @param {Array.<Vector2>} splinePoints
 * @returns {Shape}
 */
function shapeFromSplintPoints( splinePoints ) {
  return new Shape().cardinalSpline( splinePoints, {
    tension: -0.75,
    isClosedLineSegments: true
  } ).makeImmutable();
}

// {Object} - maps a seed {number} => {Array.<Vector2>}, see getRepulsionPoints(). Lazily computed
const repulsionPointMap = {};

/**
 * Returns points used for adjusting the necklace into a random-looking shape.
 * @private
 *
 * This repulsion should be the same for necklaces with the same proportion (and is not used if there is 0 of one
 * bead type), so a seed is generated from the ratio of the bead counts, and repulsion points are shared for every
 * layout that has the same seed.
 *
 * @param {number} roundBeadCount - Number of round beads in the necklace
 * @param {number} squareBeadCount - Number of square beads in the necklace
 * @returns {Array.<Vector2>} - An array of up to 4 repulsion points to be used in necklace layout.
 */
function getRepulsionPoints( roundBeadCount, squareBeadCount ) {
  // Keeping prior behavior based on this formula.
  const seed = squareBeadCount === 0 ? 30 : roundBeadCount / squareBeadCount;
  let repulsionPoints = repulsionPointMap[ seed ];

  if ( !repulsionPoints ) {

    // OK to use our own instance of Random here, see documentation of getRepulsionPoints
    // and https://github.com/phetsims/proportion-playground/issues/81.
    const random = new Random( { seed: seed } );
    repulsionPoints = [];
    repulsionPointMap[ seed ] = repulsionPoints;

    const numRepulsionPoints = random.nextIntBetween( 1, 4 );
    // create repulsion points
    for ( let g = 0; g < numRepulsionPoints; g++ ) {
      // separate repulsion points by quadrant to prevent too much concentrated repulsion
      const angle = Math.PI / 2 * ( random.nextDouble() / numRepulsionPoints + g );
      const radius = ( random.nextDouble() * 0.3 + 0.2 ); // 0.2 - 0.5, ratio of apothem

      repulsionPoints.push( Vector2.createPolar( radius, angle ) );
    }
  }
  return repulsionPoints;
}

// {Object} - Map from "{{roundBeadCount}},{{squareBeadCount}}" {string} => {NecklaceLayout}, lazily computed in
// NecklaceLayout.getLayout().
const layoutMap = {};

class NecklaceLayout {
  /**
   * @param {number} roundBeadCount - Number of round beads in the necklace
   * @param {number} squareBeadCount - Number of square beads in the necklace
   */
  constructor( roundBeadCount, squareBeadCount ) {

    // @public {number} - Number of round beads in the necklace
    this.roundBeadCount = roundBeadCount;

    // @public {number} - Number of square beads in the necklace
    this.squareBeadCount = squareBeadCount;

    // @public {Shape} - Shape of the chain/string behind the beads
    this.shape = new Shape();

    // @public {Array.<RoundBead>} - All round beads in the necklace
    this.roundBeads = [];

    // @public {Array.<SquareBead>} - All square beads in the necklace
    this.squareBeads = [];

    // @public {Vector2} - Global translation that should be applied to the shape/beads in order to look approximately
    // centered when in the view (heuristic to avoid expensive operations on older code).
    this.containerTranslation = Vector2.ZERO;

    if ( roundBeadCount === 1 && squareBeadCount === 0 ) {
      this.shape = NecklaceLayout.ONE_ROUND_BEAD_SHAPE;
      this.roundBeads.push( new RoundBead( Vector2.ZERO ) );
      this.containerTranslation = new Vector2( 1.3514828985498655, 12.636803053853306 );
    }
    else if ( roundBeadCount === 2 && squareBeadCount === 0 ) {
      this.shape = NecklaceLayout.TWO_ROUND_BEADS_SHAPE;
      this.roundBeads.push( new RoundBead( Vector2.ZERO ) );
      this.roundBeads.push( new RoundBead( new Vector2( TWO_BEAD_OFFSET * 2, 0 ) ) );
      this.containerTranslation = new Vector2( -11, 12.991498868074157 );
    }
    else if ( roundBeadCount === 1 && squareBeadCount === 1 ) {
      this.shape = NecklaceLayout.TWO_MIXED_BEADS_SHAPE;
      this.roundBeads.push( new RoundBead( Vector2.ZERO ) );
      this.squareBeads.push( new SquareBead( new Vector2( TWO_BEAD_OFFSET * 2, 0 ), 0 ) );
      this.containerTranslation = new Vector2( -11, 15.785 );
    }
    else if ( roundBeadCount === 0 && squareBeadCount === 1 ) {
      this.shape = NecklaceLayout.ONE_SQUARE_BEAD_SHAPE;
      this.squareBeads.push( new SquareBead( Vector2.ZERO, 0 ) );
      this.containerTranslation = new Vector2( 0.2394730404209664, 10.390542501611892 );
    }
    else if ( roundBeadCount === 0 && squareBeadCount === 2 ) {
      this.shape = NecklaceLayout.TWO_SQUARE_BEADS_SHAPE;
      this.squareBeads.push( new SquareBead( Vector2.ZERO, 0 ) );
      this.squareBeads.push( new SquareBead( new Vector2( TWO_BEAD_OFFSET * 2, 0 ), 0 ) );
      this.containerTranslation = new Vector2( -10.753124040624703, 10.534079717389499 );
    }
    else {
      const numBeads = roundBeadCount + squareBeadCount;

      // Number of vertices is one more than number of beads to account for a gap.
      const numVertices = numBeads + 1;
      const angelBetweenVertices = Math.PI * 2 / numVertices;

      // empirical, larger spacing with only 3 beads
      const sideLength = ( numBeads === 3 ? 1.94 : 1.28 ) * BEAD_DIAMETER;

      // circumradius of the polygon, used to find polar coordinates for the vertices
      let R = 1 / 2 * sideLength / Math.sin( Math.PI / numVertices );

      // make beads closer together as there are more of them
      if ( numVertices <= 20 ) {
        R *= Utils.linear( 3, ProportionPlaygroundConstants.BEAD_COUNT_RANGE.max, 1.5, 1, numVertices );
      }

      // Use repulsion of random points to make the shape look more natural.
      // apothem of the polygon, see http://www.mathopenref.com/apothem.html
      const apothem = R * Math.cos( Math.PI / numVertices );

      // Scale up the repulsion points to our size
      const repulsionPoints = getRepulsionPoints( roundBeadCount, squareBeadCount ).map( point => point.timesScalar( apothem ) );

      // loop through vertices and change according to repulsion points
      const vertices = [];
      for ( let i = 0; i < numVertices; i++ ) {
        const angle = ( i + 0.5 ) * angelBetweenVertices - Math.PI / 2;
        const perfectVertex = Vector2.createPolar( R, angle );
        let newRadius = R;

        if ( roundBeadCount > 0 && squareBeadCount > 0 ) {
          // loop through repulsion points and change the vertex
          for ( let g = 0; g < repulsionPoints.length; g++ ) {
            const difference = repulsionPoints[ g ].distance( perfectVertex );
            const amount = Math.pow( ( apothem - difference ), 2 );
            const change = amount / R;
            newRadius += change;
          }
        }

        const vertex = Vector2.createPolar( newRadius, angle );
        vertices.push( vertex );
      }

      // Set up pairs of vertices - between each pair of vertices will be a bead
      const pairs = [];
      for ( let i = 0; i < vertices.length - 1; i++ ) {
        pairs.push( { start: vertices[ i ], end: vertices[ i + 1 ] } );
      }
      // join last->first
      if ( vertices.length > 0 ) {
        pairs.push( { start: vertices[ vertices.length - 1 ], end: vertices[ 0 ] } );
      }

      const gcd = Utils.gcd( roundBeadCount, squareBeadCount );
      const types = _.flatten( _.range( 0, gcd ).map( () => _.times( squareBeadCount / gcd, () => 'square' ).concat(
        _.times( roundBeadCount / gcd, () => 'round' ) ) ) );

      // Between each pair of vertices, we must put a bead in the center
      const centers = [];
      for ( let i = 0; i < pairs.length; i++ ) {
        const pair = pairs[ i ];
        const center = pair.start.blend( pair.end, 0.5 );
        centers.push( center );
      }

      // Find the shortest distance between any two centers
      let minSideLength = centers[ centers.length - 1 ].distance( centers[ 0 ] );
      for ( let i = 0; i < centers.length - 1; i++ ) {
        const newLength = centers[ i ].distance( centers[ i + 1 ] );
        if ( newLength < minSideLength ) {
          minSideLength = newLength;
        }
      }

      // Resize necklace to be smaller so beads are closer together
      const radiusScale = BEAD_DIAMETER / minSideLength;

      for ( let i = 0; i < centers.length; i++ ) {
        const oldCenter = centers[ i ];

        // Add 5 to the radius to give some more space between beads
        const extraSpace = 0.28 * BEAD_DIAMETER;
        centers[ i ] = Vector2.createPolar( radiusScale * oldCenter.magnitude + extraSpace, oldCenter.angle );
      }

      let center;
      let angle;

      // Instantiate the beads between each vertex
      for ( let i = 0; i < centers.length; i++ ) {
        center = centers[ i ];
        angle = pairs[ i ].end.minus( pairs[ i ].start ).angle;

        // Add a bead if it is not the last pair
        if ( i !== centers.length - 1 ) {
          if ( types[ i ] === 'round' ) {
            this.roundBeads.push( new RoundBead( center ) );
          }
          else {
            this.squareBeads.push( new SquareBead( center, angle ) );
          }
        }

        // If it is the last pair, move center further away for a curved gap.
        else {
          centers[ i ] = center.addXY( 15 * Math.cos( center.angle ), 15 * Math.sin( center.angle ) );
        }
      }

      // the black line of the necklace
      for ( let i = 0; i < centers.length - 1; i++ ) {
        center = centers[ i ];

        // Have the last bead connect to the first bead.
        const nextCenter = i === centers.length - 2 ? centers[ 0 ] : centers[ i + 1 ];

        // the more vertices, the less curved the necklace line connecting to each bead
        const strength = 20 / numVertices + 2;

        // control point for the quadratic curve
        let control = center.blend( nextCenter, 0.5 );

        // curve necklace line based on a certain degree of strength
        control.addXY( strength * Math.cos( control.angle ), strength * Math.sin( control.angle ) );

        // gap is more curved/bumpy than the rest of the black line
        if ( i === centers.length - 2 ) {
          control = centers[ centers.length - 1 ];
        }

        this.shape.moveToPoint( center );
        this.shape.quadraticCurveToPoint( control, nextCenter );
      }

      this.shape.makeImmutable();

      this.containerTranslation = ( roundBeadCount + squareBeadCount === 3 ) ? new Vector2( 0, -5 ) : Vector2.ZERO;
    }
  }


  /**
   * Returns a {NecklaceLayout} corresponding to the number of round/square beads (lazily computed and cached).
   * @public
   *
   * @param {number} roundBeadCount - Number of round beads in the necklace
   * @param {number} squareBeadCount - Number of square beads in the necklace
   * @returns {NecklaceLayout}
   */
  static getLayout( roundBeadCount, squareBeadCount ) {

    const key = `${roundBeadCount},${squareBeadCount}`;
    if ( layoutMap[ key ] ) {
      return layoutMap[ key ];
    }

    const result = new NecklaceLayout( roundBeadCount, squareBeadCount );
    layoutMap[ key ] = result;
    return result;
  }
}


/**
 * {Shape} - Immutable shared string shape for when there is only one round bead.
 */
NecklaceLayout.ONE_ROUND_BEAD_SHAPE = shapeFromSplintPoints( [
  new Vector2( 0.38 * BEAD_DIAMETER, 0.05 * BEAD_DIAMETER ),
  new Vector2( -0.38 * BEAD_DIAMETER, 0.05 * BEAD_DIAMETER ),
  new Vector2( -0.72 * BEAD_DIAMETER, -1.5 * BEAD_DIAMETER ),
  new Vector2( 0.5 * BEAD_DIAMETER, -1.55 * BEAD_DIAMETER )
] );

/**
 * {Shape} - Immutable shared string shape for when there is only one square bead.
 */
NecklaceLayout.ONE_SQUARE_BEAD_SHAPE = shapeFromSplintPoints( [
  new Vector2( 0.55 * BEAD_DIAMETER, 0 ),
  new Vector2( -0.61 * BEAD_DIAMETER, 0 ),
  new Vector2( -0.66 * BEAD_DIAMETER, -1.33 * BEAD_DIAMETER ),
  new Vector2( 0.66 * BEAD_DIAMETER, -1.33 * BEAD_DIAMETER )
] );

/**
 * {Shape} - Immutable shared string shape for when there are only two round beads.
 * Previous doc: "if all round beads, draw the same shape as twenty round beads", may not be accurate.
 */
NecklaceLayout.TWO_ROUND_BEADS_SHAPE = shapeFromSplintPoints( [
  new Vector2( 0.55 * BEAD_DIAMETER + TWO_BEAD_OFFSET, 0.05 * BEAD_DIAMETER ),
  new Vector2( -0.55 * BEAD_DIAMETER + TWO_BEAD_OFFSET, 0.05 * BEAD_DIAMETER ),
  new Vector2( -0.78 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -1.5 * BEAD_DIAMETER ),
  new Vector2( 0.55 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -1.61 * BEAD_DIAMETER )
] );

/**
 * {Shape} - Immutable shared string shape for when there are only two square beads.
 * Previous doc: "if all square beads, draw the same shape as twenty square beads", may not be accurate.
 */
NecklaceLayout.TWO_SQUARE_BEADS_SHAPE = shapeFromSplintPoints( [
  new Vector2( 0.61 * BEAD_DIAMETER + TWO_BEAD_OFFSET, 0 ),
  new Vector2( -0.66 * BEAD_DIAMETER + TWO_BEAD_OFFSET, 0 ),
  new Vector2( -0.71 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -1.39 * BEAD_DIAMETER ),
  new Vector2( 0.71 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -1.29 * BEAD_DIAMETER )
] );

/**
 * {Shape} - Immutable shared string shape for when there is only one bead of each type.
 * Previous doc: "if one bead of each kind, draw same shape as twenty round and twenty square beads", may not be
 * accurate.
 */
NecklaceLayout.TWO_MIXED_BEADS_SHAPE = shapeFromSplintPoints( [
  new Vector2( TWO_BEAD_OFFSET, 5 ),
  new Vector2( -1.11 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -0.94 * BEAD_DIAMETER ),
  new Vector2( TWO_BEAD_OFFSET, -2.22 * BEAD_DIAMETER ),
  new Vector2( 1.11 * BEAD_DIAMETER + TWO_BEAD_OFFSET, -0.94 * BEAD_DIAMETER )
] );

proportionPlayground.register( 'NecklaceLayout', NecklaceLayout );

export default NecklaceLayout;