import {temp} from 'three-nodes/ShaderNode.js';

export class Intersection {
	constructor({distance, point, normal, emission, color, type}) {
		this.distance = temp(distance);
		this.point = temp(point);
		this.normal = temp(normal);
		this.emission = temp(emission);
		this.color = temp(color);
		this.type = type;
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