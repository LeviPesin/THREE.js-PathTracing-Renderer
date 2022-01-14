import {Vector3} from '../../three.module.js';
import OperatorNode from '../../nodes/math/OperatorNode.js';
import MathNode from '../../nodes/math/MathNode.js';
import CondNode from '../../nodes/math/CondNode.js';
import makeVarNode from '../makeVarNode.js';
import createConstantNode from '../ConstantNode.js';
import {TWO, INFINITY, INFINITY_VEC3} from '../ConstantNodes.js';
import RaytracingObject from '../RaytracingObject.js';
import RaytracingPlane from './RaytracingPlane.js';

const ZERO_POINT_NINE = createConstantNode(0.9);

const Y = createConstantNode(new Vector3(0, 1, 0));
const X = createConstantNode(new Vector3(1, 0, 0));

export default class RaytracingRectangle extends RaytracingObject {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('rectangle');
		this.sideU = makeVarNode(obj.sideU || createConstantNode(1.0, true));
		this.sideV = makeVarNode(obj.sideV || createConstantNode(1.0, true));
		this.normal = makeVarNode(obj.normal || createConstantNode(new Vector3(0, 1, 0)));
		this.position = makeVarNode(obj.position || createConstantNode(new Vector3(0, 0, 0)));
		this.singleSided = obj.singleSided === true;
	}
	
	intersect(ray) {
		const intersections = RaytracingPlane.prototype.intersect.call(this, ray);
		
		const distanceVector = makeVarNode(
			new OperatorNode('*', TWO, new OperatorNode('-', intersections.intersections[0].point, this.position))
		);
	
		const vector = new CondNode(
			new OperatorNode('<', new MathNode(MathNode.ABS, new SplitNode(this.normal, 'y')), ZERO_POINT_NINE),
			Y,
			X
		);
		
		const U = makeVarNode(new MathNode(MathNode.NORMALIZE, new MathNode(MathNode.CROSS, vector, this.normal)));
		const V = new MathNode(MathNode.CROSS, this.normal, U);
		
		const cond = new OperatorNode('||',
			new OperatorNode('>', new MathNode(MathNode.ABS, new MathNode(MathNode.DOT, U, distanceVector)), sideU),
			new OperatorNode('>', new MathNode(MathNode.ABS, new MathNode(MathNode.DOT, V, distanceVector)), sideV)
		);
		
		intersections.object = this;
		intersections.intersection[0].distance = new CondNode(cond, INFINITY,      intersections.intersection[0].distance);
		intersections.intersection[0].point    = new CondNode(cond, INFINITY_VEC3, intersections.intersection[0].point);
	
		return intersections;
	}
}