import {float, vec3, mul, sub, or, greaterThan, abs, dot, cond, INIFINITY} from 'three-nodes/Nodes.js';
import generateOrthonormalBasis from '../utils/GenerateOrthonormalBasis.js';
import RaytracingShape from '../core/RaytracingShape.js';
import RaytracingPlane from './RaytracingPlane.js';

export default class RaytracingRectangle extends RaytracingShape {
	constructor(obj = {}) {
		super('rectangle', obj);
		this.sideU = obj.sideU || 1.0;
		this.sideV = obj.sideV || 1.0;
		this.normal = obj.normal || vec3(0, 1, 0);
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const intersections = RaytracingPlane.prototype.intersect.call(this, ray);
		
		const distanceVector = mul(2, sub(intersections.intersections[0].point, this.position));
		
		const [_, U, V] = generateOrthonormalBasis(this.normal);
		
		const condition = or(
			greaterThan(abs(dot(U, distanceVector)), sideU),
			greaterThan(abs(dot(V, distanceVector)), sideV)
		);
		
		intersections.shape = this;
		intersections.intersection[0].distance = cond(condition, INFINITY,       intersections.intersection[0].distance);
		intersections.intersection[0].point    = cond(condition, vec3(INFINITY), intersections.intersection[0].point);
	
		return intersections;
	}
}