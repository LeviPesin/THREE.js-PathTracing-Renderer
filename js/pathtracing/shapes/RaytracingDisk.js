import {Vector3} from '../../three.module.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import MathNode from '../../nodes/math/MathNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import makeVarNode from '../makeVarNode.js';
import createConstantNode from '../ConstantNode.js';
import {INFINITY, INFINITY_VEC3} from '../ConstantNodes.js';
import RaytracingObject from '../RaytracingObject.js';
import RaytracingPlane from './RaytracingPlane.js';

export default class RaytracingDisk extends RaytracingObject {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('disk');
		this.radius = makeVarNode(obj.radius || createConstantNode(1.0, true));
		this.normal = makeVarNode(obj.normal || createConstantNode(new Vector3(0, 1, 0)));
		this.position = makeVarNode(obj.position || createConstantNode(new Vector3(0, 0, 0)));
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const intersections = RaytracingPlane.prototype.intersect.call(this, ray);
		
		//somehow make immediate return when intersections.intersections[0].distance is INFINITY?
		
		const distanceVector = makeVarNode(new OperatorNode('-', intersections.intersections[0].point, this.position));
		const distanceSquared = new MathNode(MathNode.DOT, distanceVector, distanceVector);
		const radiusSquared = new OperatorNode('*', this.radius, this.radius);
		
		const cond = makeVarNode(new OperatorNode('>', distanceSquared, radiusSquared));
		
		intersections.object = this;
		intersections.intersection[0].distance = new CondNode(cond, INFINITY,      intersections.intersection[0].distance);
		intersections.intersection[0].point    = new CondNode(cond, INFINITY_VEC3, intersections.intersection[0].point);
	
		return intersections;
	}
}