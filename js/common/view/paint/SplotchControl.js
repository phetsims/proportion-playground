// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable SplotchNode with its associated NumberPickers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  var PaintBalloonNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/PaintBalloonNode' );
  var PaintDripNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/PaintDripNode' );
  var Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );

  // Used as scratch vectors below
  var startVector = new Vector2();

  /**
   * @constructor
   *
   * @param {Splotch} splotch - the model
   * @param {Property.<PaintChoice>} paintChoiceProperty - Holds our current paint choice
   * @param {boolean} useVisibleAmounts - Whether our visible splotch size should be based on the "visible" counts as
   *                                      determined by the location of balloons/drips, or by the "real count"
   * @param {Side} balloonThrowSide - The side where balloon throws should originate from
   */
  function SplotchControl( splotch, paintChoiceProperty, useVisibleAmounts, balloonThrowSide ) {
    var self = this;

    SceneRatioControl.call( this, splotch, PaintChoice.getActiveColorProperty( paintChoiceProperty, Side.LEFT ),
                                           PaintChoice.getActiveColorProperty( paintChoiceProperty, Side.RIGHT ) );

    var dripLayer = new Node();
    var balloonLayer = new Node();

    // Performance note: These are added so that WebGL will pre-allocate these images in the SpriteSheet, so it doesn't
    // happen upon loading. It also ensures there's a WebGLBlock.
    balloonLayer.addChild( new Node( {
      visible: false,
      children: PaintBalloonNode.BALLOON_IMAGES
    } ) );

    // @private
    this.splotchNode = new SplotchNode( splotch, paintChoiceProperty, {
      useVisibleAmounts: useVisibleAmounts,
      centerX: 0,
      centerY: 250
    } );
    this.addChild( dripLayer );
    this.addChild( this.splotchNode ); // TODO: how is this positioned?
    this.addChild( balloonLayer );
    this.addBottomPickers();

    // @private {Side}
    this.balloonThrowSide = balloonThrowSide;

    // @private {Array.<PaintBalloonNode>}
    this.balloonNodes = [];

    // @private {Array.<PaintDripNode>}
    this.dripNodes = [];

    // Never add balloons/drips if we don't use the visible amounts
    if ( useVisibleAmounts ) {
      splotch.balloons.addItemAddedListener( function( balloon ) {
        var randomStart = new Vector2( phet.joist.random.nextDouble(), phet.joist.random.nextDouble() ).minusScalar( 0.5 ).timesScalar( 150 );
        var randomEnd = new Vector2( phet.joist.random.nextDouble(), phet.joist.random.nextDouble() ).minusScalar( 0.5 ).timesScalar( 30 );
        var balloonNode = new PaintBalloonNode( balloon, paintChoiceProperty, randomStart, randomEnd );
        balloonLayer.addChild( balloonNode );
        self.balloonNodes.push( balloonNode );
      } );

      splotch.balloons.addItemRemovedListener( function( balloon ) {
        for ( var i = self.balloonNodes.length - 1; i >= 0; i-- ) {
          var balloonNode = self.balloonNodes[ i ];
          if ( balloonNode.paintBalloon === balloon ) {
            self.balloonNodes.splice( i, 1 );
            balloonLayer.removeChild( balloonNode );
            balloonNode.dispose();
          }
        }
      } );

      splotch.drips.addItemAddedListener( function( drip ) {
        var dripNode = new PaintDripNode( drip, paintChoiceProperty );
        dripLayer.addChild( dripNode );
        self.dripNodes.push( dripNode );
      } );

      splotch.drips.addItemRemovedListener( function( drip ) {
        for ( var i = self.dripNodes.length - 1; i >= 0; i-- ) {
          var dripNode = self.dripNodes[ i ];
          if ( dripNode.paintDrip === drip ) {
            self.dripNodes.splice( i, 1 );
            dripLayer.removeChild( dripNode );
          }
        }
      } );
    }
  }

  proportionPlayground.register( 'SplotchControl', SplotchControl );

  return inherit( SceneRatioControl, SplotchControl, {
    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt - In seconds
     * @param {Bounds2} visibleBounds
     */
    step: function( dt, visibleBounds ) {
      if ( this.balloonNodes.length || this.dripNodes.length ) {
        visibleBounds = this.parentToLocalBounds( visibleBounds );

        var balloonSign = this.balloonThrowSide === Side.LEFT ? -1 : 1;
        var startLocation = startVector.setXY( visibleBounds.centerX + 0.55 * balloonSign * visibleBounds.width,
                                               visibleBounds.bottom * 0.8 );
        var splotchLocation = this.splotchNode.center;
        for ( var i = 0; i < this.balloonNodes.length; i++ ) {
          this.balloonNodes[ i ].position( startLocation, splotchLocation );
        }

        for ( i = this.dripNodes.length - 1; i >= 0; i-- ) {
          this.dripNodes[ i ].position( splotchLocation, visibleBounds.bottom );
        }
      }
    }
  } );
} );
