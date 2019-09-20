// Copyright 2016-2019, University of Colorado Boulder

/**
 * Shows a group of 4 radio buttons that allows switching between different scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AlignBox = require( 'SCENERY/nodes/AlignBox' );
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MutableOptionsNode = require( 'SUN/MutableOptionsNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  const ProportionPlaygroundColorProfile = require( 'PROPORTION_PLAYGROUND/common/view/ProportionPlaygroundColorProfile' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

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

    const group = new AlignGroup();
    const ratioItems = sceneNodes.map( function( sceneNode ) {
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
