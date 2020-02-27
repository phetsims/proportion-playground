// Copyright 2016-2019, University of Colorado Boulder

/**
 * The model for the Billiards Scene (including both tables).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import proportionPlayground from '../../../proportionPlayground.js';
import Scene from '../Scene.js';
import BilliardsTable from './BilliardsTable.js';

/**
 * @constructor
 * @extends {Scene}
 *
 * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
 */
function BilliardsScene( predictMode ) {
  Scene.call( this, predictMode );

  // @public
  this.leftTable = new BilliardsTable( {
    visibleProperty: this.leftVisibleProperty,
    controlsVisibleProperty: this.leftControlsVisibleProperty
  } );
  this.rightTable = new BilliardsTable( {
    visibleProperty: this.rightVisibleProperty,
    controlsVisibleProperty: this.rightControlsVisibleProperty
  } );

  this.initializeRatios( this.leftTable, this.rightTable );
}

proportionPlayground.register( 'BilliardsScene', BilliardsScene );

export default inherit( Scene, BilliardsScene, {
  /**
   * Moves the balls which have been revealed.
   * @public
   * @override
   *
   * @param {number} dt
   */
  step: function( dt ) {
    Scene.prototype.step.call( dt );

    if ( this.revealProperty.value ) {
      this.leftTable.step( dt );
      if ( this.showBothProperty.value || this.rightTable.hasStartedAnimating ) {
        this.rightTable.step( dt );
      }
    }
  }
} );