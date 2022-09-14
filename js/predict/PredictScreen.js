// Copyright 2016-2022, University of Colorado Boulder

/**
 * The predict screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Vector2 from '../../../dot/js/Vector2.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { AlignBox, Node, Rectangle, Text } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import PaintChoice from '../common/model/paint/PaintChoice.js';
import Splotch from '../common/model/paint/Splotch.js';
import ProportionModel from '../common/model/ProportionModel.js';
import SplotchNode from '../common/view/paint/SplotchNode.js';
import ProportionPlaygroundColors from '../common/view/ProportionPlaygroundColors.js';
import ProportionScreenView from '../common/view/ProportionScreenView.js';
import proportionPlayground from '../proportionPlayground.js';
import ProportionPlaygroundStrings from '../ProportionPlaygroundStrings.js';

// Our splotch's "visual center" is not in the center of its bounds, so we need to shift the text slightly.
const SCREEN_ICON_TEXT_OFFSET = new Vector2( 14, 14 );
const HOME_SCREEN_ICON_BOUNDS = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds();

class PredictScreen extends Screen {
  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // used to create screen icons
    const splotch = new Splotch( 20, 20, new Property( true ), new Property( true ), Tandem.OPT_OUT );
    const splotchNode = new SplotchNode( splotch, new Property( PaintChoice.RED_YELLOW ), {
      scale: SplotchNode.colorTotalToSplotchScale( 60 ) / SplotchNode.colorTotalToSplotchScale( 40 )
    } );

    super(
      () => new ProportionModel( true, tandem.createTandem( 'model' ) ),
      model => new ProportionScreenView( model, tandem.createTandem( 'view' ) ), {
        name: ProportionPlaygroundStrings.screen.predictStringProperty,
        backgroundColorProperty: ProportionPlaygroundColors.predictBackgroundProperty,
        homeScreenIcon: new ScreenIcon( createHomeScreenIcon( splotchNode ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        navigationBarIcon: new ScreenIcon( createNavigationBarIcon( splotchNode ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        tandem: tandem
      }
    );
  }
}

// Creates the home screen icon.
function createHomeScreenIcon( splotchNode ) {

  // Not translatable, see https://github.com/phetsims/proportion-playground/issues/18#issuecomment-276216535
  const homeScreenQuestionText = new Text( '? : ?', {
    center: splotchNode.center.plus( SCREEN_ICON_TEXT_OFFSET ),
    font: new PhetFont( 80 )
  } );

  return new Node( {
    children: [
      Rectangle.bounds( HOME_SCREEN_ICON_BOUNDS, {
        fill: ProportionPlaygroundColors.predictBackgroundProperty
      } ),
      // Centered splotch with home-screen text
      new AlignBox( new Node( { children: [ splotchNode, homeScreenQuestionText ] } ), {
        alignBounds: HOME_SCREEN_ICON_BOUNDS
      } )
    ]
  } );
}

// Creates the navigation bar icon
function createNavigationBarIcon( splotchNode ) {

  // Not translatable, see https://github.com/phetsims/proportion-playground/issues/18#issuecomment-276216535
  const navigationBarQuestionText = new Text( '??', {
    center: splotchNode.center.plus( SCREEN_ICON_TEXT_OFFSET ),
    font: new PhetFont( 140 )
  } );

  return new Node( {
    children: [
      Rectangle.bounds( HOME_SCREEN_ICON_BOUNDS, {
        fill: ProportionPlaygroundColors.predictBackgroundProperty
      } ),
      // Centered splotch with nav-bar text
      new AlignBox( new Node( { children: [ splotchNode, navigationBarQuestionText ] } ), {
        alignBounds: HOME_SCREEN_ICON_BOUNDS
      } )
    ]
  } );
}

proportionPlayground.register( 'PredictScreen', PredictScreen );
export default PredictScreen;