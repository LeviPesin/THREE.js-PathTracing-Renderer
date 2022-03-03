import {float, vec3, temp, mul, sub, or, greaterThan, abs, dot, cond} from 'three-nodes/ShaderNode.js';
import generateOrthonormalBasis from '../utils/GenerateOrthonormalBasis.js';
import {INFINITY, INFINITY_VEC3} from '../constants/ConstantNodes.js';
import RaytracingShape from '../core/RaytracingShape.js';
import RaytracingPlane from './RaytracingPlane.js';

const ONE = float(1.0);
const TWO = float(2.0);

const Y = vec3(0, 1, 0);
const ZERO_VEC = vec3(0, 0, 0);

export default class RaytracingRectangle extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('rectangle');
		this.sideU = temp(obj.sideU || ONE);
		this.sideV = temp(obj.sideV || ONE);
		this.normal = temp(obj.normal || Y);
		this.position = temp(obj.position || ZERO_VEC);
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const intersections = RaytracingPlane.prototype.intersect.call(this, ray);
		
		const distanceVector = temp(mul(TWO, sub(intersections.intersections[0].point, this.position)));
		
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