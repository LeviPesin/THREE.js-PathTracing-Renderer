import {float, add, sub, mul, div, dot} from 'three-nodes/Nodes.js';
import solveQuadratic from '../utils/SolveQuadratic.js';
import {Intersection, RayObjectIntersections} from '../core/Intersections.js';
import RaytracingShape from '../core/RaytracingShape.js';

export default class RaytracingSphere extends RaytracingShape {
	constructor(obj = {}) {
		super('sphere', obj);
		this.radius = obj.radius || 1.0;
	}
	
	intersect(ray) {
		const sphereToRay = sub(ray.origin, this.position);
	
		const a = dot(ray.direction, ray.direction);
		const b = mul(2, dot(ray.direction, sphereToRay));
		const c = sub(dot(sphereToRay, sphereToRay), mul(this.radius, this.radius));
		
		const {minRoot, maxRoot} = solveQuadratic(a, b, c);
		
		const point1 = add(ray.origin, mul(minRoot, ray.direction));
		const point2 = add(ray.origin, mul(maxRoot, ray.direction));
		
		const normalCoeff = div(1, this.radius);
		
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