// Copyright 2016-2017, University of Colorado Boulder

/**
 * The model for a single paint splotch. Colors are combined in the view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var PaintBalloon = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintBalloon' );
  var PaintDrip = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintDrip' );
  var PaintQuantity = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintQuantity' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );
  var Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );

  /**
   * @constructor
   * @extends {SceneRatio}
   *
   * @param {number} initialLeftCount - Initial quantity of the left paint
   * @param {number} initialRightCount - Initial quantity of the right paint
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   */
  function Splotch( initialLeftCount, initialRightCount, visibleProperty, controlsVisibleProperty ) {
    var self = this;

    // @public {PaintQuantity} - For each side
    this.leftQuantity = createPaintQuantity( this, initialLeftCount, Side.LEFT );
    this.rightQuantity = createPaintQuantity( this, initialRightCount, Side.RIGHT );

    // @public {NumberProperty} - Amount of paint from the color choice on the left (after resulting balloons have landed)
    this.leftColorCountProperty = this.leftQuantity.realCountProperty;

    // @public {NumberProperty} - Amount of paint form the color choice on the right (after resulting balloons have landed)
    this.rightColorCountProperty = this.rightQuantity.realCountProperty;

    // @private {NumberProperty} - Amount of displayed paint (can increase after balloons hit). Can go negative.
    this.currentLeftColorProperty = this.leftQuantity.currentCountProperty;
    this.currentRightColorProperty = this.rightQuantity.currentCountProperty;

    // @public {Property.<number>} - Non-negative version of our internal count
    this.visibleLeftColorProperty = this.leftQuantity.paintAreaProperty;
    this.visibleRightColorProperty = this.rightQuantity.paintAreaProperty;

    // @public {ObservableArray.<PaintBalloon>}
    this.balloons = new ObservableArray();

    // @public {ObservableArray.<PaintDrip>}
    this.drips = new ObservableArray();

    SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
      this.leftColorCountProperty, ProportionPlaygroundConstants.PAINT_COUNT_RANGE,
      this.rightColorCountProperty, ProportionPlaygroundConstants.PAINT_COUNT_RANGE );

    // Clear balloons/drips in progress when visibility changes, see https://github.com/phetsims/proportion-playground/issues/100
    visibleProperty.lazyLink( function( visible ) {
      self.step( 10000 ); // Just step a really big number (but not infinity, since we rely on finite numbers)
    } );
  }

  proportionPlayground.register( 'Splotch', Splotch );

  inherit( SceneRatio, Splotch, {
    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt - Time to move forward in seconds
     */
    step: function( dt ) {
      // Step balloons in reverse order, since they can remove themselves
      for ( var i = this.balloons.length - 1; i >= 0; i-- ) {
        this.balloons.get( i ).step( dt );
      }

      for ( i = this.drips.length - 1; i >= 0; i-- ) {
        this.drips.get( i ).step( dt );
      }
    },

    /**
     * Resets the model
     * @public
     * @override
     */
    reset: function() {
      SceneRatio.prototype.reset.call( this );

      this.leftQuantity.reset();
      this.rightQuantity.reset();

      this.balloons.clear();
      this.drips.clear();

      // Additional reset needed, as balloons/drips can potentially change the quantity when removed.
      this.leftQuantity.reset();
      this.rightQuantity.reset();
    }
  } );

  /**
   * Creates a PaintQuantity given an initialCount / side.
   * @private
   *
   * @param {Splotch} splotch
   * @param {number} initialCount
   * @param {Side} side
   * @returns {PaintQuantity}
   */
  function createPaintQuantity( splotch, initialCount, side ) {
    return new PaintQuantity( initialCount, function createBalloon( hitCallback ) {
      splotch.balloons.push( new PaintBalloon( side, function( balloon ) {
        splotch.balloons.remove( balloon );
        hitCallback();
      } ) );
    }, function createDrip( amountToDrip, removeCallback ) {
      var visibleColorProperty = side === Side.LEFT ? splotch.visibleLeftColorProperty : splotch.visibleRightColorProperty;
      splotch.drips.push( new PaintDrip( side, function( drip ) {
        splotch.drips.remove( drip );
      }, amountToDrip, removeCallback, visibleColorProperty.value ) );
    } );
  }

  return Splotch;
} );
