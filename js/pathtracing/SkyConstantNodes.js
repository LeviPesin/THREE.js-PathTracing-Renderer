import ConstantNode from './ConstantNode.js';
import {Vector3} from '../three.module.js';

const constantNodes = {};

function createConstantNode(name, value) {
	constantNodes[name] = new ConstantNode(name, value, true);
}

createConstantNode('TURBIDITY'               , 1.0);
createConstantNode('RAYLEIGH_COEFFICIENT'    , 3.0);
createConstantNode('MIE_COEFFICIENT'         , 0.03);
createConstantNode('MIE_DIRECTIONAL_G'       , 0.76);
//constant for atmospheric scattering
createConstantNode('THREE_OVER_SIXTEEN_PI'   , 3 / (16 * Math.PI));
//wavelength of used primaries, according to preetham
createConstantNode('LAMBDA'                  , new Vector3(6.8E-7, 5.5E-7, 4.5E-7));
createConstantNode('TOTAL_RAYLEIGH'          , new Vector3(5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5));
//mie stuff
//K coefficient for the primaries
createConstantNode('K'                       , new Vector3(0.686, 0.678, 0.666));
createConstantNode('MIE_V'                   , 4.0);
createConstantNode('MIE_CONST'               , new Vector3(1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14));
//optical length at zenith for molecules
createConstantNode('RAYLEIGH_ZENITH_LENGTH'  , 8400.0);
createConstantNode('MIE_ZENITH_LENGTH'       , 1250.0);
createConstantNode('UP_VECTOR'               , new Vector3(0, 1, 0));
createConstantNode('SUN_POWER'               , 1000.0);
//66 arc seconds -> degrees, and the cosine of that
createConstantNode('SUN_ANGULAR_DIAMETER_COS', Math.cos(66 / 3600 / 180 * Math.PI));
createConstantNode('CUTOFF_ANGLE'            , 1.6110731556870734);
createConstantNode('STEEPNESS'               , 1.5);

export default constantNodes;