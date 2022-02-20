import {vec3} from 'nodes/ShaderNode.js';
import makeVarNode from './makeVarNode.js';

const ZERO = vec3(0, 0, 0);
const Z = vec3(0, 0, 1);

export default class Ray {
	constructor(obj) {
		if (!obj)
			obj = {};
		this.origin = makeVarNode(obj.origin || ZERO);
		this.direction = makeVarNode(obj.direction || Z);
	}
}