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
    this.leftTable = new BilliardsTable();
    this.rightTable = new BilliardsTable();

    // @public {Array.<NumberProperty>} - Properties that indicate a numerator or denominator in our ratio
    this.quantityProperties = this.leftTable.quantityProperties.concat( this.rightTable.quantityProperties );

    Scene.call( this, predictMode );

    // When the table is revealed, restart the balls.
    this.revealProperty.link( function( reveal ) {
      if ( reveal ) {
        self.leftTable.restartBall();
        self.rightTable.restartBall();
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

      this.leftTable.reset();
      this.rightTable.reset();
    },

    /**
     * Moves the balls which have been revealed.
     * @public
     *
     * @param {number} dt
     */
    step: function( dt ) {
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
