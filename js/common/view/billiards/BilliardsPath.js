// Copyright 2017-2022, University of Colorado Boulder

/**
 * Displays the path along which the billiard ball has traveled.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import { Line, Node } from '../../../../../scenery/js/imports.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';

// constants
const LINE_OPTIONS = {
  stroke: ProportionPlaygroundColors.billiardsPathProperty,
  lineWidth: 2,
  lineCap: 'round'
};

class BilliardsPath extends Node {
  /**
   * @param {ModelViewTransform2} modelViewTransform
   * @param {ObservableArrayDef.<Vector2>} collisionPoints - In model coordinates
   * @param {Property.<Vector2>} ballPositionProperty - In model coordinates
   */
  constructor( modelViewTransform, collisionPoints, ballPositionProperty ) {

    super();

    assert && assert( collisionPoints.length > 0, 'Should be guaranteed' );

    // @private {ModelViewTransform2}
    this.modelViewTransform = modelViewTransform;

    // @private {ObservableArrayDef.<Vector2>}
    this.collisionPoints = collisionPoints;

    // @private {Vector2}
    this.previousCollisionPoint = null;

    // @private {Property.<Vector2>}
    this.ballPositionProperty = ballPositionProperty;

    // @private {Line}
    this.currentLine = new Line( LINE_OPTIONS );
    this.addChild( this.currentLine );
    ballPositionProperty.link( modelPoint => {
      this.currentLine.p2 = modelViewTransform.modelToViewPosition( modelPoint );
    } );

    // @private {function}
    this.collisionListener = this.addCollision.bind( this );
    collisionPoints.addItemAddedListener( this.collisionListener );
    collisionPoints.forEach( this.collisionListener );

    // Update our view on a model-view transform change.
    modelViewTransform.changeEmitter.addListener( this.reset.bind( this ) );
  }

  /**
   * Handles added collision points.
   * @private
   *
   * @param {Vector2} point
   */
  addCollision( point ) {
    point = this.modelViewTransform.modelToViewPosition( point );

    // If we are the first point, don't create a line
    if ( this.previousCollisionPoint ) {
      this.addChild( new Line( this.previousCollisionPoint, point, LINE_OPTIONS ) );
    }

    this.currentLine.p1 = this.previousCollisionPoint = point;
  }

  /**
   * Resets the path.
   * @public
   */
  reset() {
    this.previousCollisionPoint = null;
    this.children = [ this.currentLine ];
    this.currentLine.p1 = new Vector2( 0, 0 );
    this.collisionPoints.forEach( this.collisionListener );
  }
}

proportionPlayground.register( 'BilliardsPath', BilliardsPath );

export default BilliardsPath;