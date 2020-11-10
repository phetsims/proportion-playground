// Copyright 2016-2020, University of Colorado Boulder

/**
 * The explore screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import AlignBox from '../../../scenery/js/nodes/AlignBox.js';
import HBox from '../../../scenery/js/nodes/HBox.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VBox from '../../../scenery/js/nodes/VBox.js';
import ProportionModel from '../common/model/ProportionModel.js';
import BilliardsTable from '../common/model/billiards/BilliardsTable.js';
import ProportionPlaygroundColorProfile from '../common/view/ProportionPlaygroundColorProfile.js';
import ProportionScreenView from '../common/view/ProportionScreenView.js';
import BilliardsTableNode from '../common/view/billiards/BilliardsTableNode.js';
import NecklaceGraphicNode from '../common/view/necklace/NecklaceGraphicNode.js';
import proportionPlayground from '../proportionPlayground.js';
import proportionPlaygroundStrings from '../proportionPlaygroundStrings.js';

// constants
const HOME_SCREEN_ICON_BOUNDS = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds();

class ExploreScreen extends Screen {
  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    super(
      () => new ProportionModel( false, tandem.createTandem( 'model' ) ),
      model => new ProportionScreenView( model ),
      {
        name: proportionPlaygroundStrings.screen.explore,
        backgroundColorProperty: ProportionPlaygroundColorProfile.exploreBackgroundProperty,
        homeScreenIcon: new ScreenIcon( createHomeScreenIcon(), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        navigationBarIcon: new ScreenIcon( createNavigationBarIcon(), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        tandem: tandem
      }
    );
  }
}

// Creates the home screen icon.
function createHomeScreenIcon() {

  // Step all the way through the animation of a billiards table
  const billiardsTable = new BilliardsTable( {
    initialLength: 6,
    initialWidth: 3
  } );
  billiardsTable.step( Number.POSITIVE_INFINITY );

  const homeScreenIconContent = new HBox( {
    scale: 1.25,
    spacing: 70,
    children: [
      // Necklace on the left
      new VBox( {
        spacing: 10,
        children: [
          // Necklace on the top
          NecklaceGraphicNode.createStaticNecklace( 6, 3, { scale: 1.5, pickable: false } ),
          // Ratio on the bottom
          new Text( '6 : 3', {
            font: new PhetFont( 60 )
          } )
        ]
      } ),
      // Billiards table on the right
      new BilliardsTableNode( billiardsTable, {
        fullSizeBounds: false, // don't take up 20x20 bounds
        allowDragToResize: false, // don't let the user drag it (or act like it's draggable)
        scale: 1.7
      } )
    ]
  } );

  return new Node( {
    children: [
      Rectangle.bounds( HOME_SCREEN_ICON_BOUNDS, {
        fill: ProportionPlaygroundColorProfile.exploreBackgroundProperty
      } ),
      new AlignBox( homeScreenIconContent, {
        alignBounds: HOME_SCREEN_ICON_BOUNDS
      } )
    ]
  } );
}

// Creates the navigation bar icon.
function createNavigationBarIcon() {
  return new Node( {
    children: [
      Rectangle.bounds( HOME_SCREEN_ICON_BOUNDS, {
        fill: ProportionPlaygroundColorProfile.exploreBackgroundProperty
      } ),
      // Just a simple necklace for the nav-bar
      new AlignBox( NecklaceGraphicNode.createStaticNecklace( 6, 3, { scale: 3.5, pickable: false } ), {
        alignBounds: HOME_SCREEN_ICON_BOUNDS
      } )
    ]
  } );
}

proportionPlayground.register( 'ExploreScreen', ExploreScreen );
export default ExploreScreen;