import SplitNode from '../../nodes/utils/SplitNode.js';
import MathNode from '../../nodes/math/MathNode.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import VarNode from '../../nodes/core/VarNode.js';
import {ZERO, INFINITY} from '../ConstantNodes.js';

export default function PlaneIntersect(plane, rayOrigin, rayDirection) {
	const normal = new SplitNode(plane, 'xyz');
	const denominator = new MathNode(MathNode.DOT, normal, rayDirection);
	
	const planeOrigToRayOrig = new OperatorNode('-', new OperatorNode('*', new SplitNode(plane, 'w'), normal), rayOrigin);
	let result = new OperatorNode('/', new MathNode(MathNode.DOT, planeOrigToRayOrig, normal), denominator);
	
	result = new VarNode(result); //make result a variable rather than an expression
	//TODO: test without this line, not sure whether it is needed or not
	
	return new CondNode(new OperatorNode('>', result, ZERO), result, INFINITY);
};