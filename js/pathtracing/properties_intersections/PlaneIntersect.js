import SplitNode from '../../nodes/utils/SplitNode.js';
import MathNode from '../../nodes/math/MathNode.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import VarNode from '../../nodes/core/VarNode.js';
import {ZERO, INFINITY} from '../ConstantNodes.js';
import Intersection from '../Intersection.js';

export default function planeIntersect(planeProperties, ray, singleSided = false) {
	let plane = planeProperties;
	
	if (planeProperties.plane) {
		const normal = new VarNode(new SplitNode(planeProperties.plane, 'xyz'));
		plane = {normal, position: new OperatorNode('*', new SplitNode(planeProperties.plane, 'w'), normal)}; //do not make this a variable
																											  //because it is used only once
	}
	
	const denominator = new VarNode(new MathNode(MathNode.DOT, plane.normal, ray.direction));
	
	const rayToPlane = new OperatorNode('-', plane.position, ray.origin);
	const result = new VarNode(new OperatorNode('/', new MathNode(MathNode.DOT, rayToPlane, plane.normal), denominator));
	
	const actualResult = new CondNode(new OperatorNode('>', result, ZERO), result, INFINITY);
	
	let intersection;
	if (singleSided)
		intersection = new CondNode(new OperatorNode('>', denominator, ZERO), INFINITY, actualResult);
	else
		intersection = actualResult;
	
	return new Intersection(ray, intersection);
}