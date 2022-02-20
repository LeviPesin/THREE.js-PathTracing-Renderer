import {float, int, vec3} from 'nodes/ShaderNode.js';

export const INFINITY      = float(1000000.0);
export const INFINITY_VEC3 = vec3(INFINITY.value);

export const SPOT_LIGHT  = int(-2);
export const POINT_LIGHT = int(-1);
export const LIGHT       = int(0);

export const DIFF         = int(1);
export const REFR         = int(2);
export const SPEC         = int(3);
export const COAT         = int(4);
export const CARCOAT      = int(5);
export const TRANSLUCENT  = int(6);
export const SPECSUB      = int(7);
export const CHECK        = int(8);
export const WATER        = int(9);
export const PBR_MATERIAL = int(10);
export const WOOD         = int(11);
export const SEAFLOOR     = int(12);
export const TERRAIN      = int(13);
export const CLOTH        = int(14);
export const LIGHT_WOOD   = int(15);
export const DARK_WOOD    = int(16);
export const PAINTING     = int(17);
export const METAL_COAT   = int(18);