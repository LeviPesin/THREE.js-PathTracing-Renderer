import {float, vec3, lessThan, dot, negate, cond, mul, greaterThan, add} from 'nodes/ShaderNode.js';
import makeVarNode from '../makeVarNode.js';
import {RayObjectIntersections} from '../Intersections.js';
import {ZERO, HALF} from '../ConstantNodes.js';
import RaytracingShape from '../RaytracingShape.js';
import RaytracingPlane from './RaytracingPlane.js';

export default class RaytracingSlab extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('slab');
		this.depth = makeVarNode(obj.depth || float(1.0));
		this.normal = makeVarNode(obj.normal || vec3(0, 1, 0));
		this.position = makeVarNode(obj.position || vec3(0, 0, 0));
	}
	
	intersect(ray) {
		const condition = makeVarNode(lessThan(dot(this.normal, ray.direction), ZERO));
		const negNormal = makeVarNode(negate(this.normal));
		
		const normal1 = makeVarNode(cond(condition, this.normal, negNormal));
		const normal2 = makeVarNode(cond(condition, negNormal, this.normal));
		
		const radius = makeVarNode(mul(this.depth, HALF));
		const trueRadius = makeVarNode(cond(
			greaterThan(dot(sub(ray.origin, this.position), this.normal), radius),
			radius,
			negate(radius)
		));
		
		const intersection1 = RaytracingPlane.prototype.intersect.call({
			position: makeVarNode(add(this.position, mul(trueRadius, normal1))),
			normal: normal1,
			singleSided: false
		}, ray).intersections[0];
		
		const intersection2 = RaytracingPlane.prototype.intersect.call({
			position: makeVarNode(add(this.position, mul(trueRadius, normal2))),
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