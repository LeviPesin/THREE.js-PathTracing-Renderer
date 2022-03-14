import {float, temp, add, sub, mul, div, lessThan, sqrt, cond} from 'three-nodes/ShaderNode.js';
import {INFINITY} from '../constants/ConstantNodes.js';

//optimized algorithm for solving quadratic equations developed by Dr. Po-Shen Loh -> https://youtu.be/XKBX0r3J-9Y
//adapted to root finding for all quadric shapes (sphere, ellipsoid, cylinder, cone, etc.) by Erich Loftis
export default function solveQuadratic(A, B, C) {
	const invA = temp(div(1, A));
	
	const BA = mul(B, invA);
	const CA = mul(C, invA);
	
	const negHalfB = temp(mul(B, -0.5));
	
	const u2 = temp(sub(mul(negHalfB, negHalfB), CA));
	
	const condition = temp(lessThan(u2, 0));
	
	const u = temp(sqrt(u2));
	
	return {
		minRoot: temp(cond(condition, INFINITY, sub(negHalfB, u))),
		maxRoot: temp(cond(condition, INFINITY, add(negHalfB, u)))
	};
}