import planeIntersect from './PlaneIntersect.js';
import MathNode from '../../nodes/math/MathNode.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import VarNode from '../../nodes/core/VarNode.js';
import {ZERO, HALF} from '../ConstantNodes.js';
import Intersection from '../Intersection.js';

export default function slabIntersect({depth, position, normal}, ray, singleSided = false) {
	const trueNormal = new CondNode(
		new OperatorNode('<', new MathNode(MathNode.DOT, normal, ray.direction), ZERO),
		normal,
		new MathNode(MathNode.NEGATE, normal)
	);
	
	const radius = new VarNode(new OperatorNode('*', depth, HALF));
	const trueRadius = new CondNode(
		new OperatorNode('>', new MathNode(MathNode.DOT, new OperatorNode('-', ray.origin, position), trueNormal), radius)
		radius,
		new MathNode(MathNode.NEGATE, radius)
	);
	
	return planeIntersect({
		position: new OperatorNode('+', position, new OperatorNode('*', trueRadius, trueNormal)),
		normal: trueNormal
	}, ray, singleSided);
}