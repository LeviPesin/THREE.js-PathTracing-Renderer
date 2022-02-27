import {float, vec3, makeVar, add, sub, mul, div, dot} from 'three-nodes/ShaderNode.js';
import solveQuadratic from '../utils/SolveQuadratic.js';
import {Intersection, RayObjectIntersections} from '../core/Intersections.js';
import RaytracingShape from '../core/RaytracingShape.js';

const ONE = float(1.0);
const TWO = float(2.0);

const ZERO_VEC = vec3(0, 0, 0);

export default class RaytracingSphere extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('sphere');
		this.radius = makeVar(obj.radius || ONE);
		this.position = makeVar(obj.position || ZERO_VEC);
	}
	
	intersect(ray) {
		const sphereToRay = makeVar(sub(ray.origin, this.position));
	
		const a = makeVar(dot(ray.direction, ray.direction));
		const b = makeVar(mul(TWO, dot(ray.direction, sphereToRay)));
		const c = makeVar(sub(dot(sphereToRay, sphereToRay), mul(this.radius, this.radius)));
		
		const {minRoot, maxRoot} = solveQuadratic(a, b, c);
		
		const point1 = makeVar(add(ray.origin, mul(minRoot, ray.direction)));
		const point2 = makeVar(add(ray.origin, mul(maxRoot, ray.direction)));
		
		const normalCoeff = makeVar(div(ONE, this.radius));
		
		const intersection1 = new Intersection({
			distance: minRoot,
			point: point1,
			normal: mul(normalCoeff, point1)
		});
		
		const intersection2 = new Intersection({
			distance: maxRoot,
			point: point2,
			normal: mul(normalCoeff, point2)
		});
		
		return new RayObjectIntersections({
			shape: this,
			ray,
			intersections: [intersection1, intersection2]
		});
	}
}