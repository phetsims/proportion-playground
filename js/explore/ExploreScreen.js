// Copyright 2016, University of Colorado Boulder

/**
 * The explore screen, including its model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/StaticNecklaceNode' );
  var BilliardsTable = require( 'PROPORTION_PLAYGROUND/common/model/billiards/BilliardsTable' );
  var BilliardsTableNode = require( 'PROPORTION_PLAYGROUND/common/view/billiards/BilliardsTableNode' );
  var ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var Property = require( 'AXON/Property' );
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var exploreString = require( 'string!PROPORTION_PLAYGROUND/explore' );

  /**
   * @constructor
   */
  function ExploreScreen() {

    var homeScreenIconBounds = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds( 0, 0 );

    // TODO: possibly immediate initializer?
    var billiardsTable = new BilliardsTable( new Property( true ), new Property( true ), true );
    billiardsTable.lengthProperty.value = 6;
    billiardsTable.widthProperty.value = 3;
    billiardsTable.step( Number.POSITIVE_INFINITY );

    var homeScreenIconContent = new HBox( {
      scale: 1.25,
      spacing: 70,
      children: [
        new VBox( {
          spacing: 10,
          children: [
            new StaticNecklaceNode( 6, 3, { scale: 1.5 } ),
            new Text( '6 : 3', {
              font: new PhetFont( 60 )
            } )
          ]
        } ),
        new BilliardsTableNode( billiardsTable, {
          fullSizeBounds: false,
          allowDragToResize: false,
          scale: 1.7
        } )
      ]
    } );

    var homeScreenIcon = new Node( {
      children: [
        Rectangle.bounds( homeScreenIconBounds, {
          fill: ProportionPlaygroundColorProfile.backgroundProperty
        } ),
        new AlignBox( homeScreenIconContent, {
          alignBounds: homeScreenIconBounds
        } )
      ]
    } );

    var navigationBarIcon = new Node( {
      children: [
        Rectangle.bounds( homeScreenIconBounds, {
          fill: ProportionPlaygroundColorProfile.backgroundProperty
        } ),
        new AlignBox( new StaticNecklaceNode( 6, 3, { scale: 3.5 } ), {
          alignBounds: homeScreenIconBounds
        } )
      ]
    } );

    var options = {
      name: exploreString,
      backgroundColorProperty: ProportionPlaygroundColorProfile.backgroundProperty,
      homeScreenIcon: homeScreenIcon,
      navigationBarIcon: navigationBarIcon
    };

    Screen.call( this,
      function() { return new ProportionModel( false ); },
      function( model ) { return new ProportionScreenView( model ); },
      options );
  }

  proportionPlayground.register( 'ExploreScreen', ExploreScreen );

  return inherit( Screen, ExploreScreen );
} );
