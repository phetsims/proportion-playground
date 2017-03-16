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
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var ProportionModel = require( 'PROPORTION_PLAYGROUND/common/model/ProportionModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionScreenView = require( 'PROPORTION_PLAYGROUND/common/view/ProportionScreenView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/StaticNecklaceNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var exploreString = require( 'string!PROPORTION_PLAYGROUND/explore' );

  /**
   * @constructor
   */
  function ExploreScreen() {

    var homeScreenIconBounds = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.toBounds( 0, 0 );

    var billiardsTable = new BilliardsTable( 6, 3, new Property( true ), new Property( true ), true );
    billiardsTable.step( Number.POSITIVE_INFINITY ); // Steps all the way through the animation

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
          fullSizeBounds: false, // don't take up 20x20 bounds
          allowDragToResize: false, // don't let the user drag it (or act like it's draggable)
          scale: 1.7
        } )
      ]
    } );

    var options = {
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
          new AlignBox( new StaticNecklaceNode( 6, 3, { scale: 3.5 } ), {
            alignBounds: homeScreenIconBounds
          } )
        ]
      } )
    };

    Screen.call( this,
      function() { return new ProportionModel( false ); },
      function( model ) { return new ProportionScreenView( model ); },
      options );
  }

  proportionPlayground.register( 'ExploreScreen', ExploreScreen );

  return inherit( Screen, ExploreScreen );
} );
