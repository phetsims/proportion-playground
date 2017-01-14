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
  var HEIGHT = 15;

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

    var topOffset = 20;
    var bottomOffset = 10;
    var shape = new Shape().moveTo( -topOffset, -HEIGHT )
                           .lineTo( -bottomOffset, 0 )
                           .lineTo( bottomOffset, 0 )
                           .lineTo( topOffset, -HEIGHT )
                           .close();
    var shapeArea = 2 * bottomOffset * HEIGHT + ( topOffset - bottomOffset ) * HEIGHT;

    this.path = new Path( shape, {
      scale: Math.sqrt( SPLOTCH_AREA / shapeArea )
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
      var topAccel = 1000;
      var bottomDistance = time * time * bottomAccel;
      var topDistance = Math.pow( time, 2.2 ) * topAccel;

      this.centerX = startPosition.x;
      this.y = startPosition.y + 8 + bottomDistance;
      var scaleY = ( HEIGHT + bottomDistance - topDistance ) / HEIGHT;
      this.setScaleMagnitude( 1 / scaleY, scaleY );
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
