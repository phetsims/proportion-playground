// Copyright 2016-2022, University of Colorado Boulder

/**
 * Displays a single instance of the repeating pattern for all visible necklaces.
 * @public
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Property from '../../../../../axon/js/Property.js';
import merge from '../../../../../phet-core/js/merge.js';
import { AlignBox, Node, Text, VBox } from '../../../../../scenery/js/imports.js';
import Panel from '../../../../../sun/js/Panel.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundStrings from '../../../ProportionPlaygroundStrings.js';
import Necklace from '../../model/necklace/Necklace.js';
import Side from '../../model/Side.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import ProportionPlaygroundColors from '../ProportionPlaygroundColors.js';
import PatternNode from './PatternNode.js';

const patternString = ProportionPlaygroundStrings.pattern;

class PatternPanel extends Panel {
  /**
   * @param {Necklace} leftNecklace
   * @param {Necklace} rightNecklace
   * @param {Object} [options]
   */
  constructor( leftNecklace, rightNecklace, options ) {
    const labelNode = new Text( patternString, {
      maxWidth: 100,
      font: ProportionPlaygroundConstants.CONTROL_FONT
    } );

    // Determine the maximum necklace dimensions
    const maxNecklace = new Necklace( 20, 19, new Property( true ), new Property( true ), Tandem.OPT_OUT );
    const maxPatternBounds = new PatternNode( maxNecklace ).bounds;
    maxPatternBounds.maxX += 2 * maxPatternBounds.width;
    maxPatternBounds.maxY += 5; // Some extra padding

    const patternContent = new Node();

    function handlePattern( necklace, side ) {
      const patternNode = new PatternNode( necklace, {
        x: side === Side.RIGHT ? 30 : 0
      } );
      let added = false;
      necklace.visibleProperty.link( visible => { // No problem to leak, this is done twice
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

    super( content, merge( {
      cornerRadius: 3,
      stroke: ProportionPlaygroundColors.necklacePatternBorderProperty,
      xMargin: 10
    }, options ) );
  }
}

proportionPlayground.register( 'PatternPanel', PatternPanel );
export default PatternPanel;