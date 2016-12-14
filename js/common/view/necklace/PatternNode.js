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
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Util = require( 'DOT/Util' );

  var BEAD_SIZE = 9;
  var roundBeadNode = new Circle( BEAD_SIZE / 2, {
    fill: ProportionPlaygroundConstants.BEADS_PINK
  } );

  var squareBeadNode = new Rectangle( 0, 0, BEAD_SIZE, BEAD_SIZE, {
    fill: ProportionPlaygroundConstants.BEADS_BLUE
  } );

  var invisibleBead = new Rectangle( 0, 0, BEAD_SIZE, BEAD_SIZE );

  /**
   * @constructor
   *
   * @param {Necklace} necklace
   */
  function PatternNode( necklace ) {
    var roundBeadCount = necklace.roundBeadCountProperty.value;
    var squareBeadCount = necklace.squareBeadCountProperty.value;
    var gcd = Util.gcd( roundBeadCount, squareBeadCount );
    if ( gcd !== 0 ) {
      roundBeadCount /= gcd;
      squareBeadCount /= gcd;
    }
    VBox.call( this, {
      spacing: 1.5,
      children: _.range( 0, roundBeadCount ).map( function() {
        return new Node( { children: [ roundBeadNode ] } );
      } ).concat( _.range( 0, squareBeadCount ).map( function() {
        return new Node( { children: [ squareBeadNode ] } );
      } ) ).concat( new Node( { children: [ invisibleBead ] } ) )
    } );
  }

  proportionPlayground.register( 'PatternNode', PatternNode );

  return inherit( VBox, PatternNode );
} );
