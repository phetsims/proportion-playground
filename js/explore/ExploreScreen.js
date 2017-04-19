// Copyright 2016, University of Colorado Boulder

/**
 * The explore screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var BilliardsTable = require( 'PROPORTION_PLAYGROUND/common/model/billiards/BilliardsTable' );
  var BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NecklaceGraphicNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/NecklaceGraphicNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var exploreString = require( 'string!PROPORTION_PLAYGROUND/explore' );

  /**
   * @constructor
   */
  function ExploreScreen() {

    var homeScreenIconBounds = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds();

    var billiardsTable = new BilliardsTable( 6, 3, new Property( true ), new Property( true ), true );

    // Step all the way through the animation
    billiardsTable.step( Number.POSITIVE_INFINITY );

    var homeScreenIconContent = new HBox( {
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

    Screen.call( this,
      function() { return new ProportionModel( false ); },
      function( model ) { return new ProportionScreenView( model ); }, {
      name: exploreString,
      backgroundColorProperty: ProportionPlaygroundColorProfile.exploreBackgroundProperty,
      homeScreenIcon: new Node( {
        children: [
          Rectangle.bounds( homeScreenIconBounds, {
            fill: ProportionPlaygroundColorProfile.exploreBackgroundProperty
          } ),
          new AlignBox( homeScreenIconContent, {
            alignBounds: homeScreenIconBounds
          } )
        ]
      } ),
      navigationBarIcon: new Node( {
        children: [
          Rectangle.bounds( homeScreenIconBounds, {
            fill: ProportionPlaygroundColorProfile.exploreBackgroundProperty
          } ),
          // Just a simple necklace for the nav-bar
          new AlignBox( NecklaceGraphicNode.createStaticNecklace( 6, 3, { scale: 3.5, pickable: false } ), {
            alignBounds: homeScreenIconBounds
          } )
        ]
      } )
    } );
  }

  proportionPlayground.register( 'ExploreScreen', ExploreScreen );

  return inherit( Screen, ExploreScreen );
} );
