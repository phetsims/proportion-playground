// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with its controls.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/SplotchNode' );
  var ColorMap = require( 'PROPORTION_PLAYGROUND/explore/view/paint/ColorMap' );

  function ControllableSplotchNode( splotchModel, grayscaleProperty, revealProperty ) {
    var numberPickerOptions = { scale: 2 };
    var color1CountPicker = new NumberPicker( splotchModel.color1CountProperty, new Property( splotchModel.colorCountRange ), _.extend( {
      color: ColorMap.getColor( 0 )
    }, numberPickerOptions ) );
    var color2CountPicker = new NumberPicker( splotchModel.color2CountProperty, new Property( splotchModel.colorCountRange ), _.extend( {
      color: ColorMap.getColor( 1 )
    }, numberPickerOptions ) );

    // TODO: Black/white spinners for black/white mode

    // Wrap in a node so the visible flags don't collide
    var splotchNode = new Node( { children: [ new SplotchNode( splotchModel.color1CountProperty, splotchModel.color2CountProperty, grayscaleProperty ) ] } );
    revealProperty.linkAttribute( splotchNode, 'visible' );

    Node.call( this, {
      children: [
        splotchNode,
        new HBox( {
          spacing: 10,
          y: 450,
          centerX: 0, // position around the origin
          children: [
            color1CountPicker,
            color2CountPicker
          ]
        } )
      ]
    } );
  }

  proportionPlayground.register( 'ControllableSplotchNode', ControllableSplotchNode );

  return inherit( Node, ControllableSplotchNode, {} );
} );