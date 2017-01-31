// Copyright 2016, University of Colorado Boulder

/**
 * The model for the Billiards Scene (including both tables).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var BilliardsTable = require( 'PROPORTION_PLAYGROUND/common/model/billiards/BilliardsTable' );
  var Scene = require( 'PROPORTION_PLAYGROUND/common/model/Scene' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   */
  function BilliardsScene( predictMode ) {
    Scene.call( this, predictMode );

    // @public
    this.leftTable = new BilliardsTable( 5, 5, this.leftVisibleProperty, this.leftControlsVisibleProperty );
    this.rightTable = new BilliardsTable( 5, 5, this.rightVisibleProperty, this.rightControlsVisibleProperty );

    this.initializeRatios( this.leftTable, this.rightTable );
  }

  proportionPlayground.register( 'BilliardsScene', BilliardsScene );

  return inherit( Scene, BilliardsScene, {
    /**
     * Moves the balls which have been revealed.
     * @public
     * @override
     *
     * @param {number} dt
     */
    step: function( dt ) {
      Scene.prototype.step.call( dt );

      //TODO: can we handle visibility for each in a more general way?
      if ( this.revealProperty.value ) {
        this.leftTable.step( dt );
        if ( this.showBothProperty.value ) {
          this.rightTable.step( dt );
        }
      }
    }
  } );
} );
