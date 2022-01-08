import createConstantNode from '../ConstantNode.js';
import planeIntersect from './PlaneIntersect.js';
import MathNode from '../../nodes/math/MathNode.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import VarNode from '../../nodes/core/VarNode.js';
import SplitNode from '../../nodes/utils/SplitNode.js';
import {Vector3} from '../../three.module.js';
import {TWO, INFINITY} from '../ConstantNodes.js';
import Intersection from '../Intersection.js';

const ZERO_POINT_NINE = createConstantNode(0.9);

const Y = createConstantNode(new Vector3(0, 1, 0));
const X = createConstantNode(new Vector3(1, 0, 0));

export default function rectangleIntersect({sideU, sideV, position, normal}, ray, singleSided = false) {
	const intersection = planeIntersect({position, normal}, ray, singleSided);
	
	const distanceVector = new VarNode(new OperatorNode('*', TWO, new OperatorNode('-', intersection.point, position)));
	
	const vector = new CondNode(
		new OperatorNode('<', new MathNode(MathNode.ABS, new SplitNode(normal, 'y')), ZERO_POINT_NINE),
		Y,
		X
	);
	
	const U = new VarNode(new MathNode(MathNode.NORMALIZE, new MathNode(MathNode.CROSS, vector, normal)));
	const V = new MathNode(MathNode.CROSS, normal, U);
	
	return new Intersection(ray, new CondNode(
		new OperatorNode('||',
			new OperatorNode('>', new MathNode(MathNode.ABS, new MathNode(MathNode.DOT, U, distanceVector)), sideU),
			new OperatorNode('>', new MathNode(MathNode.ABS, new MathNode(MathNode.DOT, V, distanceVector)), sideV)
		),
		INFINITY,
		intersection.intersection
	));
}