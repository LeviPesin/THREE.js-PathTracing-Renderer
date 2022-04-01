import {float, add, sub, mul, div, lessThan, sqrt, cond, INFINITY} from 'three-nodes/Nodes.js';

//optimized algorithm for solving quadratic equations developed by Dr. Po-Shen Loh -> https://youtu.be/XKBX0r3J-9Y
//adapted to root finding for all quadric shapes (sphere, ellipsoid, cylinder, cone, etc.) by Erich Loftis
export default function solveQuadratic(A, B, C) {
	const invA = div(1, A);
	
	const BA = mul(B, invA);
	const CA = mul(C, invA);
	
	const negHalfB = mul(B, -0.5);
	
	const u2 = sub(mul(negHalfB, negHalfB), CA);
	
	const condition = lessThan(u2, 0);
	
	const u = sqrt(u2);
	
	return {
		minRoot: cond(condition, INFINITY, sub(negHalfB, u)),
		maxRoot: cond(condition, INFINITY, add(negHalfB, u))
	};
}