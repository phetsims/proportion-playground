// Copyright 2016-2019, University of Colorado Boulder

/**
 * Combines a mutable SplotchNode with its associated NumberPickers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import proportionPlayground from '../../../proportionPlayground.js';
import PaintChoice from '../../model/paint/PaintChoice.js';
import Side from '../../model/Side.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneRatioControl from '../SceneRatioControl.js';
import PaintBalloonNode from './PaintBalloonNode.js';
import PaintDripNode from './PaintDripNode.js';
import SplotchNode from './SplotchNode.js';

// Used as scratch vectors below
const startVector = new Vector2( 0, 0 );

// {Vector2} - Center of the splotch in splotch-control coordinates.
const SPLOTCH_LOCATION = new Vector2( 0, ProportionPlaygroundConstants.CONTROL_Y_OFFSET );

/**
 * @constructor
 * @extends {SceneRatioControl}
 *
 * @param {Splotch} splotch - the model
 * @param {Property.<PaintChoice>} paintChoiceProperty - Holds our current paint choice
 * @param {boolean} useVisibleAmounts - Whether our visible splotch size should be based on the "visible" counts as
 *                                      determined by the location of balloons/drips, or by the "real count"
 * @param {Side} balloonThrowSide - The side where balloon throws should originate from
 */
function SplotchControl( splotch, paintChoiceProperty, useVisibleAmounts, balloonThrowSide ) {
  const self = this;

  SceneRatioControl.call( this, splotch, PaintChoice.getActiveColorProperty( paintChoiceProperty, Side.LEFT ),
    PaintChoice.getActiveColorProperty( paintChoiceProperty, Side.RIGHT ) );

  const dripLayer = new Node();
  const balloonLayer = new Node();

  // @private {SplotchNode}
  this.splotchNode = new SplotchNode( splotch, paintChoiceProperty, {
    useVisibleAmounts: useVisibleAmounts,
    translation: SPLOTCH_LOCATION
  } );

  this.addChild( dripLayer );
  this.addChild( this.splotchNode );
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
    // Add balloon views when the model is added
    splotch.balloons.addItemAddedListener( function( balloon ) {
      // Balloons have a random slight offset for the start/end (in the view only)
      const randomStart = new Vector2( phet.joist.random.nextDouble(), phet.joist.random.nextDouble() ).minusScalar( 0.5 ).timesScalar( 150 );
      const randomEnd = new Vector2( phet.joist.random.nextDouble(), phet.joist.random.nextDouble() ).minusScalar( 0.5 ).timesScalar( 30 );
      const balloonNode = new PaintBalloonNode( balloon, paintChoiceProperty, randomStart, randomEnd );
      balloonLayer.addChild( balloonNode );
      self.balloonNodes.push( balloonNode );
    } );

    // Remove balloon views when the model is removed
    splotch.balloons.addItemRemovedListener( function( balloon ) {
      for ( let i = self.balloonNodes.length - 1; i >= 0; i-- ) {
        const balloonNode = self.balloonNodes[ i ];
        if ( balloonNode.paintBalloon === balloon ) {
          self.balloonNodes.splice( i, 1 );
          balloonLayer.removeChild( balloonNode );
          balloonNode.dispose();
        }
      }
    } );

    // Add drip views when the model is added
    splotch.drips.addItemAddedListener( function( drip ) {
      const dripNode = new PaintDripNode( drip, paintChoiceProperty );
      dripLayer.addChild( dripNode );
      self.dripNodes.push( dripNode );
    } );

    // Remove drip views when the model is removed
    splotch.drips.addItemRemovedListener( function( drip ) {
      for ( let i = self.dripNodes.length - 1; i >= 0; i-- ) {
        const dripNode = self.dripNodes[ i ];
        if ( dripNode.paintDrip === drip ) {
          self.dripNodes.splice( i, 1 );
          dripLayer.removeChild( dripNode );
          dripNode.dispose();
        }
      }
    } );
  }
}

proportionPlayground.register( 'SplotchControl', SplotchControl );

export default inherit( SceneRatioControl, SplotchControl, {
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

      const balloonSign = this.balloonThrowSide === Side.LEFT ? -1 : 1;
      const startLocation = startVector.setXY( visibleBounds.centerX + 0.55 * balloonSign * visibleBounds.width,
        visibleBounds.bottom * 0.8 );

      // Update balloon positions
      for ( var i = 0; i < this.balloonNodes.length; i++ ) {
        this.balloonNodes[ i ].position( startLocation, SPLOTCH_LOCATION );
      }

      // Update drip positions
      for ( i = this.dripNodes.length - 1; i >= 0; i-- ) {
        this.dripNodes[ i ].position( SPLOTCH_LOCATION, visibleBounds.bottom );
      }
    }
  }
} );