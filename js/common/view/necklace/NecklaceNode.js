// Copyright 2016, University of Colorado Boulder

/**
 * Non-interactive node that displays the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NecklaceGraphicNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceGraphicNode' );
  var Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );
  var NecklaceWebGLBeadsNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceWebGLBeadsNode' );

  /**
   *
   * @param {Necklace} necklace - the model
   * @constructor
   */
  function NecklaceNode( necklace ) {
    SceneRatioNode.call( this, necklace );

    var layoutProperty = new DerivedProperty( [
      necklace.roundBeadCountProperty,
      necklace.squareBeadCountProperty ],
    function( roundBeadCount, squareBeadCount ) {
      // TODO: return to NecklaceLayout property
      return Necklace.getMultiBeadLayout( roundBeadCount, squareBeadCount );
    } );

    var localBounds = NecklaceGraphicNode.createStaticNecklace( 20, 20 ).localBounds.dilated( 15 );

    var necklaceGraphicNode = new NecklaceGraphicNode( layoutProperty, {
      y: 256,
      // Override bounds so that expensive recomputation isn't needed
      localBounds: localBounds,
      preventFit: true,
      pickable: false
    } );
    this.addChild( necklaceGraphicNode );

    this.addChild( new NecklaceWebGLBeadsNode( layoutProperty, {
      y: 256,
      canvasBounds: localBounds,
      // TODO: refactor out common bits
      preventFit: true,
      pickable: false
    } ) );
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( SceneRatioNode, NecklaceNode );
} );
