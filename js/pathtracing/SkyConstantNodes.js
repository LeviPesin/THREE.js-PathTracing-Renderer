import {float, vec3} from 'nodes/ShaderNode.js';

export const TURBIDITY                = float(1.0);
export const RAYLEIGH_COEFFICIENT     = float(3.0);
export const MIE_COEFFICIENT          = float(0.03);
export const MIE_DIRECTIONAL_G        = float(0.76);
//constant for atmospheric scattering
export const THREE_OVER_SIXTEEN_PI    = float(3 / (16 * Math.PI));
//wavelength of used primaries according to preetham
export const LAMBDA                   = vec3(6.8E-7, 5.5E-7, 4.5E-7);
export const TOTAL_RAYLEIGH           = vec3(5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5);
//mie stuff
//K coefficient for the primaries
export const K                        = vec3(0.686, 0.678, 0.666);
export const MIE_V                    = float(4.0);
export const MIE_CONST                = vec3(1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14);
//optical length at zenith for molecules
export const RAYLEIGH_ZENITH_LENGTH   = float(8400.0);
export const MIE_ZENITH_LENGTH        = float(1250.0);
export const UP_VECTOR                = vec3(0, 1, 0);
export const SUN_POWER                = float(1000.0);
//66 arc seconds -> degrees and the cosine of that
export const SUN_ANGULAR_DIAMETER_COS = float(Math.cos(66 / 3600 / 180 * Math.PI));
export const CUTOFF_ANGLE             = float(1.6110731556870734);
export const STEEPNESS                = float(1.5);