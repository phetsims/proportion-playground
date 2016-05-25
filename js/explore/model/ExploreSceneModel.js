// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function ExploreSceneModel( predictMode, otherProperties ) {
    this.predictMode = predictMode;

    PropertySet.call( this, _.extend( {
      reveal: !predictMode // {boolean} - true if the answer is being shown
    }, otherProperties ) );

    // These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.revealProperty = this.revealProperty || null;
  }

  proportionPlayground.register( 'ExploreSceneModel', ExploreSceneModel );

  return inherit( PropertySet, ExploreSceneModel, {
    registerChangeProperties: function( properties ) {
      assert && assert( this.predictMode, 'only register change properties for predict mode' );
      var exploreSceneModel = this;

      // In the predict screen, when one of the spinner is changed, hide the representations again.
      var hide = function() {
        exploreSceneModel.reveal = false;
      };
      for ( var i = 0; i < properties.length; i++ ) {
        properties[ i ].link( hide );
      }
    },
    reset: function() {
      PropertySet.prototype.reset.call( this );
    }
  } );
} );