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
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );

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
      rotation: -Math.PI / 2,
      stroke: ProportionPlaygroundColorProfile.paintStrokeProperty,
      lineWidth: 0.6,
      fill: PaintChoice.getActiveColorProperty( paintChoiceProperty, paintDrip.side ) // TODO: see if we can consolidate in super
    } );
    this.addChild( this.path );
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
      // constants control the bottom position of the droplet, so that it looks like it comes from the bottom of the splotch
      this.y = startPosition.y + 8 + bottomDistance - 22 + 12 * Math.sqrt( this.paintDrip.initialSplotchArea );

      var hasPaint = this.paintDrip.drippedAmount > 0;
      this.visible = hasPaint;
      if ( hasPaint ) {
        this.setScaleMagnitude( this.paintDrip.drippedAmount );
      }

      // TODO: set scale on self with setScaleMagnitude?
      if ( this.top > layoutBottom ) {
        this.paintDrip.remove();
      }
    }
  } );
} );
