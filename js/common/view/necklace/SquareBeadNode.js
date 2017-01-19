// Copyright 2016, University of Colorado Boulder

/**
 * Shows a single round bead.  Used in the necklace as well as in the NumberPicker icons.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Color = require( 'SCENERY/util/Color' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // constants
  var DIAMETER = ProportionPlaygroundConstants.BEAD_DIAMETER;
  var RADIUS = DIAMETER / 2;
  var BLUE = new Color( ProportionPlaygroundConstants.BEADS_BLUE );
  var ROUND = RADIUS / 5;

  /**
   * @constructor
   *
   * @param {number} rotation - How the generated node should be rotated
   * @param {Object} [options] - node options
   */
  function SquareBeadNode( rotation, options ) {
    Node.call( this );

    var container = new Node( {
      scale: 0.95
    } );

    container.addChild( new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: BLUE.colorUtilsDarker( 0.7 ),
      rotation: rotation,
      x: -DIAMETER / 15,
      y: DIAMETER / 15
    } ) );

    container.addChild( new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: BLUE.colorUtilsDarker( 0.4 ),
      rotation: rotation,
      scale: 20/21,
      x: -DIAMETER / 30,
      y: DIAMETER / 30
    } ) );

    var gradientOffset = RADIUS * 0.6;
    var gradientAngle = -Math.PI / 4;
    var gradientX = gradientOffset * Math.cos( gradientAngle - rotation );
    var gradientY = gradientOffset * Math.sin( gradientAngle - rotation );

    container.addChild( new Rectangle( -RADIUS, -RADIUS, DIAMETER, DIAMETER, ROUND, ROUND, {
      fill: new RadialGradient( gradientX, gradientY, 0, gradientX, gradientY, DIAMETER + gradientOffset )
              .addColorStop( 0, BLUE.colorUtilsBrighter( 0.2 ) )
              .addColorStop( 0.3, BLUE )
              .addColorStop( 0.5, BLUE.colorUtilsDarker( 0.1 ) )
              .addColorStop( 0.8, BLUE.colorUtilsDarker( 0.3 ) ),
      scale: 10 / 11,
      rotation: rotation
    } ) );

    this.mutate( _.extend( {
      children: [ container ],
      rotation: -Math.PI / 2
    }, options ) );
  }

  proportionPlayground.register( 'SquareBeadNode', SquareBeadNode );

  return inherit( Node, SquareBeadNode );
} );
