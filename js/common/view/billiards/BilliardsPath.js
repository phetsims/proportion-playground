// Copyright 2017-2020, University of Colorado Boulder

/**
 * Displays the path along which the billiard ball has traveled.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import Line from '../../../../../scenery/js/nodes/Line.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundColorProfile from '../ProportionPlaygroundColorProfile.js';

// constants
const LINE_OPTIONS = {
  stroke: ProportionPlaygroundColorProfile.billiardsPathProperty,
  lineWidth: 2,
  lineCap: 'round'
};

/**
 * @constructor
 * @extends {Node}
 *
 * @param {ModelViewTransform2} modelViewTransform
 * @param {ObservableArray.<Vector2>} collisionPoints - In model coordinates
 * @param {Property.<Vector2>} ballPositionProperty - In model coordinates
 */
function BilliardsPath( modelViewTransform, collisionPoints, ballPositionProperty ) {
  const self = this;

  Node.call( this );

  assert && assert( collisionPoints.length > 0, 'Should be guaranteed' );

  // @private {ModelViewTransform2}
  this.modelViewTransform = modelViewTransform;

  // @private {ObservableArray.<Vector2>}
  this.collisionPoints = collisionPoints;

  // @private {Vector2}
  this.previousCollisionPoint = null;

  // @private {Property.<Vector2>}
  this.ballPositionProperty = ballPositionProperty;

  // @private {Line}
  this.currentLine = new Line( LINE_OPTIONS );
  this.addChild( this.currentLine );
  ballPositionProperty.link( function( modelPoint ) {
    self.currentLine.p2 = modelViewTransform.modelToViewPosition( modelPoint );
  } );

  // @private {function}
  this.collisionListener = this.addCollision.bind( this );
  collisionPoints.addItemAddedListener( this.collisionListener );
  collisionPoints.forEach( this.collisionListener );

  // Update our view on a model-view transform change.
  modelViewTransform.on( 'change', this.reset.bind( this ) );
}

proportionPlayground.register( 'BilliardsPath', BilliardsPath );

export default inherit( Node, BilliardsPath, {
  /**
   * Handles added collision points.
   * @private
   *
   * @param {Vector2} point
   */
  addCollision: function( point ) {
    point = this.modelViewTransform.modelToViewPosition( point );

    // If we are the first point, don't create a line
    if ( this.previousCollisionPoint ) {
      this.addChild( new Line( this.previousCollisionPoint, point, LINE_OPTIONS ) );
    }

    this.currentLine.p1 = this.previousCollisionPoint = point;
  },

  /**
   * Resets the path.
   * @public
   */
  reset: function() {
    this.previousCollisionPoint = null;
    this.children = [ this.currentLine ];
    this.currentLine.p1 = new Vector2( 0, 0 );
    this.collisionPoints.forEach( this.collisionListener );
  }
} );