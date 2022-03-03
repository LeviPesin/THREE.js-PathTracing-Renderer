import {float, vec3, temp, dot, add, sub, mul, div, greaterThan, cond} from 'three-nodes/ShaderNode.js';
import {INFINITY} from '../constants/ConstantNodes.js';
import {Intersection, RayObjectIntersections} from '../core/Intersections.js';
import RaytracingShape from '../core/RaytracingShape.js';

const Y = vec3(0, 1, 0);
const ZERO_VEC = vec3(0, 0, 0);

const ZERO = float(0.0);

export default class RaytracingPlane extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('plane');
		if (obj.plane) {
			obj.normal = temp(obj.plane.xyz);
			obj.position = temp(mul(obj.plane.w, obj.normal));
		}
		this.normal = temp(obj.normal || Y);
		this.position = temp(obj.position || ZERO_VEC);
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const denominator = temp(dot(this.normal, ray.direction));
		
		const rayToPlane = sub(this.position, ray.origin);
		const result = temp(div(dot(rayToPlane, this.normal), denominator));
		
		const actualResult = cond(greaterThan(result, ZERO), result, INFINITY);
		
		let distance;
		if (this.singleSided)
			distance = cond(greaterThan(denominator, ZERO), INFINITY, actualResult);
		else
			distance = actualResult;
		
		distance = temp(distance);
		
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