import makeVarNode from './makeVarNode.js';

export default class Ray {
	constructor(origin, direction) {
		this.origin = makeVarNode(origin);
		this.direction = makeVarNode(direction);
	}
}