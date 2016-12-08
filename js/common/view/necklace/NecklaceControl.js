// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with NumberPickers to change the amount of each type of bead.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var NecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var RoundBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/RoundBeadNode' );
  var SquareBeadNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/SquareBeadNode' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );

  // constants
  var NUMBER_PICKER_OPTIONS = { scale: 2 };
  var PINK = ProportionPlaygroundConstants.BEADS_PINK;
  var BLUE = ProportionPlaygroundConstants.BEADS_BLUE;

  /**
   *
   * @param {Necklace} necklace - the model
   * @param {Property.<boolean>} revealProperty - true if the necklace should be shown.
   * @constructor
   */
  function NecklaceControl( necklace, revealProperty ) {

    /**
     * Auxiliary function that creates a NumberPicker for a given color
     * @param {Property.<number>} property - the number of times this color has been added to the model.
     * @param {Object} [options] - node options
     * @returns NumberPicker
     */
    var createNumberPicker = function( property, options ) {
      return new NumberPicker( property, new Property( necklace.beadCountRange ), _.extend( options, NUMBER_PICKER_OPTIONS ) );
    };

    // NumberPickers to choose the number of each type of bead
    var roundBeadNumberPicker = createNumberPicker( necklace.roundBeadCountProperty, { color: PINK } );
    var squareBeadNumberPicker = createNumberPicker( necklace.squareBeadCountProperty, { color: BLUE } );

    // The necklace itself
    var necklaceNode = new NecklaceNode( necklace );

    /**
     * Adds an icon to a numberPicker
     * @param {Node} icon - the icon to show above the NumberPicker
     * @param {NumberPicker} numberPicker - the NumberPicker to be shown below the icon
     * @returns {VBox}
     */
    var toVBox = function( icon, numberPicker ) {
      return new VBox( {
        spacing: 10,
        children: [ icon, numberPicker ]
      } );
    };

    // Super call
    Node.call( this, {
      children: [
        necklaceNode,
        new HBox( {
          spacing: 15,
          y: 420,
          centerX: 0, // position around the origin
          children: [
            toVBox( new RoundBeadNode(), roundBeadNumberPicker ),
            toVBox( new SquareBeadNode(), squareBeadNumberPicker )
          ]
        } )
      ]
    } );

    //TODO: common to each control?
    necklace.controlsVisibleProperty.linkAttribute( this, 'visible' );
  }

  proportionPlayground.register( 'NecklaceControl', NecklaceControl );

  return inherit( Node, NecklaceControl );
} );