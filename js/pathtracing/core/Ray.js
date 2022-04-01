import {vec3} from 'three-nodes/Nodes.js';

export default class Ray {
	constructor(obj = {}) {
		this.origin = obj.origin || vec3(0, 0, 0);
		this.direction = obj.direction || vec3(0, 0, -1);
	}
}