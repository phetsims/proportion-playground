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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Range = require( 'DOT/Range' );
  var SceneRatio = require( 'PROPORTION_PLAYGROUND/common/model/SceneRatio' );
  var PaintBalloon = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintBalloon' );

  /**
   * @constructor
   *
   * @param {Property.<boolean>} visibleProperty - Whether our visual representation is visible
   * @param {Property.<boolean>} controlsVisibleProperty - Whether our controls are visible
   */
  function Splotch( visibleProperty, controlsVisibleProperty ) {
    var self = this;

    // @public {NumberProperty} - Amount of paint from the color choice on the left (after resulting balloons have landed)
    //TODO: remove count from the name?
    this.leftColorCountProperty = new NumberProperty( 0 );

    // @public {NumberProperty} - Amount of paint form the color choice on the right (after resulting balloons have landed)
    this.rightColorCountProperty = new NumberProperty( 0 );

    // @private {NumberProperty} - Amount of displayed paint (can increase after balloons hit). Can go negative.
    this.currentLeftColorProperty = new NumberProperty( 0 );
    this.currentRightColorProperty = new NumberProperty( 0 );

    // @public {Property.<number>} - Non-negative version of our internal count
    this.visibleLeftColorProperty = new DerivedProperty( [ this.currentLeftColorProperty ], function( count ) { return Math.max( 0, count ); } );
    this.visibleRightColorProperty = new DerivedProperty( [ this.currentRightColorProperty ], function( count ) { return Math.max( 0, count ); } );

    // @public {ObservableArray.<PaintBalloon>}
    this.balloons = new ObservableArray();

    // @public (read-only) the range for colors
    //TODO: do we need this outside of the SceneRatio call?
    this.colorCountRange = new Range( 0, 20 );

    SceneRatio.call( this, visibleProperty, controlsVisibleProperty,
                     this.leftColorCountProperty, this.colorCountRange,
                     this.rightColorCountProperty, this.colorCountRange );

    function linkBalloonCreation( realCountProperty, currentCountProperty, isLeft ) {
      realCountProperty.lazyLink( function( newValue, oldValue ) {
        var delta = Math.abs( newValue - oldValue );
        if ( newValue > oldValue ) {
          self.balloons.push( new PaintBalloon( isLeft, function( balloon ) {
            self.balloons.remove( balloon );
            currentCountProperty.value += delta;
          } ) );
        }
        else {
          // immediately remove
          currentCountProperty.value -= delta;
        }
      } );
    }

    linkBalloonCreation( this.leftColorCountProperty, this.currentLeftColorProperty, true );
    linkBalloonCreation( this.rightColorCountProperty, this.currentRightColorProperty, false );
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
      //TODO: move cap to main model entry point
      dt = Math.min( dt, 0.25 );

      // Step balloons in reverse order, since they can remove themselves
      for ( var i = this.balloons.length - 1; i >= 0; i-- ) {
        this.balloons.get( i ).step( dt );
      }
    },

    /**
     * Resets the model
     * @override
     */
    reset: function() {
      SceneRatio.prototype.reset.call( this );

      this.balloons.clear();

      this.currentLeftColorProperty.reset();
      this.currentRightColorProperty.reset();
    }
  } );
} );
