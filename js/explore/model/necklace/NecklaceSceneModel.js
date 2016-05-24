// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NecklaceModel = require( 'PROPORTION_PLAYGROUND/explore/model/necklace/NecklaceModel' );
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function NecklaceSceneModel( predictMode ) {
    var necklaceSceneModel = this;
    PropertySet.call( this, {
      showBothNecklaces: false,
      reveal: !predictMode // if the answer is being shown // TODO: factor out from other scene models
    } );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.showBothNecklacesProperty = this.showBothNecklacesProperty || null;
    this.revealProperty = this.revealProperty || null;

    this.necklace1Model = new NecklaceModel();
    this.necklace2Model = new NecklaceModel();

    // In the predict screen, when one of the spinner is changed, hide the representations again.
    var hide = function() {
      if ( predictMode ) {
        necklaceSceneModel.reveal = false;
      }
    };
    this.necklace1Model.roundBeadCountProperty.link( hide );
    this.necklace1Model.squareBeadCountProperty.link( hide );
    this.necklace2Model.roundBeadCountProperty.link( hide );
    this.necklace2Model.squareBeadCountProperty.link( hide );
  }

  proportionPlayground.register( 'NecklaceSceneModel', NecklaceSceneModel );

  return inherit( PropertySet, NecklaceSceneModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.necklace1Model.reset();
      this.necklace2Model.reset();
    }
  } );
} );