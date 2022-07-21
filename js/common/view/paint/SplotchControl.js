// Copyright 2016-2022, University of Colorado Boulder

/**
 * Combines a mutable SplotchNode with its associated NumberPickers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import dotRandom from '../../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { Node } from '../../../../../scenery/js/imports.js';
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
const SPLOTCH_POSITION = new Vector2( 0, ProportionPlaygroundConstants.CONTROL_Y_OFFSET );

class SplotchControl extends SceneRatioControl {
  /**
   * @param {Splotch} splotch - the model
   * @param {Property.<PaintChoice>} paintChoiceProperty - Holds our current paint choice
   * @param {boolean} useVisibleAmounts - Whether our visible splotch size should be based on the "visible" counts as
   *                                      determined by the position of balloons/drips, or by the "real count"
   * @param {Side} balloonThrowSide - The side where balloon throws should originate from
   * @param {Tandem} tandem
   */
  constructor( splotch, paintChoiceProperty, useVisibleAmounts, balloonThrowSide, tandem ) {
    assert && assert( tandem );

    super(
      splotch,
      PaintChoice.getActiveColorProperty( paintChoiceProperty, Side.LEFT ),
      PaintChoice.getActiveColorProperty( paintChoiceProperty, Side.RIGHT ),
      tandem
    );

    const dripLayer = new Node();
    const balloonLayer = new Node();

    // @private {SplotchNode}
    this.splotchNode = new SplotchNode( splotch, paintChoiceProperty, {
      useVisibleAmounts: useVisibleAmounts,
      translation: SPLOTCH_POSITION
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
      splotch.balloons.addItemAddedListener( balloon => {
        // Balloons have a random slight offset for the start/end (in the view only)
        const randomStart = new Vector2( dotRandom.nextDouble(), dotRandom.nextDouble() ).minusScalar( 0.5 ).timesScalar( 150 );
        const randomEnd = new Vector2( dotRandom.nextDouble(), dotRandom.nextDouble() ).minusScalar( 0.5 ).timesScalar( 30 );
        const balloonNode = new PaintBalloonNode( balloon, paintChoiceProperty, randomStart, randomEnd );
        balloonLayer.addChild( balloonNode );
        this.balloonNodes.push( balloonNode );
      } );

      // Remove balloon views when the model is removed
      splotch.balloons.addItemRemovedListener( balloon => {
        for ( let i = this.balloonNodes.length - 1; i >= 0; i-- ) {
          const balloonNode = this.balloonNodes[ i ];
          if ( balloonNode.paintBalloon === balloon ) {
            this.balloonNodes.splice( i, 1 );
            balloonLayer.removeChild( balloonNode );
            balloonNode.dispose();
          }
        }
      } );

      // Add drip views when the model is added
      splotch.drips.addItemAddedListener( drip => {
        const dripNode = new PaintDripNode( drip, paintChoiceProperty );
        dripLayer.addChild( dripNode );
        this.dripNodes.push( dripNode );
      } );

      // Remove drip views when the model is removed
      splotch.drips.addItemRemovedListener( drip => {
        for ( let i = this.dripNodes.length - 1; i >= 0; i-- ) {
          const dripNode = this.dripNodes[ i ];
          if ( dripNode.paintDrip === drip ) {
            this.dripNodes.splice( i, 1 );
            dripLayer.removeChild( dripNode );
            dripNode.dispose();
          }
        }
      } );
    }
  }

  /**
   * Steps forward in time.
   * @public
   *
   * @param {number} dt - In seconds
   * @param {Bounds2} visibleBounds
   */
  step( dt, visibleBounds ) {
    if ( this.balloonNodes.length || this.dripNodes.length ) {
      visibleBounds = this.parentToLocalBounds( visibleBounds );

      const balloonSign = this.balloonThrowSide === Side.LEFT ? -1 : 1;
      const startPosition = startVector.setXY( visibleBounds.centerX + 0.55 * balloonSign * visibleBounds.width,
        visibleBounds.bottom * 0.8 );

      // Update balloon positions
      for ( let i = 0; i < this.balloonNodes.length; i++ ) {
        this.balloonNodes[ i ].position( startPosition, SPLOTCH_POSITION );
      }

      // Update drip positions
      for ( let i = this.dripNodes.length - 1; i >= 0; i-- ) {
        this.dripNodes[ i ].position( SPLOTCH_POSITION, visibleBounds.bottom );
      }
    }
  }
}

proportionPlayground.register( 'SplotchControl', SplotchControl );

export default SplotchControl;
