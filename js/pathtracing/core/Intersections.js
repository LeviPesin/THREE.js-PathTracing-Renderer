export class Intersection {
	constructor({distance, point, normal, emission, color, type}) {
		this.distance = distance;
		this.point = point;
		this.normal = normal;
		this.emission = emission;
		this.color = color;
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