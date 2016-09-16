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
  var BilliardsTableModel = require( 'PROPORTION_PLAYGROUND/explore/model/billiards/BilliardsTableModel' );
  var ExploreSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreSceneModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function BilliardsSceneModel( predictMode ) {
    var self = this;
    ExploreSceneModel.call( this, predictMode );

    // @public
    this.table1 = new BilliardsTableModel();
    this.table2 = new BilliardsTableModel();

    var changeProperties = [
      this.table1.widthProperty,
      this.table1.lengthProperty,
      this.table2.widthProperty,
      this.table2.lengthProperty
    ];
    predictMode && this.registerChangeProperties( changeProperties );

    // When the table is revealed, restart the balls.
    this.revealProperty.link( function( reveal ) {
      if ( reveal ) {
        self.table1.restartBall();
        self.table2.restartBall();
      }
    } );
  }

  proportionPlayground.register( 'BilliardsSceneModel', BilliardsSceneModel );

  return inherit( ExploreSceneModel, BilliardsSceneModel, {

    /**
     * Resets the scene model
     * @public
     */
    reset: function() {
      ExploreSceneModel.prototype.reset.call( this );
      this.table1.reset();
      this.table2.reset();
    },

    /**
     * Moves the balls which have been revealed.
     * @param dt
     * @public
     */
    step: function( dt ) {
      if ( this.reveal ) {
        this.table1.step( dt );
        if ( this.showBoth ) {
          this.table2.step( dt );
        }
      }
    }
  } );
} );