// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable SplotchNode with its associated NumberPickers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var SceneRatioControl = require( 'PROPORTION_PLAYGROUND/common/view/SceneRatioControl' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  var PaintBalloonNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/PaintBalloonNode' );

  // Used as scratch vectors below
  var startVector = new Vector2();

  /**
   * @constructor
   *
   * @param {Splotch} splotch - the model
   * @param {Property.<PaintChoice>} paintChoiceProperty - Holds our current paint choice
   * @param {Property.<boolean>} revealProperty - indicates whether the billiards table should be shown
   * @param {number} initialBalloonSign - The sign indicating along the x axis where the initial balloon positions should be located.
   */
  function SplotchControl( splotch, paintChoiceProperty, revealProperty, initialBalloonSign ) {
    var self = this;

    SceneRatioControl.call( this, splotch, {
      leftPickerColors: PaintChoice.CHOICES.map( function( choice ) { return choice.leftColor; } ),
      rightPickerColors: PaintChoice.CHOICES.map( function( choice ) { return choice.rightColor; } ),
      paintChoiceProperty: paintChoiceProperty
    } );

    // @private
    this.splotchNode = new SplotchNode( splotch, paintChoiceProperty );
    this.addChild( this.splotchNode ); // TODO: how is this positioned?
    this.addBottomPickers();

    // @private {number}
    this.initialBalloonSign = initialBalloonSign;

    // @private {Array.<PaintBalloonNode>}
    this.balloonNodes = [];

    splotch.balloons.addItemAddedListener( function( balloon ) {
      var balloonNode = new PaintBalloonNode( balloon, paintChoiceProperty, new Vector2(), new Vector2() );
      self.addChild( balloonNode );
      self.balloonNodes.push( balloonNode );
    } );

    splotch.balloons.addItemRemovedListener( function( balloon ) {
      for ( var i = self.balloonNodes.length - 1; i >= 0; i-- ) {
        var balloonNode = self.balloonNodes[ i ];
        if ( balloonNode.paintBalloon === balloon ) {
          self.balloonNodes.splice( i, 1 );
          self.removeChild( balloonNode );
          balloonNode.dispose();
        }
      }
    } );
  }

  proportionPlayground.register( 'SplotchControl', SplotchControl );

  return inherit( SceneRatioControl, SplotchControl, {
    /**
     * Steps forward in time.
     * @public
     *
     * @param {number} dt - In seconds
     * @param {Bounds2} visibleBounds
     */
    step: function( dt, visibleBounds ) {
      if ( this.balloonNodes.length ) {
        visibleBounds = this.parentToLocalBounds( visibleBounds );

        var startLocation = startVector.setXY( visibleBounds.centerX + 0.55 * this.initialBalloonSign * visibleBounds.width,
                                               visibleBounds.bottom * 0.8 );
        var endLocation = this.splotchNode.center;
        for ( var i = 0; i < this.balloonNodes.length; i++ ) {
          this.balloonNodes[ i ].position( startLocation, endLocation );
        }
      }
    }
  } );
} );
