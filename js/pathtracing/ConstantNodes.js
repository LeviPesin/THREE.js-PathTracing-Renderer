import ConstantNode from './ConstantNode.js';

const constantNodes = {};

function createConstantNode(name, value, forceFloat = false) {
	constantNodes[name] = new ConstantNode(name, value, forceFloat);
}

createConstantNode('PI'              , Math.PI);
createConstantNode('TWO_PI'          , 2 * Math.PI);
createConstantNode('FOUR_PI'         , 4 * Math.PI);
createConstantNode('ONE_OVER_PI'     , 1 / Math.PI);
createConstantNode('ONE_OVER_TWO_PI' , 1 / (2 * Math.PI));
createConstantNode('ONE_OVER_FOUR_PI', 1 / (4 * Math.PI));
createConstantNode('PI_OVER_TWO'     , Math.PI / 2);
createConstantNode('ONE_OVER_THREE'  , 1 / 3);
createConstantNode('E'               , Math.E);

createConstantNode('INFINITY', 1000000.0, true);

createConstantNode('SPOT_LIGHT' , -2);
createConstantNode('POINT_LIGHT', -1);
createConstantNode('LIGHT'      , 0);

createConstantNode('DIFF'        , 1);
createConstantNode('REFR'        , 2);
createConstantNode('SPEC'        , 3);
createConstantNode('COAT'        , 4);
createConstantNode('CARCOAT'     , 5);
createConstantNode('TRANSLUCENT' , 6);
createConstantNode('SPECSUB'     , 7);
createConstantNode('CHECK'       , 8);
createConstantNode('WATER'       , 9);
createConstantNode('PBR_MATERIAL', 10);
createConstantNode('WOOD'        , 11);
createConstantNode('SEAFLOOR'    , 12);
createConstantNode('TERRAIN'     , 13);
createConstantNode('CLOTH'       , 14);
createConstantNode('LIGHT_WOOD'  , 15);
createConstantNode('DARK_WOOD'   , 16);
createConstantNode('PAINTING'    , 17);
createConstantNode('METAL_COAT'  , 18);

export default constantNodes;