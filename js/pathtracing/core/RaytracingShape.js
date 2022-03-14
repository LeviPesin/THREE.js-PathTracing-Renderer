import {vec3, temp} from 'three-nodes/ShaderNode.js';

export default class RaytracingShape {
	constructor(type, obj = {}) {
		this.type = type;
		this.position = temp(obj.position || vec3(0, 0, 0));
	}
}