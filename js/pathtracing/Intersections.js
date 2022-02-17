import makeVarNode from './makeVarNode.js';

export class Intersection {
	constructor({distance, point, normal, emission, color, type}) {
		this.distance = makeVarNode(distance);
		this.point = makeVarNode(point);
		this.normal = makeVarNode(normal);
		//this.emission = makeVarNode(emission;
		//this.color = makeVarNode(color);
		//this.type = makeVarNode(type);
	}
}

export class RayObjectIntersections {
	constructor({shape, ray, intersections}) {
		this.shape = shape;
		this.ray = ray;
		this.intersections = intersections; //sorted by distance
											//last elements can have distance = INFINITY
	}
}