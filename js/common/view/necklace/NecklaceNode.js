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
  var Util = require( 'SCENERY/util/Util' );
  var Vector2 = require( 'DOT/Vector2' );
  var Path = require( 'SCENERY/nodes/Path' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NecklaceGraphicNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceGraphicNode' );
  var Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var SceneRatioNode = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioNode' );
  var NecklaceWebGLBeadsNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceWebGLBeadsNode' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );

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

    if ( Util.checkWebGLSupport() && phet.chipper.queryParameters.webgl ) {
      console.log( 'WebGL Enabled' );

      var chain = new Path( null, {
        stroke: ProportionPlaygroundColorProfile.necklaceStringProperty,
        lineWidth: 2
      } );
      this.addChild( chain );

      layoutProperty.link( function( layout ) {
        // TODO: refactor out this constant
        chain.translation = layout.containerTranslation.plus( new Vector2( 0, 256 ) );
        chain.shape = layout.shape;
        chain.visible = layout.roundBeadCount > 0 || layout.squareBeadCount > 0;
      } );

      this.addChild( new NecklaceWebGLBeadsNode( layoutProperty, {
        y: 256,
        canvasBounds: localBounds,
        // TODO: refactor out common bits
        preventFit: true,
        pickable: false
      } ) );
    }
    else {
      // TODO: remove note
      console.log( 'NO WebGL' );
      this.addChild( new NecklaceGraphicNode( layoutProperty, {
        y: 256,
        // Override bounds so that expensive recomputation isn't needed
        localBounds: localBounds,
        preventFit: true,
        pickable: false
      } ) );
    }
  }

  proportionPlayground.register( 'NecklaceNode', NecklaceNode );

  return inherit( SceneRatioNode, NecklaceNode );
} );
