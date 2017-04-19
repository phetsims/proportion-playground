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
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PatternNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/PatternNode' );
  var Property = require( 'AXON/Property' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  var patternString = require( 'string!PROPORTION_PLAYGROUND/pattern' );

  /**
   * @constructor
   * @extends {Panel}
   *
   * @param {Necklace} leftNecklace
   * @param {Necklace} rightNecklace
   * @param {Object} options
   */
  function PatternPanel( leftNecklace, rightNecklace, options ) {
    var labelNode = new Text( patternString, {
      maxWidth: 100,
      font: ProportionPlaygroundConstants.CONTROL_FONT
    } );

    // Determine the maximum necklace dimensions
    var maxNecklace = new Necklace( 20, 19, new Property( true ), new Property( true ) );
    var maxPatternBounds = new PatternNode( maxNecklace ).bounds;
    maxPatternBounds.maxX += 2 * maxPatternBounds.width;
    maxPatternBounds.maxY += 5; // Some extra padding

    var patternContent = new Node();

    function handlePattern( necklace, side ) {
      var patternNode = new PatternNode( necklace, {
        x: side === Side.RIGHT ? 30 : 0
      } );
      var added = false;
      necklace.visibleProperty.link( function( visible ) { // No problem to leak, this is done twice
        if ( added && !visible ) {
          patternContent.removeChild( patternNode );
          added = false;
        }
        else if ( !added && visible ) {
          patternContent.addChild( patternNode );
          added = true;
        }
      } );
    }
    handlePattern( leftNecklace, Side.LEFT );
    handlePattern( rightNecklace, Side.RIGHT );

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
