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
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );

  /**
   * @constructor
   *
   * @param {number} initialCount - Initial quantity of the paint
   * @param {Function} createBalloon - function( callbackWhenHits )
   * @param {Function} createDrip - function()
   */
  function PaintQuantity( initialCount, createBalloon, createDrip ) {
    // @private
    this.createBalloon = createBalloon;
    this.createDrip = createDrip;

    // @public {NumberProperty} - The real model value (ignoring balloons, drips, etc.), changes instantly on toggles.
    this.realCountProperty = new NumberProperty( initialCount );

    // @public {NumberProperty} - The model value that increases instantly when balloons hit. Can go negative.
    this.currentCountProperty = new NumberProperty( initialCount );

    // @public {NumberProperty} - The target amount of visible paint (an integer, where the current paint amount should
    //                            animate towards.
    this.visibleCountProperty = new DerivedProperty( [ this.currentCountProperty ], function( count ) {
      return Math.max( 0, count );
    } );

    // @public {NumberProperty} - The visual amount of paint for the meter and splotch.
    this.paintAreaProperty = new NumberProperty( initialCount );

    // @private {NumberProperty} - Pending drips that will occur when a balloon hit happens.
    this.pendingDripsProperty = new NumberProperty( 0 );

    this.realCountProperty.lazyLink( this.realCountChange.bind( this ) );
  }

  proportionPlayground.register( 'PaintQuantity', PaintQuantity );

  return inherit( Object, PaintQuantity, {
    // @private TODO
    realCountChange: function( newCount, oldCount ) {
      var self = this;

      var delta = Math.abs( newCount - oldCount );
      if ( newCount > oldCount ) {
        this.createBalloon( function() {
          self.addCurrent( delta );
        } );
      }
      else {
        this.removeCurrent( delta );
      }
    },

    addCurrent: function( count ) {
      var amountToDrip = Math.min( count, this.pendingDripsProperty.value );
      var amountToAdd = count - amountToDrip;
      this.currentCountProperty.value += amountToAdd;
      this.pendingDripsProperty.value -= amountToDrip;
      if ( amountToDrip ) {
        this.createDrip();
      }
    },

    removeCurrent: function( count ) {
      var amountToDrip = Math.min( count, this.currentCountProperty.value );
      var amountToQueue = count - amountToDrip;
      this.pendingDripsProperty.value += amountToQueue;
      this.currentCountProperty.value -= amountToDrip;
      if ( amountToDrip ) {
        this.createDrip();
      }
    }
  } );
} );
