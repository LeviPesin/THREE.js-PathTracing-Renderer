import {float, temp, add, sub, mul, div, dot} from 'three-nodes/ShaderNode.js';
import solveQuadratic from '../utils/SolveQuadratic.js';
import {Intersection, RayObjectIntersections} from '../core/Intersections.js';
import RaytracingShape from '../core/RaytracingShape.js';

export default class RaytracingSphere extends RaytracingShape {
	constructor(obj = {}) {
		super('sphere', obj);
		this.radius = temp(obj.radius || 1.0);
	}
	
	intersect(ray) {
		const sphereToRay = temp(sub(ray.origin, this.position));
	
		const a = temp(dot(ray.direction, ray.direction));
		const b = temp(mul(2, dot(ray.direction, sphereToRay)));
		const c = temp(sub(dot(sphereToRay, sphereToRay), mul(this.radius, this.radius)));
		
		const {minRoot, maxRoot} = solveQuadratic(a, b, c);
		
		const point1 = temp(add(ray.origin, mul(minRoot, ray.direction)));
		const point2 = temp(add(ray.origin, mul(maxRoot, ray.direction)));
		
		const normalCoeff = temp(div(1, this.radius));
		
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