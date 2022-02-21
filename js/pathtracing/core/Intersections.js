import {makeVar} from 'nodes/ShaderNode.js';

export class Intersection {
	constructor({distance, point, normal, emission, color, type}) {
		this.distance = makeVar(distance);
		this.point = makeVar(point);
		this.normal = makeVar(normal);
		//this.emission = makeVar(emission;
		//this.color = makeVar(color);
		//this.type = makeVar(type);
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