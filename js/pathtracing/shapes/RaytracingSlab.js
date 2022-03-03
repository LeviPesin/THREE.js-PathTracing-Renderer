import {float, vec3, temp, lessThan, dot, negate, cond, mul, greaterThan, add} from 'three-nodes/ShaderNode.js';
import {RayObjectIntersections} from '../core/Intersections.js';
import RaytracingShape from '../core/RaytracingShape.js';
import RaytracingPlane from './RaytracingPlane.js';

const ZERO = float(0.0);
const HALF = float(1 / 2);
const ONE = float(1.0);

const Y = vec3(0, 1, 0);
const ZERO_VEC = vec3(0, 0, 0);

export default class RaytracingSlab extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('slab');
		this.depth = temp(obj.depth || ONE);
		this.normal = temp(obj.normal || Y);
		this.position = temp(obj.position || ZERO_VEC);
	}
	
	intersect(ray) {
		const condition = temp(lessThan(dot(this.normal, ray.direction), ZERO));
		const negNormal = temp(negate(this.normal));
		
		const normal1 = temp(cond(condition, this.normal, negNormal));
		const normal2 = temp(cond(condition, negNormal, this.normal));
		
		const radius = temp(mul(this.depth, HALF));
		const trueRadius = temp(cond(
			greaterThan(dot(sub(ray.origin, this.position), this.normal), radius),
			radius,
			negate(radius)
		));
		
		const intersection1 = RaytracingPlane.prototype.intersect.call({
			position: temp(add(this.position, mul(trueRadius, normal1))),
			normal: normal1,
			singleSided: false
		}, ray).intersections[0];
		
		const intersection2 = RaytracingPlane.prototype.intersect.call({
			position: temp(add(this.position, mul(trueRadius, normal2))),
			normal: normal2,
			singleSided: false
		}, ray).intersections[0];
		
		return new RayObjectIntersections({
			shape: this,
			ray,
			intersections: [intersection1, intersection2]
		});
	}
}