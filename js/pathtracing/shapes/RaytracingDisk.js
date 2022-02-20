import {float, vec3, sub, dot, mul, greaterThan, cond} from 'nodes/ShaderNode.js';
import makeVarNode from '../makeVarNode.js';
import {INFINITY, INFINITY_VEC3} from '../ConstantNodes.js';
import RaytracingShape from '../RaytracingShape.js';
import RaytracingPlane from './RaytracingPlane.js';

export default class RaytracingDisk extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('disk');
		this.radius = makeVarNode(obj.radius || float(1.0));
		this.normal = makeVarNode(obj.normal || vec3(0, 1, 0));
		this.position = makeVarNode(obj.position || vec3(0, 0, 0));
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const intersections = RaytracingPlane.prototype.intersect.call(this, ray);
		
		//somehow make immediate return when intersections.intersections[0].distance is INFINITY?
		
		const distanceVector = makeVarNode(sub(intersections.intersections[0].point, this.position));
		const distanceSquared = dot(distanceVector, distanceVector);
		const radiusSquared = mul(this.radius, this.radius);
		
		const condition = makeVarNode(greaterThan(distanceSquared, radiusSquared));
		
		intersections.shape = this;
		intersections.intersection[0].distance = cond(condition, INFINITY,      intersections.intersection[0].distance);
		intersections.intersection[0].point    = cond(condition, INFINITY_VEC3, intersections.intersection[0].point);
	
		return intersections;
	}
}