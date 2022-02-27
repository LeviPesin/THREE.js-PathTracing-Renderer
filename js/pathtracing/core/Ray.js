import {vec3, makeVar} from 'three-nodes/ShaderNode.js';

const ZERO = vec3(0, 0, 0);
const Z = vec3(0, 0, 1);

export default class Ray {
	constructor(obj) {
		if (!obj)
			obj = {};
		this.origin = makeVar(obj.origin || ZERO);
		this.direction = makeVar(obj.direction || Z);
	}
}