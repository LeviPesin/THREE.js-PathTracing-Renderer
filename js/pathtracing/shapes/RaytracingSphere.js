import {float, vec3, add, sub, mul, div, dot} from 'nodes/ShaderNode.js';
import makeVarNode from '../makeVarNode.js';
import solveQuadratic from '../SolveQuadratic.js';
import {Intersection, RayObjectIntersections} from '../Intersections.js';
import RaytracingShape from '../RaytracingShape.js';

const ONE = float(1.0);
const TWO = float(2.0);

const ZERO_VEC = vec3(0, 0, 0);

export default class RaytracingSphere extends RaytracingShape {
	constructor(obj) {
		if (!obj)
			obj = {};
		super('sphere');
		this.radius = makeVarNode(obj.radius || ONE);
		this.position = makeVarNode(obj.position || ZERO_VEC);
	}
	
	intersect(ray) {
		const sphereToRay = makeVarNode(sub(ray.origin, this.position));
	
		const a = makeVarNode(dot(ray.direction, ray.direction));
		const b = makeVarNode(mul(TWO, dot(ray.direction, sphereToRay)));
		const c = makeVarNode(sub(dot(sphereToRay, sphereToRay), mul(this.radius, this.radius)));
		
		const {minRoot, maxRoot} = solveQuadratic(a, b, c);
		
		const point1 = makeVarNode(add(ray.origin, mul(minRoot, ray.direction)));
		const point2 = makeVarNode(add(ray.origin, mul(maxRoot, ray.direction)));
		
		const normalCoeff = makeVarNode(div(ONE, this.radius));
		
		const intersection1 = new Intersection({
			distance: minRoot,
			point: point1,
			normal: mul(normalCoeff, point1)
		});
		
		const intersection2 = new Intersection({
			distance: maxRoot,
			point: point2,
			normal: mul(normalCoeff, point2)
		});
		
		return new RayObjectIntersections({
			shape: this,
			ray,
			intersections: [intersection1, intersection2]
		});
	}
}