// Copyright 2016, University of Colorado Boulder

/**
 * This radio button group allows the user to select between the different scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  var Node = require( 'SCENERY/nodes/Node' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var AlignBox = require( 'SCENERY/nodes/AlignBox' );
  var MutableOptionsNode = require( 'SUN/MutableOptionsNode' );

  /**
   * @constructor
   * @extends {Node}
   *
   * @param {Property.<Scene>} sceneProperty - Determines which scene is visible
   * @param {Array.<SceneNode>} sceneNodes - Each sceneNode has a scene and an icon
   * @param {Object} [options] - node options
   */
  function SceneSelectionControls( sceneProperty, sceneNodes, options ) {
    Node.call( this );

    var group = new AlignGroup();
    var ratioItems = sceneNodes.map( function( sceneNode ) {
      return {
        value: sceneNode.scene,
        node: new AlignBox( sceneNode.sceneIcon, { group: group } )
      };
    } );

    // We need to be able to change the colors of this node, so it's wrapped in a MutableOptionsNode.
    this.addChild( new MutableOptionsNode( RadioButtonGroup, [ sceneProperty, ratioItems ], {
      orientation: 'horizontal',
      buttonContentXMargin: 20,
      buttonContentYMargin: 12,
      selectedLineWidth: 2
    }, {
      selectedStroke: ProportionPlaygroundColorProfile.sceneSelectionBorderProperty,
      baseColor: ProportionPlaygroundColorProfile.sceneSelectionBackgroundProperty
    } ) );

    this.mutate( options );
  }

  proportionPlayground.register( 'SceneSelectionControls', SceneSelectionControls );

  return inherit( Node, SceneSelectionControls );
} );
