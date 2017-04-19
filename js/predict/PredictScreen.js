// Copyright 2016, University of Colorado Boulder

/**
 * The predict screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Splotch = require( 'PROPORTION_PLAYGROUND/common/model/paint/Splotch' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var predictString = require( 'string!PROPORTION_PLAYGROUND/predict' );

  /**
   * @constructor
   */
  function PredictScreen() {
    var homeScreenIconBounds = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds();

    var orangeSplotch = new Splotch( 30, 30, new Property( true ), new Property( true ) );
    var orangeSplotchNode = new SplotchNode( orangeSplotch, new Property( PaintChoice.RED_YELLOW ) );

    // Our splotch's "visual center" is not in the center of its bounds, so we need to shift the text slightly.
    var textOffset = new Vector2( 14, 14 );

    // Not translatable, see https://github.com/phetsims/proportion-playground/issues/18#issuecomment-276216535
    var homeScreenQuestionText = new Text( '? : ?', {
      center: orangeSplotchNode.center.plus( textOffset ),
      font: new PhetFont( 80 )
    } );

    // Not translatable, see https://github.com/phetsims/proportion-playground/issues/18#issuecomment-276216535
    var navigationBarQuestionText = new Text( '??', {
      center: orangeSplotchNode.center.plus( textOffset ),
      font: new PhetFont( 140 )
    } );

    Screen.call( this,
      function() { return new ProportionModel( true ); },
      function( model ) { return new ProportionScreenView( model ); }, {
      name: predictString,
      backgroundColorProperty: ProportionPlaygroundColorProfile.predictBackgroundProperty,
      homeScreenIcon: new Node( {
        children: [
          Rectangle.bounds( homeScreenIconBounds, {
            fill: ProportionPlaygroundColorProfile.predictBackgroundProperty
          } ),
          // Centered splotch with home-screen text
          new AlignBox( new Node( { children: [ orangeSplotchNode, homeScreenQuestionText ] } ), {
            alignBounds: homeScreenIconBounds
          } )
        ]
      } ),
      navigationBarIcon: new Node( {
        children: [
          Rectangle.bounds( homeScreenIconBounds, {
            fill: ProportionPlaygroundColorProfile.predictBackgroundProperty
          } ),
          // Centered splotch with nav-bar text
          new AlignBox( new Node( { children: [ orangeSplotchNode, navigationBarQuestionText ] } ), {
            alignBounds: homeScreenIconBounds
          } )
        ]
      } )
    } );
  }

  proportionPlayground.register( 'PredictScreen', PredictScreen );

  return inherit( Screen, PredictScreen );
} );
