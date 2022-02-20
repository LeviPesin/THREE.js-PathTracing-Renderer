import {vec3, dot, add, sub, mul, div, greaterThan, cond} from 'nodes/ShaderNode.js';
import makeVarNode from '../makeVarNode.js';
import {ZERO, INFINITY} from '../ConstantNodes.js';
import {Intersection, RayObjectIntersections} from '../Intersections.js';
import RaytracingShape from '../RaytracingShape.js';

export default class RaytracingPlane extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('plane');
		if (obj.plane) {
			obj.normal = makeVarNode(obj.plane.xyz);
			obj.position = makeVarNode(mul(obj.plane.w, obj.normal));
		}
		this.normal = makeVarNode(obj.normal || vec3(0, 1, 0));
		this.position = makeVarNode(obj.position || vec3(0, 0, 0));
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const denominator = makeVarNode(dot(this.normal, ray.direction));
		
		const rayToPlane = sub(this.position, ray.origin);
		const result = makeVarNode(div(dot(rayToPlane, this.normal), denominator));
		
		const actualResult = cond(greaterThan(result, ZERO), result, INFINITY);
		
		let distance;
		if (this.singleSided)
			distance = cond(greaterThan(denominator, ZERO), INFINITY, actualResult);
		else
			distance = actualResult;
		
		distance = makeVarNode(distance);
		
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