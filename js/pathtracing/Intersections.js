import makeVarNode from './makeVarNode.js';

export class Intersection {
	constructor({distance, point, normal}) {
		this.distance = makeVarNode(distance);
		this.point = makeVarNode(point);
		this.normal = makeVarNode(normal);
	}
}

export class RayObjectIntersections {
	constructor({object, ray, intersections}) {
		this.object = object;
		this.ray = ray;
		this.intersections = intersections; //sorted by distance
											//last elements can have distance = INFINITY
	}
}