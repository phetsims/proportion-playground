// Copyright 2016, University of Colorado Boulder

/**
 * The predict screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  var Splotch = require( 'PROPORTION_PLAYGROUND/common/model/paint/Splotch' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Property = require( 'AXON/Property' );
  var Color = require( 'SCENERY/util/Color' );
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // strings
  var predictString = require( 'string!PROPORTION_PLAYGROUND/predict' );

  /**
   * @constructor
   */
  function PredictScreen() {

    var homeScreenIconBounds = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds( 0, 0 );
    var orangeSplotch = new Splotch( 30, 30, new Property( true ), new Property( true ) );
    var orangeSplotchNode = new SplotchNode( orangeSplotch, new Property( PaintChoice.RED_YELLOW ) );
    var questionRatioText = new Text( '? : ?', {
      center: orangeSplotchNode.center.plusXY( 14, 14 ),
      fontSize: 80,
    } );
    var questionText = new Text( '??', {
      center: orangeSplotchNode.center.plusXY( 14, 14 ),
      fontSize: 140,
    } );

    var homeScreenIcon = new Node( {
      children: [
        Rectangle.bounds( homeScreenIconBounds, {
          fill: ProportionPlaygroundConstants.SCREEN_BACKGROUND_COLOR
        } ),
        new AlignBox( new Node( { children: [ orangeSplotchNode, questionRatioText ] } ), {
          alignBounds: homeScreenIconBounds
        } )
      ]
    } );

    var navigationBarIcon = new Node( {
      children: [
        Rectangle.bounds( homeScreenIconBounds, {
          fill: ProportionPlaygroundConstants.SCREEN_BACKGROUND_COLOR
        } ),
        new AlignBox( new Node( { children: [ orangeSplotchNode, questionText ] } ), {
          alignBounds: homeScreenIconBounds
        } )
      ]
    } );

    var options = {
      name: predictString,
      backgroundColorProperty: new Property( Color.toColor( ProportionPlaygroundConstants.SCREEN_BACKGROUND_COLOR ) ),
      homeScreenIcon: homeScreenIcon,
      navigationBarIcon: navigationBarIcon
    };

    Screen.call( this,
      function() { return new ProportionModel( true ); },
      function( model ) { return new ProportionScreenView( model ); },
      options );
  }

  proportionPlayground.register( 'PredictScreen', PredictScreen );

  return inherit( Screen, PredictScreen );
} );
