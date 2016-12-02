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
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function BilliardsScene( predictMode ) {
    var self = this;

    // @public
    this.table1 = new BilliardsTable();
    this.table2 = new BilliardsTable();

    // @public {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
    this.quantityProperties = this.table1.quantityProperties.concat( this.table2.quantityProperties );

    Scene.call( this, predictMode );

    // When the table is revealed, restart the balls.
    this.revealProperty.link( function( reveal ) {
      if ( reveal ) {
        self.table1.restartBall();
        self.table2.restartBall();
      }
    } );
  }

  proportionPlayground.register( 'BilliardsScene', BilliardsScene );

  return inherit( Scene, BilliardsScene, {

    /**
     * Resets the scene model
     * @public
     */
    reset: function() {
      Scene.prototype.reset.call( this );
      this.table1.reset();
      this.table2.reset();
    },

    /**
     * Moves the balls which have been revealed.
     * @param dt
     * @public
     */
    step: function( dt ) {
      if ( this.revealProperty.value ) {
        this.table1.step( dt );
        if ( this.showBothProperty.value ) {
          this.table2.step( dt );
        }
      }
    }
  } );
} );
