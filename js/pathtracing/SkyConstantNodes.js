import createConstantNode from './ConstantNode.js';
import {Vector3} from '../three.module.js';

export {
	TURBIDITY:                createConstantNode(1.0, true),
	RAYLEIGH_COEFFICIENT:     createConstantNode(3.0, true),
	MIE_COEFFICIENT:          createConstantNode(0.03),
	MIE_DIRECTIONAL_G:        createConstantNode(0.76),
	//constant for atmospheric scattering
	THREE_OVER_SIXTEEN_PI:    createConstantNode(3 / (16 * Math.PI)),
	//wavelength of used primaries, according to preetham
	LAMBDA:                   createConstantNode(new Vector3(6.8E-7, 5.5E-7, 4.5E-7)),
	TOTAL_RAYLEIGH:           createConstantNode(new Vector3(5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5)),
	//mie stuff
	//K coefficient for the primaries
	K:                        createConstantNode(new Vector3(0.686, 0.678, 0.666)),
	MIE_V:                    createConstantNode(4.0, true),
	MIE_CONST:                createConstantNode(new Vector3(1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14)),
	//optical length at zenith for molecules
	RAYLEIGH_ZENITH_LENGTH:   createConstantNode(8400.0, true),
	MIE_ZENITH_LENGTH:        createConstantNode(1250.0, true),
	UP_VECTOR:                createConstantNode(new Vector3(0, 1, 0)),
	SUN_POWER:                createConstantNode(1000.0, true),
	//66 arc seconds -> degrees, and the cosine of that
	SUN_ANGULAR_DIAMETER_COS, createConstantNode(Math.cos(66 / 3600 / 180 * Math.PI)),
	CUTOFF_ANGLE:             createConstantNode(1.6110731556870734),
	STEEPNESS:                createConstantNode(1.5),
};