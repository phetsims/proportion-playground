// Copyright 2016-2017, University of Colorado Boulder

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
  var screenPredictString = require( 'string!PROPORTION_PLAYGROUND/screen.predict' );

  // Our splotch's "visual center" is not in the center of its bounds, so we need to shift the text slightly.
  var SCREEN_ICON_TEXT_OFFSET = new Vector2( 14, 14 );
  var HOME_SCREEN_ICON_BOUNDS = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds();

  /**
   * @constructor
   * @extends {Screen}
   */
  function PredictScreen() {

    // used to create screen icons
    var splotch = new Splotch( 30, 30, new Property( true ), new Property( true ) );
    var splotchNode = new SplotchNode( splotch, new Property( PaintChoice.RED_YELLOW ) );

    Screen.call( this,
      function() { return new ProportionModel( true ); },
      function( model ) { return new ProportionScreenView( model ); }, {
        name: screenPredictString,
        backgroundColorProperty: ProportionPlaygroundColorProfile.predictBackgroundProperty,
        homeScreenIcon: createHomeScreenIcon( splotchNode ),
        navigationBarIcon: createNavigationBarIcon( splotchNode )
      } );
  }

  proportionPlayground.register( 'PredictScreen', PredictScreen );

  // Creates the home screen icon.
  var createHomeScreenIcon = function( splotchNode ) {

    // Not translatable, see https://github.com/phetsims/proportion-playground/issues/18#issuecomment-276216535
    var homeScreenQuestionText = new Text( '? : ?', {
      center: splotchNode.center.plus( SCREEN_ICON_TEXT_OFFSET ),
      font: new PhetFont( 80 )
    } );

    return new Node( {
      children: [
        Rectangle.bounds( HOME_SCREEN_ICON_BOUNDS, {
          fill: ProportionPlaygroundColorProfile.predictBackgroundProperty
        } ),
        // Centered splotch with home-screen text
        new AlignBox( new Node( { children: [ splotchNode, homeScreenQuestionText ] } ), {
          alignBounds: HOME_SCREEN_ICON_BOUNDS
        } )
      ]
    } );
  };

  // Creates the navigation bar icon
  var createNavigationBarIcon = function( splotchNode ) {

    // Not translatable, see https://github.com/phetsims/proportion-playground/issues/18#issuecomment-276216535
    var navigationBarQuestionText = new Text( '??', {
      center: splotchNode.center.plus( SCREEN_ICON_TEXT_OFFSET ),
      font: new PhetFont( 140 )
    } );

    return new Node( {
      children: [
        Rectangle.bounds( HOME_SCREEN_ICON_BOUNDS, {
          fill: ProportionPlaygroundColorProfile.predictBackgroundProperty
        } ),
        // Centered splotch with nav-bar text
        new AlignBox( new Node( { children: [ splotchNode, navigationBarQuestionText ] } ), {
          alignBounds: HOME_SCREEN_ICON_BOUNDS
        } )
      ]
    } );
  };

  return inherit( Screen, PredictScreen );
} );
