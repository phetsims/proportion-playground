// Copyright 2016, University of Colorado Boulder

/**
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
    var billiardsSceneModel = this;
    ExploreSceneModel.call( this, predictMode );

    this.table1 = new BilliardsTableModel();
    this.table2 = new BilliardsTableModel();

    var changeProperties = [
      this.table1.widthProperty,
      this.table1.lengthProperty,
      this.table2.widthProperty,
      this.table2.lengthProperty
    ];
    predictMode && this.registerChangeProperties( changeProperties );

    if ( predictMode ) {
      var restartBall = function() {
        billiardsSceneModel.table1.restartBall();
        billiardsSceneModel.table2.restartBall();
      };

      // TODO: perhaps simpler to listen for revealProperty change?
      for ( var i = 0; i < changeProperties.length; i++ ) {
        changeProperties[ i ].link( restartBall );
      }
    }
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
        if ( this.showBoth ) {
          this.table2.step( dt );
        }
      }
    }
  } );
} );