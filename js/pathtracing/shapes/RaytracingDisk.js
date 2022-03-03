import {float, vec3, temp, sub, dot, mul, greaterThan, cond} from 'three-nodes/ShaderNode.js';
import {INFINITY, INFINITY_VEC3} from '../constants/ConstantNodes.js';
import RaytracingShape from '../core/RaytracingShape.js';
import RaytracingPlane from './RaytracingPlane.js';

const ONE = float(1.0);

const Y = vec3(0, 1, 0);
const ZERO_VEC = vec3(0, 0, 0);

export default class RaytracingDisk extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('disk');
		this.radius = temp(obj.radius || ONE);
		this.normal = temp(obj.normal || Y);
		this.position = temp(obj.position || ZERO_VEC);
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const intersections = RaytracingPlane.prototype.intersect.call(this, ray);
		
		//somehow make immediate return when intersections.intersections[0].distance is INFINITY?
		
		const distanceVector = temp(sub(intersections.intersections[0].point, this.position));
		const distanceSquared = dot(distanceVector, distanceVector);
		const radiusSquared = mul(this.radius, this.radius);
		
		const condition = temp(greaterThan(distanceSquared, radiusSquared));
		
		intersections.shape = this;
		intersections.intersection[0].distance = cond(condition, INFINITY,      intersections.intersection[0].distance);
		intersections.intersection[0].point    = cond(condition, INFINITY_VEC3, intersections.intersection[0].point);
	
		return intersections;
	}
}