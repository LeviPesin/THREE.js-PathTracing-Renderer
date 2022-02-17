import {Vector3} from 'three';
import OperatorNode from 'nodes/math/OperatorNode.js';
import MathNode from 'nodes/math/MathNode.js';
import CondNode from 'nodes/math/CondNode.js';
import makeVarNode from '../makeVarNode.js';
import createConstantNode from '../ConstantNode.js';
import {ZERO, ONE, TWO, INFINITY} from '../ConstantNodes.js';
import solveQuadratic from '../SolveQuadratic.js';
import {Intersection, RayObjectIntersections} from '../Intersections.js';
import RaytracingShape from '../RaytracingShape.js';

export default class RaytracingSphere extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('sphere');
		this.radius = makeVarNode(obj.radius || createConstantNode(1.0, true));
		this.position = makeVarNode(obj.position || createConstantNode(new Vector3(0, 0, 0)));
	}
	
	intersect(ray) {
		const sphereToRay = makeVarNode(new OperatorNode('-', ray.origin, this.position));
	
		const a = makeVarNode(new MathNode(MathNode.DOT, ray.direction, ray.direction));
		const b = makeVarNode(new OperatorNode('*', TWO, new MathNode(MathNode.DOT, ray.direction, sphereToRay)));
		const c = makeVarNode(
			new OperatorNode('-', new MathNode(MathNode.DOT, sphereToRay, sphereToRay), new OperatorNode('*', this.radius, this.radius))
		);
		
		const {minRoot, maxRoot} = solveQuadratic(a, b, c);
		
		const point1 = makeVarNode(new OperatorNode('+', ray.origin, new OperatorNode('*', minRoot, ray.direction)));
		const point2 = makeVarNode(new OperatorNode('+', ray.origin, new OperatorNode('*', maxRoot, ray.direction)));
		
		const normalCoeff = makeVarNode(new OperatorNode('/', ONE, this.radius));
		
		const intersection1 = new Intersection({
			distance: minRoot,
			point: point1,
			normal: new OperatorNode('*', normalCoeff, point1)
		});
		
		const intersection2 = new Intersection({
			distance: maxRoot,
			point: point2,
			normal: new OperatorNode('*', normalCoeff, point2)
		});
		
		return new RayObjectIntersections({
			shape: this,
			ray,
			intersections: [intersection1, intersection2]
		});
	}
}