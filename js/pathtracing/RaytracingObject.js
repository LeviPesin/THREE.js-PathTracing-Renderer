let lastUsedID = -1;

export default class RaytracingObject {
	constructor(shape) {
		this.id = ++lastUsedID;
		this.shape = shape;
		this.rayIntersections = new Map();
	}
	
	intersect(ray) {
		if (this.rayIntersections.has(ray))
			return this.rayIntersections.get(ray);
		const intersections = this.shape.intersect(ray);
		this.rayIntersections.set(ray, intersections);
		intersections.intersections = intersections.intersections.map(this.calculateIntersectionsProperties, this);
		intersections.object = this;
		return intersections;
	}
	
	calculateIntersectionsProperties(intersection) {
		//Abstract function. Should be used for calculating intersections' properties like color.
	}
}