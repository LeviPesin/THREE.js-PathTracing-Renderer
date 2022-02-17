import {Vector3} from 'three';
import createConstantNode from './ConstantNode.js';
import makeVarNode from './makeVarNode.js';

export default class Ray {
	constructor(obj) {
		if (!obj)
			obj = {};
		this.origin = makeVarNode(obj.origin || createConstantNode(new Vector3(0, 0, 0)));
		this.direction = makeVarNode(obj.direction || createConstantNode(new Vector3(0, 0, 1)));
	}
}