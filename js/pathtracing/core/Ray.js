import {vec3, temp} from 'three-nodes/ShaderNode.js';

const ZERO = vec3(0, 0, 0);
const Z = vec3(0, 0, 1);

export default class Ray {
	constructor(obj) {
		if (!obj)
			obj = {};
		this.origin = temp(obj.origin || ZERO);
		this.direction = temp(obj.direction || Z);
	}
}