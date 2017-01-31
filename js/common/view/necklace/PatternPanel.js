// Copyright 2016, University of Colorado Boulder

/**
 * Displays a single instance of the repeating pattern for all visible necklaces.
 * @public
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  var PatternNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/PatternNode' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var Property = require( 'AXON/Property' );

  var patternString = require( 'string!PROPORTION_PLAYGROUND/pattern' );

  /**
   * @constructor
   *
   * @param {Necklace} leftNecklace
   * @param {Necklace} rightNecklace
   * @param {Object} options
   */
  function PatternPanel( leftNecklace, rightNecklace, options ) {
    var labelNode = new Text( patternString, {
      maxWidth: 100,
      font: new PhetFont( 20 )
    } );

    // Determine the maximum necklace dimensions
    var maxNecklace = new Necklace( 20, 19, new Property( true ), new Property( true ) );
    var maxPatternBounds = new PatternNode( maxNecklace ).bounds;
    maxPatternBounds.maxX += 2 * maxPatternBounds.width;

    var patternContent = new Node();

    function handlePattern( necklace, isLeft ) {
      var patternNode = null;
      necklace.visibleChangeEmitter.addListener( function() {
        if ( patternNode ) {
          patternContent.removeChild( patternNode );
          patternNode = null;
        }
        if ( necklace.visibleProperty.value ) {
          patternNode = new PatternNode( necklace );
          if ( !isLeft ) {
            patternNode.x = 30;
          }
          patternContent.addChild( patternNode );
        }
      } );
    }
    handlePattern( leftNecklace, true );
    handlePattern( rightNecklace, false );

    var alignBox = new AlignBox( patternContent, {
      yAlign: 'top',
      alignBounds: maxPatternBounds
    } );

    var content = new VBox( {
      spacing: 7,
      children: [
        labelNode,
        alignBox
      ]
    } );

    Panel.call( this, content, _.extend( {
      cornerRadius: 3,
      stroke: ProportionPlaygroundColorProfile.necklacePatternBorderProperty,
      xMargin: 10
    }, options ) );
  }

  proportionPlayground.register( 'PatternPanel', PatternPanel );

  return inherit( Panel, PatternPanel );
} );
