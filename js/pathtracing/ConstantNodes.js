import createConstantNode from './ConstantNode.js';

export const ZERO = createConstantNode(0.0, true);

export const PI               = createConstantNode(Math.PI);
export const TWO_PI           = createConstantNode(2 * Math.PI);
export const FOUR_PI          = createConstantNode(4 * Math.PI);
export const ONE_OVER_PI      = createConstantNode(1 / Math.PI);
export const ONE_OVER_TWO_PI  = createConstantNode(1 / (2 * Math.PI));
export const ONE_OVER_FOUR_PI = createConstantNode(1 / (4 * Math.PI));
export const PI_OVER_TWO      = createConstantNode(Math.PI / 2);
export const ONE_OVER_THREE   = createConstantNode(1 / 3);
export const E                = createConstantNode(Math.E);

export const INFINITY = createConstantNode(1000000.0, true);

export const SPOT_LIGHT  = createConstantNode(-2);
export const POINT_LIGHT = createConstantNode(-1);
export const LIGHT       = createConstantNode(0);

export const DIFF         = createConstantNode(1);
export const REFR         = createConstantNode(2);
export const SPEC         = createConstantNode(3);
export const COAT         = createConstantNode(4);
export const CARCOAT      = createConstantNode(5);
export const TRANSLUCENT  = createConstantNode(6);
export const SPECSUB      = createConstantNode(7);
export const CHECK        = createConstantNode(8);
export const WATER        = createConstantNode(9);
export const PBR_MATERIAL = createConstantNode(10);
export const WOOD         = createConstantNode(11);
export const SEAFLOOR     = createConstantNode(12);
export const TERRAIN      = createConstantNode(13);
export const CLOTH        = createConstantNode(14);
export const LIGHT_WOOD   = createConstantNode(15);
export const DARK_WOOD    = createConstantNode(16);
export const PAINTING     = createConstantNode(17);
export const METAL_COAT   = createConstantNode(18);