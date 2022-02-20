import {Vector3} from 'three';
import OperatorNode from 'nodes/math/OperatorNode.js';
import MathNode from 'nodes/math/MathNode.js';
import CondNode from 'nodes/math/CondNode.js';
import SplitNode from 'nodes/utils/SplitNode.js';
import makeVarNode from '../makeVarNode.js';
import createConstantNode from '../ConstantNode.js';

const ZERO_POINT_NINE = createConstantNode(0.9);

const Y = createConstantNode(new Vector3(0, 1, 0));
const X = createConstantNode(new Vector3(1, 0, 0));

export default generateOrthonormalBasis(normal) {
	const vector = new CondNode(
		new OperatorNode('<', new MathNode(MathNode.ABS, new SplitNode(normal, 'y')), ZERO_POINT_NINE),
		Y,
		X
	);
	
	const U = makeVarNode(new MathNode(MathNode.NORMALIZE, new MathNode(MathNode.CROSS, vector, normal)));
	const V = makeVarNode(new MathNode(MathNode.CROSS, normal, U));
	
	return [normal, U, V];
}