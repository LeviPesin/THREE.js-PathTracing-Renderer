import MathNode from '../nodes/math/MathNode.js';
import OperatorNode from '../nodes/math/OperatorNode.js';
import CondNode from '../nodes/math/CondNode.js';
import VarNode from '../nodes/core/VarNode.js';
import {ZERO, NEG_HALF, ONE} from './ConstantNodes.js';

//optimized algorithm for solving quadratic equations developed by Dr. Po-Shen Loh -> https://youtu.be/XKBX0r3J-9Y
//adapted to root finding (ray t0/t1) for all quadric shapes (sphere, ellipsoid, cylinder, cone, etc.) by Erich Loftis
export default function solveQuadratic(A, B, C) {
	const invA = new VarNode(new OperatorNode('/', ONE, A));
	
	const BA = new OperatorNode('*', B, invA);
	const CA = new OperatorNode('*', C, invA);
	
	const negHalfB = new VarNode(new OperatorNode('*', B, NEG_HALF));
	
	const u2 = new VarNode(new OperatorNode('-', new OperatorNode('*', negHalfB, negHalfB), CA));
	
	const cond = new VarNode(new OperatorNode('<', u2, ZERO));
	
	const u = new VarNode(new MathNode(MathNode.SQRT, u2));
	
	return {
		t0: new VarNode(new CondNode(cond, ZERO, new OperatorNode('-', negHalfB, u))),
		t1: new VarNode(new CondNode(cond, ZERO, new OperatorNode('+', negHalfB, u)))
	};
}