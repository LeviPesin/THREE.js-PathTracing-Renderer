import {vec3} from 'nodes/ShaderNode.js';
import makeVarNode from './makeVarNode.js';

export default class Ray {
	constructor(obj) {
		if (!obj)
			obj = {};
		this.origin = makeVarNode(obj.origin || vec3(0, 0, 0));
		this.direction = makeVarNode(obj.direction || vec3(0, 0, 1));
	}
}