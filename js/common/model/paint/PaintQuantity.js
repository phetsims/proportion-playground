// Copyright 2016, University of Colorado Boulder

/**
 * Models the quantity of a specific color/choice of paint, that can be added (with balloons) and removed (with drips)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   * @constructor
   *
   * @param {number} initialCount - Initial quantity of the paint
   * @param {Function} createBalloon - function( callbackWhenHits() )
   * @param {Function} createDrip - function( amountToRemove: number, dripCallback( amount ) )
   */
  function PaintQuantity( initialCount, createBalloon, createDrip ) {
    // @private
    this.createBalloon = createBalloon;
    this.createDrip = createDrip;

    // @public {NumberProperty} - The real model value (ignoring balloons, drips, etc.), changes instantly on toggles.
    this.realCountProperty = new NumberProperty( initialCount );

    // @public {NumberProperty} - The model value that increases instantly when balloons hit. Can go negative.
    this.currentCountProperty = new NumberProperty( initialCount );

    // @public {NumberProperty} - The visual amount of paint for the meter and splotch.
    this.paintAreaProperty = new NumberProperty( initialCount );

    // @private {NumberProperty} - Pending drips that will occur when a balloon hit happens.
    this.pendingDripsProperty = new NumberProperty( 0 );

    this.realCountProperty.lazyLink( this.realCountChange.bind( this ) );
  }

  proportionPlayground.register( 'PaintQuantity', PaintQuantity );

  return inherit( Object, PaintQuantity, {
    //TODO: doc
    reset: function() {
      this.realCountProperty.reset();
      this.currentCountProperty.reset();
      this.paintAreaProperty.reset();
      this.pendingDripsProperty.reset();
    },

    // @private TODO
    realCountChange: function( newCount, oldCount ) {
      var delta = Math.abs( newCount - oldCount );
      if ( newCount > oldCount ) {
        this.createBalloon( this.addCurrent.bind( this, delta ) );
      }
      else {
        this.removeCurrent( delta );
      }
    },

    // TODO: doc
    removeArea: function( amount ) {
      this.paintAreaProperty.value -= amount;
    },

    addCurrent: function( count ) {
      var amountToDrip = Math.min( count, this.pendingDripsProperty.value );
      var amountToAdd = count - amountToDrip;
      this.paintAreaProperty.value += count;
      this.currentCountProperty.value += amountToAdd;
      this.pendingDripsProperty.value -= amountToDrip;
      if ( amountToDrip ) {
        this.createDrip( amountToDrip, this.removeArea.bind( this ) );
      }
    },

    removeCurrent: function( count ) {
      var amountToDrip = Math.min( count, this.currentCountProperty.value );
      var amountToQueue = count - amountToDrip;
      this.pendingDripsProperty.value += amountToQueue;
      this.currentCountProperty.value -= amountToDrip;
      if ( amountToDrip ) {
        this.createDrip( amountToDrip, this.removeArea.bind( this ) );
      }
    }
  } );
} );
