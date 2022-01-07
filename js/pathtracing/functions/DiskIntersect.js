import planeIntersect from './PlaneIntersect.js';
import MathNode from '../../nodes/math/MathNode.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import VarNode from '../../nodes/core/VarNode.js';
import {INFINITY} from '../ConstantNodes.js';
import Intersection from '../Intersection.js';

export default function diskIntersect({radius, position, normal}, ray, singleSided = false) {
	const intersection = planeIntersect({position, normal}, ray, singleSided);
	
	//somehow make immediate return when intersection.intersection is INFINITY?
	
	const distanceVector = new VarNode(new OperatorNode('-', intersection.point, position));
	const distanceSquared = new MathNode(MathNode.DOT, distanceVector, distanceVector);
	const radiusSquared = new OperatorNode('*', radius, radius);
	
	return new Intersection(ray, new CondNode(new OperatorNode('>', distanceSquared, radiusSquared), INFINITY, intersection.intersection));
}