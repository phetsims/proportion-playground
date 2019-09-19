// Copyright 2016-2017, University of Colorado Boulder

/**
 * Displays a single instance of the repeating pattern for all visible necklaces.
 * @public
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Necklace = require( 'PROPORTION_PLAYGROUND/common/model/necklace/Necklace' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const PatternNode = require( 'PROPORTION_PLAYGROUND/common/view/necklace/PatternNode' );
  const Property = require( 'AXON/Property' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/common/ProportionPlaygroundConstants' );
  const Side = require( 'PROPORTION_PLAYGROUND/common/model/Side' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  const patternString = require( 'string!PROPORTION_PLAYGROUND/pattern' );

  /**
   * @constructor
   * @extends {Panel}
   *
   * @param {Necklace} leftNecklace
   * @param {Necklace} rightNecklace
   * @param {Object} options
   */
  function PatternPanel( leftNecklace, rightNecklace, options ) {
    const labelNode = new Text( patternString, {
      maxWidth: 100,
      font: ProportionPlaygroundConstants.CONTROL_FONT
    } );

    // Determine the maximum necklace dimensions
    const maxNecklace = new Necklace( 20, 19, new Property( true ), new Property( true ) );
    const maxPatternBounds = new PatternNode( maxNecklace ).bounds;
    maxPatternBounds.maxX += 2 * maxPatternBounds.width;
    maxPatternBounds.maxY += 5; // Some extra padding

    const patternContent = new Node();

    function handlePattern( necklace, side ) {
      const patternNode = new PatternNode( necklace, {
        x: side === Side.RIGHT ? 30 : 0
      } );
      let added = false;
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

    const alignBox = new AlignBox( patternContent, {
      yAlign: 'top',
      alignBounds: maxPatternBounds
    } );

    const content = new VBox( {
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
