import SplitNode from '../../nodes/utils/SplitNode.js';
import MathNode from '../../nodes/math/MathNode.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import VarNode from '../../nodes/core/VarNode.js';
import {ZERO, INFINITY} from '../ConstantNodes.js';

function planeExtDefIntersect(planePosition, planeNormal, rayOrigin, rayDirection, singleSided = false) {
	const denominator = new VarNode(new MathNode(MathNode.DOT, planeNormal, rayDirection));
	
	const rayToPlane = new OperatorNode('-', planePosition, rayOrigin);
	const result = new VarNode(new OperatorNode('/', new MathNode(MathNode.DOT, rayToPlane, planeNormal), denominator));
	
	const actualResult = new CondNode(new OperatorNode('>', result, ZERO), result, INFINITY);
	
	if (singleSided)
		return new CondNode(new OperatorNode('>', denominator, ZERO), INFINITY, actualResult);
	else
		return actualResult;
}

function planeIntersect(plane, rayOrigin, rayDirection, singleSided = false) {
	const normal = new SplitNode(plane, 'xyz');
	const position = new OperatorNode('*', new SplitNode(plane, 'w'), normal);
	return planeExtDefIntersect(position, normal, rayOrigin, rayDirection, singleSided);
}

export {planeExtDefIntersect, planeIntersect};