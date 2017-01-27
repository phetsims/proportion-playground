// Copyright 2014-2015, University of Colorado Boulder

/**
 * A drip of paint.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );

  var SPLOTCH_AREA = SplotchNode.getSingleSplotchArea();

  // approximate area 1486.21309056
  var SHAPE_AREA = 1486.21309056;
  var xRadius = 20 * 1.1;
  var yRadius = 18;
  var yTail = 3;
  var cp1x = xRadius * 1.4 * 0.6;
  var cp2x = xRadius * 1.4 * 0.8;
  var endX = xRadius * 1.4 * 1.5;
  var dropletShape = new Shape().ellipticalArc( 0, 0, xRadius, yRadius, 0, Math.PI / 2, 3 * Math.PI / 2, false )
                                .cubicCurveTo( cp1x, -yRadius, cp2x, -yTail, endX, 0 )
                                .cubicCurveTo( cp2x, yTail, cp1x, yRadius, 0, yRadius )
                                .close().makeImmutable();

  /**
   * @constructor
   *
   * @param {PaintDrip} paintDrip - Our paint drip
   * @param {Property.<PaintChoice>} paintChoiceProperty - The current paint choice
   */
  function PaintDripNode( paintDrip, paintChoiceProperty ) {
    Node.call( this );

    // @public {PaintDrip}
    this.paintDrip = paintDrip;

    // @private
    this.paintChoiceProperty = paintChoiceProperty;

    this.path = new Path( dropletShape, {
      scale: Math.sqrt( SPLOTCH_AREA / SHAPE_AREA ),
      rotation: -Math.PI / 2
    } );
    this.addChild( this.path );

    // @private - Stored for disposal
    this.colorChoiceListener = this.updateBalloonColor.bind( this );
    this.paintChoiceProperty.link( this.colorChoiceListener );
  }

  proportionPlayground.register( 'PaintDripNode', PaintDripNode );

  return inherit( Node, PaintDripNode, {
    /**
     * TODO: doc
     * @public
     */
    position: function( startPosition, layoutBottom ) {
      var time = this.paintDrip.timeElapsed;

      var bottomAccel = 1600;
      var bottomDistance = time * time * bottomAccel;

      this.centerX = startPosition.x;
      this.y = startPosition.y + 8 + bottomDistance;
      // TODO: set scale on self with setScaleMagnitude?
      if ( this.top > layoutBottom ) {
        this.paintDrip.remove();
      }
    },

    /**
     * Updates the drip's color based on the paintChoice
     * @private
     *
     * @param {PaintChoice} paintChoice
     */
    updateBalloonColor: function( paintChoice ) {
      this.path.fill = this.paintDrip.isLeft ? paintChoice.leftColor : paintChoice.rightColor;
    },

    /**
     * Releases references.
     * @public
     */
    dispose: function() {
      this.paintChoiceProperty.unlink( this.colorChoiceListener );
    }
  } );
} );
