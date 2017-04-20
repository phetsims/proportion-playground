// Copyright 2016, University of Colorado Boulder

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
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
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

    //TODO: refactor, doc -- we can isolate almost everything, with side and getVisibleColor?
    this.leftQuantity = new PaintQuantity( initialLeftCount, function createBalloon( hitCallback ) {
      self.balloons.push( new PaintBalloon( Side.LEFT, function( balloon ) {
        self.balloons.remove( balloon );
        hitCallback();
      } ) );
    }, function createDrip( amountToDrip, removeCallback ) {
      self.drips.push( new PaintDrip( Side.LEFT, function( drip ) {
        self.drips.remove( drip );
      }, amountToDrip, removeCallback, self.visibleLeftColorProperty.value ) );
    } );
    this.rightQuantity = new PaintQuantity( initialRightCount, function createBalloon( hitCallback ) {
      self.balloons.push( new PaintBalloon( Side.RIGHT, function( balloon ) {
        self.balloons.remove( balloon );
        hitCallback();
      } ) );
    }, function createDrip( amountToDrip, removeCallback ) {
      self.drips.push( new PaintDrip( Side.RIGHT, function( drip ) {
        self.drips.remove( drip );
      }, amountToDrip, removeCallback, self.visibleRightColorProperty.value ) );
    } );

    // @public {NumberProperty} - Amount of paint from the color choice on the left (after resulting balloons have landed)
    //TODO: remove count from the name?
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
  }

  proportionPlayground.register( 'Splotch', Splotch );

  return inherit( SceneRatio, Splotch, {
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
     * @override
     */
    reset: function() {
      SceneRatio.prototype.reset.call( this );

      this.leftQuantity.reset();
      this.rightQuantity.reset();

      this.balloons.clear();
      this.drips.clear();

      //TODO: necessary for drip removal?
      this.leftQuantity.reset();
      this.rightQuantity.reset();
    }
  } );
} );
