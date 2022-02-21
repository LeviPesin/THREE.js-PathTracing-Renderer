import {float, makeVar, add, sub, mul, div, lessThan, sqrt, cond} from 'nodes/ShaderNode.js';
import {INFINITY} from '../constants/ConstantNodes.js';

const ZERO = float(0.0);
const NEG_HALF = float(-1 / 2);
const ONE = float(1.0);

//optimized algorithm for solving quadratic equations developed by Dr. Po-Shen Loh -> https://youtu.be/XKBX0r3J-9Y
//adapted to root finding for all quadric shapes (sphere, ellipsoid, cylinder, cone, etc.) by Erich Loftis
export default function solveQuadratic(A, B, C) {
	const invA = makeVar(div(ONE, A));
	
	const BA = mul(B, invA);
	const CA = mul(C, invA);
	
	const negHalfB = makeVar(mul(B, NEG_HALF));
	
	const u2 = makeVar(sub(mul(negHalfB, negHalfB), CA));
	
	const condition = makeVar(lessThan(u2, ZERO));
	
	const u = makeVar(sqrt(u2));
	
	return {
		minRoot: makeVar(cond(condition, INFINITY, sub(negHalfB, u))),
		maxRoot: makeVar(cond(condition, INFINITY, add(negHalfB, u)))
	};
}