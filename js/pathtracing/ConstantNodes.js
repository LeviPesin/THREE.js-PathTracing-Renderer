import createConstantNode from './ConstantNode.js';

export {
	PI:               createConstantNode(Math.PI),
	TWO_PI:           createConstantNode(2 * Math.PI),
	FOUR_PI:          createConstantNode(4 * Math.PI),
	ONE_OVER_PI:      createConstantNode(1 / Math.PI),
	ONE_OVER_TWO_PI:  createConstantNode(1 / (2 * Math.PI)),
	ONE_OVER_FOUR_PI: createConstantNode(1 / (4 * Math.PI)),
	PI_OVER_TWO:      createConstantNode(Math.PI / 2),
	ONE_OVER_THREE:   createConstantNode(1 / 3),
	E:                createConstantNode(Math.E),
	
	INFINITY: createConstantNode(1000000.0, true),
	
	SPOT_LIGHT:  createConstantNode(-2),
	POINT_LIGHT: createConstantNode(-1),
	LIGHT:       createConstantNode(0),
	
	DIFF:         createConstantNode(1),
	REFR:         createConstantNode(2),
	SPEC:         createConstantNode(3),
	COAT:         createConstantNode(4),
	CARCOAT:      createConstantNode(5),
	TRANSLUCENT:  createConstantNode(6),
	SPECSUB:      createConstantNode(7),
	CHECK:        createConstantNode(8),
	WATER:        createConstantNode(9),
	PBR_MATERIAL: createConstantNode(10),
	WOOD:         createConstantNode(11),
	SEAFLOOR:     createConstantNode(12),
	TERRAIN:      createConstantNode(13),
	CLOTH:        createConstantNode(14),
	LIGHT_WOOD:   createConstantNode(15),
	DARK_WOOD:    createConstantNode(16),
	PAINTING:     createConstantNode(17),
	METAL_COAT:   createConstantNode(18)
};