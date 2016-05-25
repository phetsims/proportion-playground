// Copyright 2016, University of Colorado Boulder

/**
 * TODO:
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var BilliardsTableModel = require( 'PROPORTION_PLAYGROUND/explore/model/billiards/BilliardsTableModel' );
  var ExploreSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreSceneModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  // TODO: Somewhat duplicated with other scene models, perhaps factor out a parent class
  function BilliardsSceneModel( predictMode ) {
    ExploreSceneModel.call( this, predictMode, { showBothTables: false } );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.showBothTablesProperty = this.showBothTablesProperty || null;

    this.table1 = new BilliardsTableModel();
    this.table2 = new BilliardsTableModel();

    this.registerChangeProperties( [
      this.table1.widthProperty,
      this.table1.lengthProperty,
      this.table2.widthProperty,
      this.table2.lengthProperty
    ] );
  }

  proportionPlayground.register( 'BilliardsSceneModel', BilliardsSceneModel );

  return inherit( ExploreSceneModel, BilliardsSceneModel, {
    reset: function() {
      ExploreSceneModel.prototype.reset.call( this );
      this.table1.reset();
      this.table2.reset();
    },
    step: function( dt ) {
      if ( this.reveal ) {
        this.table1.step( dt );
        if ( this.showBothTables ) {
          this.table2.step( dt );
        }
      }
    }
  } );
} );