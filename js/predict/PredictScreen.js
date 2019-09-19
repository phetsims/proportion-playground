// Copyright 2016-2017, University of Colorado Boulder

/**
 * The predict screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PaintChoice = require( 'PROPORTION_PLAYGROUND/common/model/paint/PaintChoice' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Screen = require( 'JOIST/Screen' );
  const Splotch = require( 'PROPORTION_PLAYGROUND/common/model/paint/Splotch' );
  const SplotchNode = require( 'PROPORTION_PLAYGROUND/common/view/paint/SplotchNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const screenPredictString = require( 'string!PROPORTION_PLAYGROUND/screen.predict' );

  // Our splotch's "visual center" is not in the center of its bounds, so we need to shift the text slightly.
  const SCREEN_ICON_TEXT_OFFSET = new Vector2( 14, 14 );
  const HOME_SCREEN_ICON_BOUNDS = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds();

  /**
   * @constructor
   * @extends {Screen}
   */
  function PredictScreen() {

    // used to create screen icons
    const splotch = new Splotch( 20, 20, new Property( true ), new Property( true ) );
    const splotchNode = new SplotchNode( splotch, new Property( PaintChoice.RED_YELLOW ), {
      scale: SplotchNode.colorTotalToSplotchScale( 60 ) / SplotchNode.colorTotalToSplotchScale( 40 )
    } );

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
    const homeScreenQuestionText = new Text( '? : ?', {
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
    const navigationBarQuestionText = new Text( '??', {
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
