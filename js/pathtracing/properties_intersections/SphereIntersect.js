import MathNode from '../../nodes/math/MathNode.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import VarNode from '../../nodes/core/VarNode.js';
import {ZERO, TWO, INFINITY} from '../ConstantNodes.js';
import solveQuadratic from '../SolveQuadratic.js';
import Intersection from '../Intersection.js';

export default function sphereIntersect({radius, position}, ray) {
	const sphereToRay = new VarNode(new OperatorNode('-', ray.origin, position));
	
	const a = new VarNode(new MathNode(MathNode.DOT, ray.direction, ray.direction));
	const b = new VarNode(new OperatorNode('*', TWO, new MathNode(MathNode.DOT, ray.direction, sphereToRay)));
	const c = new VarNode(new OperatorNode('-', new MathNode(MathNode.DOT, sphereToRay, sphereToRay), new OperatorNode('*', radius, radius)));
	
	const {t0, t1} = solveQuadratic(a, b, c);
	
	const intersection = new CondNode(
		new OperatorNode('>', t0, ZERO),
		t0,
		new CondNode(
			new OperatorNode('>', t1, ZERO),
			t1,
			INFINITY
		)
	);
	
	return new Intersection(ray, intersection);
}