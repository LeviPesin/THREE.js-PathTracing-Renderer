import {float, vec3, mul, sub, or, greaterThan, abs, dot, cond} from 'nodes/ShaderNode.js';
import makeVarNode from '../makeVarNode.js';
import generateOrthonormalBasis from '../GenerateOrthonormalBasis.js';
import {TWO, INFINITY, INFINITY_VEC3} from '../ConstantNodes.js';
import RaytracingShape from '../RaytracingShape.js';
import RaytracingPlane from './RaytracingPlane.js';

export default class RaytracingRectangle extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('rectangle');
		this.sideU = makeVarNode(obj.sideU || float(1.0));
		this.sideV = makeVarNode(obj.sideV || float(1.0));
		this.normal = makeVarNode(obj.normal || vec3(0, 1, 0));
		this.position = makeVarNode(obj.position || vec3(0, 0, 0));
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const intersections = RaytracingPlane.prototype.intersect.call(this, ray);
		
		const distanceVector = makeVarNode(mul(TWO, sub(intersections.intersections[0].point, this.position)));
		
		const [_, U, V] = generateOrthonormalBasis(this.normal);
		
		const condition = or(
			greaterThan(abs(dot(U, distanceVector)), sideU),
			greaterThan(abs(dot(V, distanceVector)), sideV)
		);
		
		intersections.shape = this;
		intersections.intersection[0].distance = cond(condition, INFINITY,      intersections.intersection[0].distance);
		intersections.intersection[0].point    = cond(condition, INFINITY_VEC3, intersections.intersection[0].point);
	
		return intersections;
	}
}