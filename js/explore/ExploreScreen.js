// Copyright 2016-2019, University of Colorado Boulder

/**
 * The explore screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const BilliardsTable = require( 'PROPORTION_PLAYGROUND/common/model/billiards/BilliardsTable' );
  const BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NecklaceGraphicNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceGraphicNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Screen = require( 'JOIST/Screen' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const screenExploreString = require( 'string!PROPORTION_PLAYGROUND/screen.explore' );

  // constants
  const HOME_SCREEN_ICON_BOUNDS = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds();

  /**
   * @constructor
   * @extends {Screen}
   */
  function ExploreScreen() {

    Screen.call( this,
      function() { return new ProportionModel( false ); },
      function( model ) { return new ProportionScreenView( model ); }, {
        name: screenExploreString,
        backgroundColorProperty: ProportionPlaygroundColorProfile.exploreBackgroundProperty,
        homeScreenIcon: createHomeScreenIcon(),
        navigationBarIcon: createNavigationBarIcon()
      } );
  }

  proportionPlayground.register( 'ExploreScreen', ExploreScreen );

  // Creates the home screen icon.
  var createHomeScreenIcon = function() {

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
  };

  // Creates the navigation bar icon.
  var createNavigationBarIcon = function() {
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
  };

  return inherit( Screen, ExploreScreen );
} );
