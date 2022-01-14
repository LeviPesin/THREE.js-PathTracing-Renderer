import {Vector3} from '../../three.module.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import MathNode from '../../nodes/math/MathNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import makeVarNode from '../makeVarNode.js';
import createConstantNode from '../ConstantNode.js';
import {RayObjectIntersections} from '../Intersections.js';
import {ZERO, HALF} from '../ConstantNodes.js';
import RaytracingObject from '../RaytracingObject.js';
import RaytracingPlane from './RaytracingPlane.js';

export default class RaytracingSlab extends RaytracingObject {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('slab');
		this.depth = makeVarNode(obj.depth || createConstantNode(1.0, true));
		this.normal = makeVarNode(obj.normal || createConstantNode(new Vector3(0, 1, 0)));
		this.position = makeVarNode(obj.position || createConstantNode(new Vector3(0, 0, 0)));
	}
	
	intersect(ray) {
		const cond = makeVarNode(new OperatorNode('<', new MathNode(MathNode.DOT, this.normal, ray.direction), ZERO));
		const negNormal = makeVarNode(new MathNode(MathNode.NEGATE, this.normal));
		
		const normal1 = makeVarNode(new CondNode(cond, this.normal, negNormal));
		const normal2 = makeVarNode(new CondNode(cond, negNormal, this.normal));
		
		const radius = makeVarNode(new OperatorNode('*', this.depth, HALF));
		const trueRadius = makeVarNode(new CondNode(
			new OperatorNode('>', new MathNode(MathNode.DOT, new OperatorNode('-', ray.origin, this.position), this.normal), radius),
			radius,
			new MathNode(MathNode.NEGATE, radius)
		));
		
		const intersection1 = RaytracingPlane.prototype.intersect.call({
			position: makeVarNode(new OperatorNode('+', this.position, new OperatorNode('*', trueRadius, normal1))),
			normal: normal1,
			singleSided: false
		}, ray).intersections[0];
		
		const intersection2 = RaytracingPlane.prototype.intersect.call({
			position: makeVarNode(new OperatorNode('+', this.position, new OperatorNode('*', trueRadius, normal2))),
			normal: normal2,
			singleSided: false
		}, ray).intersections[0];
		
		return new RayObjectIntersections({
			object: this,
			ray,
			intersections: [intersection1, intersection2]
		});
	}
}