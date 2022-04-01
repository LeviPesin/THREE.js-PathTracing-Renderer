import {vec3} from 'three-nodes/Nodes.js';

export default class RaytracingShape {
	constructor(type, obj = {}) {
		this.type = type;
		this.position = obj.position || vec3(0, 0, 0);
	}
}