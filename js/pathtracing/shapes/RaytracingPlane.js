import {float, vec3, dot, add, sub, mul, div, greaterThan, cond, INFINITY} from 'three-nodes/Nodes.js';
import {Intersection, RayObjectIntersections} from '../core/Intersections.js';
import RaytracingShape from '../core/RaytracingShape.js';

export default class RaytracingPlane extends RaytracingShape {
	constructor(obj = {}) {
		if (obj.plane) {
			obj.normal = obj.plane.xyz;
			obj.position = mul(obj.plane.w, obj.normal);
		}
		super('plane', obj);
		this.normal = obj.normal || vec3(0, 1, 0);
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const denominator = dot(this.normal, ray.direction);
		
		const rayToPlane = sub(this.position, ray.origin);
		const result = div(dot(rayToPlane, this.normal), denominator);
		
		const actualResult = cond(greaterThan(result, 0), result, INFINITY);
		
		let distance;
		if (this.singleSided)
			distance = cond(greaterThan(denominator, 0), INFINITY, actualResult);
		else
			distance = actualResult;
		
		const intersection = new Intersection({
			distance,
			point: add(ray.origin, mul(distance, ray.direction)),
			normal: this.normal
		});
		
		return new RayObjectIntersections({
			shape: this,
			ray,
			intersections: [intersection]
		});
	}
}