import {Vector3} from '../../three.module.js';
import SplitNode from '../../nodes/utils/SplitNode.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import MathNode from '../../nodes/math/MathNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import makeVarNode from '../makeVarNode.js';
import createConstantNode from '../ConstantNode.js';
import {ZERO, INFINITY} from '../ConstantNodes.js';
import {Intersection, RayObjectIntersections} from '../Intersections.js';
import RaytracingShape from '../RaytracingShape.js';

export default class RaytracingPlane extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('plane');
		if (obj.plane) {
			obj.normal = makeVarNode(new SplitNode(obj.plane, 'xyz'));
			obj.position = makeVarNode(new OperatorNode('*', new SplitNode(obj.plane, 'w'), obj.normal));
		}
		this.normal = makeVarNode(obj.normal || createConstantNode(new Vector3(0, 1, 0)));
		this.position = makeVarNode(obj.position || createConstantNode(new Vector3(0, 0, 0)));
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const denominator = makeVarNode(new MathNode(MathNode.DOT, this.normal, ray.direction));
		
		const rayToPlane = new OperatorNode('-', this.position, ray.origin);
		const result = makeVarNode(new OperatorNode('/', new MathNode(MathNode.DOT, rayToPlane, this.normal), denominator));
		
		const actualResult = new CondNode(new OperatorNode('>', result, ZERO), result, INFINITY);
		
		let distance;
		if (this.singleSided)
			distance = new CondNode(new OperatorNode('>', denominator, ZERO), INFINITY, actualResult);
		else
			distance = actualResult;
		
		distance = makeVarNode(distance);
		
		const intersection = new Intersection({
			distance,
			point: new OperatorNode('+', ray.origin, new OperatorNode('*', distance, ray.direction)),
			normal: this.normal
		});
		
		return new RayObjectIntersections({
			shape: this,
			ray,
			intersections: [intersection]
		});
	}
}