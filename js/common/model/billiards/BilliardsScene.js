// Copyright 2016-2020, University of Colorado Boulder

/**
 * The model for the Billiards Scene (including both tables).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import proportionPlayground from '../../../proportionPlayground.js';
import Scene from '../Scene.js';
import BilliardsTable from './BilliardsTable.js';

class BilliardsScene extends Scene {
  /**
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @param {Tandem} tandem
   */
  constructor( predictMode, tandem ) {
    assert && assert( tandem );

    super( predictMode, tandem );

    // @public
    this.leftTable = new BilliardsTable( tandem.createTandem( 'leftTable' ), {
      visibleProperty: this.leftVisibleProperty,
      controlsVisibleProperty: this.leftControlsVisibleProperty
    } );
    this.rightTable = new BilliardsTable( tandem.createTandem( 'rightTable' ), {
      visibleProperty: this.rightVisibleProperty,
      controlsVisibleProperty: this.rightControlsVisibleProperty
    } );

    this.initializeRatios( this.leftTable, this.rightTable );
  }

  /**
   * Moves the balls which have been revealed.
   * @public
   * @override
   *
   * @param {number} dt
   */
  step( dt ) {
    super.step( dt );

    if ( this.revealProperty.value ) {
      this.leftTable.step( dt );
      if ( this.showBothProperty.value || this.rightTable.hasStartedAnimating ) {
        this.rightTable.step( dt );
      }
    }
  }
}

proportionPlayground.register( 'BilliardsScene', BilliardsScene );

export default BilliardsScene;