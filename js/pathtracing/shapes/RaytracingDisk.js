import {float, vec3, temp, sub, dot, mul, greaterThan, cond, INFINITY} from 'three-nodes/Nodes.js';
import RaytracingShape from '../core/RaytracingShape.js';
import RaytracingPlane from './RaytracingPlane.js';

export default class RaytracingDisk extends RaytracingShape {
	constructor(obj = {}) {
		super('disk', obj);
		this.radius = temp(obj.radius || 1.0);
		this.normal = temp(obj.normal || vec3(0, 1, 0));
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
		intersections.intersection[0].distance = cond(condition, INFINITY,       intersections.intersection[0].distance);
		intersections.intersection[0].point    = cond(condition, vec3(INFINITY), intersections.intersection[0].point);
	
		return intersections;
	}
}