import {vec3, temp} from 'three-nodes/ShaderNode.js';

export default class Ray {
	constructor(obj) {
		if (!obj)
			obj = {};
		this.origin = temp(obj.origin || vec3(0, 0, 0));
		this.direction = temp(obj.direction || vec3(0, 0, -1));
	}
}