// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Color = require( 'SCENERY/util/Color' );
  var Util = require( 'DOT/Util' );

  // Regular samples from the image, loaded from assets/paint-gradient-colors.html
  var colorPoints = [ new Color( 22, 68, 245 ), new Color( 21, 68, 245 ), new Color( 19, 68, 245 ), new Color( 18, 68, 245 ), new Color( 14, 68, 245 ), new Color( 13, 67, 244 ), new Color( 11, 67, 242 ), new Color( 10, 66, 240 ), new Color( 8, 66, 239 ), new Color( 5, 65, 237 ), new Color( 3, 66, 235 ), new Color( 4, 68, 233 ), new Color( 3, 69, 231 ), new Color( 4, 71, 229 ), new Color( 4, 72, 227 ), new Color( 4, 74, 225 ), new Color( 4, 75, 223 ), new Color( 3, 77, 221 ), new Color( 2, 79, 219 ), new Color( 4, 80, 217 ), new Color( 8, 82, 215 ), new Color( 8, 82, 214 ), new Color( 12, 84, 212 ), new Color( 15, 85, 210 ), new Color( 17, 87, 208 ), new Color( 19, 88, 206 ), new Color( 22, 90, 205 ), new Color( 24, 92, 203 ), new Color( 25, 93, 201 ), new Color( 28, 95, 199 ), new Color( 29, 96, 197 ), new Color( 31, 98, 195 ), new Color( 33, 100, 193 ), new Color( 34, 102, 191 ), new Color( 35, 102, 189 ), new Color( 36, 104, 188 ), new Color( 38, 105, 186 ), new Color( 39, 107, 184 ), new Color( 40, 108, 182 ), new Color( 42, 109, 181 ), new Color( 43, 112, 178 ), new Color( 44, 112, 176 ), new Color( 46, 115, 174 ), new Color( 46, 115, 172 ), new Color( 48, 118, 170 ), new Color( 49, 119, 169 ), new Color( 50, 121, 167 ), new Color( 51, 122, 164 ), new Color( 52, 122, 163 ), new Color( 53, 125, 161 ), new Color( 54, 126, 159 ), new Color( 55, 127, 158 ), new Color( 56, 129, 156 ), new Color( 57, 131, 153 ), new Color( 58, 131, 151 ), new Color( 60, 134, 150 ), new Color( 60, 135, 148 ), new Color( 61, 136, 146 ), new Color( 62, 138, 143 ), new Color( 63, 140, 141 ), new Color( 64, 141, 140 ), new Color( 65, 141, 139 ), new Color( 66, 144, 137 ), new Color( 67, 145, 134 ), new Color( 68, 147, 133 ), new Color( 68, 147, 131 ), new Color( 70, 150, 129 ), new Color( 71, 151, 127 ), new Color( 72, 153, 125 ), new Color( 72, 154, 123 ), new Color( 74, 156, 121 ), new Color( 75, 158, 119 ), new Color( 75, 159, 117 ), new Color( 76, 161, 115 ), new Color( 76, 161, 114 ), new Color( 77, 162, 112 ), new Color( 79, 164, 110 ), new Color( 80, 166, 108 ), new Color( 80, 167, 107 ), new Color( 81, 169, 105 ), new Color( 82, 171, 103 ), new Color( 83, 172, 101 ), new Color( 84, 174, 100 ), new Color( 85, 175, 97 ), new Color( 86, 177, 96 ), new Color( 86, 178, 93 ), new Color( 87, 180, 92 ), new Color( 88, 181, 91 ), new Color( 89, 182, 89 ), new Color( 90, 184, 87 ), new Color( 91, 185, 85 ), new Color( 92, 187, 84 ), new Color( 92, 188, 82 ), new Color( 93, 190, 80 ), new Color( 94, 191, 78 ), new Color( 95, 194, 76 ), new Color( 96, 194, 74 ), new Color( 97, 196, 72 ), new Color( 97, 197, 70 ), new Color( 98, 199, 68 ), new Color( 99, 200, 67 ), new Color( 99, 201, 65 ), new Color( 100, 203, 64 ), new Color( 101, 204, 62 ), new Color( 102, 207, 60 ), new Color( 103, 208, 59 ), new Color( 104, 209, 57 ), new Color( 104, 210, 55 ), new Color( 105, 212, 55 ), new Color( 106, 213, 56 ), new Color( 107, 215, 56 ), new Color( 107, 216, 57 ), new Color( 108, 218, 57 ), new Color( 110, 221, 58 ), new Color( 110, 221, 58 ), new Color( 111, 223, 59 ), new Color( 111, 224, 59 ), new Color( 112, 226, 60 ), new Color( 113, 227, 60 ), new Color( 114, 228, 60 ), new Color( 114, 229, 61 ), new Color( 116, 231, 61 ), new Color( 117, 233, 62 ), new Color( 117, 234, 62 ), new Color( 119, 237, 63 ), new Color( 119, 238, 63 ), new Color( 120, 240, 64 ), new Color( 120, 240, 64 ), new Color( 121, 242, 64 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 122, 243, 65 ), new Color( 124, 243, 65 ), new Color( 127, 243, 65 ), new Color( 129, 243, 66 ), new Color( 131, 243, 66 ), new Color( 133, 243, 66 ), new Color( 135, 243, 66 ), new Color( 136, 243, 66 ), new Color( 138, 243, 67 ), new Color( 140, 243, 67 ), new Color( 142, 243, 67 ), new Color( 144, 243, 67 ), new Color( 146, 243, 67 ), new Color( 148, 244, 68 ), new Color( 151, 244, 68 ), new Color( 152, 244, 68 ), new Color( 154, 244, 68 ), new Color( 157, 244, 69 ), new Color( 159, 244, 69 ), new Color( 161, 244, 69 ), new Color( 162, 244, 69 ), new Color( 164, 244, 70 ), new Color( 166, 244, 70 ), new Color( 168, 244, 70 ), new Color( 170, 244, 71 ), new Color( 172, 244, 71 ), new Color( 174, 244, 71 ), new Color( 176, 245, 71 ), new Color( 178, 245, 72 ), new Color( 180, 245, 72 ), new Color( 182, 245, 72 ), new Color( 184, 245, 72 ), new Color( 186, 245, 73 ), new Color( 188, 245, 73 ), new Color( 190, 245, 73 ), new Color( 191, 245, 74 ), new Color( 193, 245, 74 ), new Color( 195, 245, 74 ), new Color( 197, 245, 74 ), new Color( 200, 246, 75 ), new Color( 202, 246, 75 ), new Color( 203, 246, 75 ), new Color( 205, 246, 76 ), new Color( 208, 246, 76 ), new Color( 210, 246, 76 ), new Color( 211, 246, 77 ), new Color( 213, 246, 77 ), new Color( 215, 246, 77 ), new Color( 217, 246, 78 ), new Color( 219, 246, 78 ), new Color( 221, 247, 78 ), new Color( 223, 247, 79 ), new Color( 225, 247, 79 ), new Color( 227, 247, 79 ), new Color( 229, 247, 80 ), new Color( 231, 247, 80 ), new Color( 233, 247, 80 ), new Color( 235, 247, 81 ), new Color( 237, 247, 81 ), new Color( 238, 248, 81 ), new Color( 240, 248, 82 ), new Color( 242, 248, 82 ), new Color( 244, 248, 82 ), new Color( 246, 248, 83 ), new Color( 248, 248, 83 ), new Color( 250, 248, 84 ), new Color( 253, 248, 84 ), new Color( 255, 248, 84 )
    ]
    ;

  var sampleLocations = [ 0, 0.0037629350893697085, 0.007525870178739417, 0.011288805268109126, 0.015051740357478834, 0.01881467544684854, 0.022577610536218252, 0.02634054562558796, 0.030103480714957668, 0.03386641580432737, 0.03762935089369708, 0.041392285983066796, 0.045155221072436504, 0.04891815616180621, 0.05268109125117592, 0.05644402634054563, 0.060206961429915336, 0.06396989651928504, 0.06773283160865474, 0.07149576669802446, 0.07525870178739416, 0.07902163687676388, 0.08278457196613359, 0.08654750705550329, 0.09031044214487301, 0.09407337723424271, 0.09783631232361242, 0.10159924741298212, 0.10536218250235184, 0.10912511759172154, 0.11288805268109126, 0.11665098777046096, 0.12041392285983067, 0.12417685794920037, 0.1279397930385701, 0.1317027281279398, 0.1354656632173095, 0.13922859830667922, 0.14299153339604892, 0.14675446848541862, 0.15051740357478832, 0.15428033866415805, 0.15804327375352775, 0.16180620884289745, 0.16556914393226718, 0.16933207902163688, 0.17309501411100658, 0.17685794920037629, 0.18062088428974601, 0.18438381937911572, 0.18814675446848542, 0.19190968955785512, 0.19567262464722485, 0.19943555973659455, 0.20319849482596425, 0.20696142991533395, 0.21072436500470368, 0.21448730009407338, 0.21825023518344308, 0.22201317027281278, 0.2257761053621825, 0.2295390404515522, 0.2333019755409219, 0.23706491063029161, 0.24082784571966134, 0.24459078080903104, 0.24835371589840075, 0.2521166509877705, 0.2558795860771402, 0.2596425211665099, 0.2634054562558796, 0.2671683913452493, 0.270931326434619, 0.27469426152398874, 0.27845719661335844, 0.28222013170272814, 0.28598306679209784, 0.28974600188146754, 0.29350893697083724, 0.29727187206020694, 0.30103480714957664, 0.3047977422389464, 0.3085606773283161, 0.3123236124176858, 0.3160865475070555, 0.3198494825964252, 0.3236124176857949, 0.3273753527751646, 0.33113828786453436, 0.33490122295390407, 0.33866415804327377, 0.34242709313264347, 0.34619002822201317, 0.34995296331138287, 0.35371589840075257, 0.35747883349012227, 0.36124176857949203, 0.36500470366886173, 0.36876763875823143, 0.37253057384760113, 0.37629350893697083, 0.38005644402634053, 0.38381937911571024, 0.38758231420507994, 0.3913452492944497, 0.3951081843838194, 0.3988711194731891, 0.4026340545625588, 0.4063969896519285, 0.4101599247412982, 0.4139228598306679, 0.41768579492003766, 0.42144873000940736, 0.42521166509877706, 0.42897460018814676, 0.43273753527751646, 0.43650047036688616, 0.44026340545625586, 0.44402634054562556, 0.4477892756349953, 0.451552210724365, 0.4553151458137347, 0.4590780809031044, 0.4628410159924741, 0.4666039510818438, 0.4703668861712135, 0.47412982126058323, 0.477892756349953, 0.4816556914393227, 0.4854186265286924, 0.4891815616180621, 0.4929444967074318, 0.4967074317968015, 0.5004703668861712, 0.504233301975541, 0.5079962370649106, 0.5117591721542804, 0.51552210724365, 0.5192850423330198, 0.5230479774223895, 0.5268109125117592, 0.5305738476011289, 0.5343367826904986, 0.5380997177798683, 0.541862652869238, 0.5456255879586077, 0.5493885230479775, 0.5531514581373471, 0.5569143932267169, 0.5606773283160865, 0.5644402634054563, 0.5682031984948259, 0.5719661335841957, 0.5757290686735654, 0.5794920037629351, 0.5832549388523048, 0.5870178739416745, 0.5907808090310442, 0.5945437441204139, 0.5983066792097836, 0.6020696142991533, 0.605832549388523, 0.6095954844778928, 0.6133584195672624, 0.6171213546566322, 0.6208842897460018, 0.6246472248353716, 0.6284101599247413, 0.632173095014111, 0.6359360301034808, 0.6396989651928504, 0.6434619002822202, 0.6472248353715898, 0.6509877704609596, 0.6547507055503292, 0.658513640639699, 0.6622765757290687, 0.6660395108184384, 0.6698024459078081, 0.6735653809971778, 0.6773283160865475, 0.6810912511759172, 0.6848541862652869, 0.6886171213546566, 0.6923800564440263, 0.6961429915333961, 0.6999059266227657, 0.7036688617121355, 0.7074317968015051, 0.7111947318908749, 0.7149576669802445, 0.7187206020696143, 0.7224835371589841, 0.7262464722483537, 0.7300094073377235, 0.7337723424270931, 0.7375352775164629, 0.7412982126058325, 0.7450611476952023, 0.748824082784572, 0.7525870178739417, 0.7563499529633114, 0.7601128880526811, 0.7638758231420508, 0.7676387582314205, 0.7714016933207902, 0.7751646284101599, 0.7789275634995296, 0.7826904985888994, 0.786453433678269, 0.7902163687676388, 0.7939793038570084, 0.7977422389463782, 0.8015051740357478, 0.8052681091251176, 0.8090310442144873, 0.812793979303857, 0.8165569143932268, 0.8203198494825964, 0.8240827845719662, 0.8278457196613358, 0.8316086547507056, 0.8353715898400753, 0.839134524929445, 0.8428974600188147, 0.8466603951081844, 0.8504233301975541, 0.8541862652869238, 0.8579492003762935, 0.8617121354656632, 0.8654750705550329, 0.8692380056444027, 0.8730009407337723, 0.8767638758231421, 0.8805268109125117, 0.8842897460018815, 0.8880526810912511, 0.8918156161806209, 0.8955785512699906, 0.8993414863593603, 0.90310442144873, 0.9068673565380997, 0.9106302916274694, 0.9143932267168391, 0.9181561618062088, 0.9219190968955786, 0.9256820319849483, 0.929444967074318, 0.9332079021636877, 0.9369708372530574, 0.940733772342427, 0.9444967074317968, 0.9482596425211665, 0.9520225776105362, 0.955785512699906, 0.9595484477892756, 0.9633113828786454, 0.967074317968015, 0.9708372530573848, 0.9746001881467544, 0.9783631232361242, 0.9821260583254939, 0.9858889934148636, 0.9896519285042333, 0.993414863593603, 0.9971777986829727, 1.0 ];

  // TODO: Speed this up
  function ColorMap() {
  }

  proportionPlayground.register( 'ColorMap', ColorMap );
  return inherit( Object, ColorMap, {}, {
    getColor: function( blendAmount ) {

      // get two nearest neighbors
      var lowerIndex = 0;
      for ( var i = 1; i < sampleLocations.length; i++ ) {
        if ( blendAmount <= sampleLocations[ i ] ) {
          lowerIndex = i - 1;
          break;
        }
      }
      var distanceBetweenPoints = Util.linear( sampleLocations[ lowerIndex ], sampleLocations[ lowerIndex + 1 ], 0, 1, blendAmount );
      var lowerColor = colorPoints[ lowerIndex ];
      var upperColor = colorPoints[ lowerIndex + 1 ];
      var interpolated = Color.interpolateRGBA( lowerColor, upperColor, distanceBetweenPoints );
      return interpolated;
    }
  } );
} );