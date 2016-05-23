// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var AppleGroupModel = require( 'PROPORTION_PLAYGROUND/explore/model/apples/AppleGroupModel' );
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  function AppleSceneModel() {
    PropertySet.call( this, { showBothAppleGroups: false } );

    //TODO: Delete these lines which are to temporarily improve code highlighting and navigation in IDEA
    this.showBothAppleGroupsProperty = this.showBothAppleGroupsProperty || null;

    this.redAppleGroup = new AppleGroupModel();
    this.greenAppleGroup = new AppleGroupModel();
  }

  proportionPlayground.register( 'AppleSceneModel', AppleSceneModel );

  return inherit( PropertySet, AppleSceneModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.necklace1Model.reset();
      this.necklace2Model.reset();
    }
  } );
} );