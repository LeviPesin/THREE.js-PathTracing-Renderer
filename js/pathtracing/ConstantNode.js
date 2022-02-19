import BoolNode from './BoolNode.js';
import UintNode from './UintNode.js';
import FloatNode from 'nodes/inputs/FloatNode.js';
import IntNode from 'nodes/inputs/IntNode.js';
import Matrix3Node from 'nodes/inputs/Matrix3Node.js';
import Matrix4Node from 'nodes/inputs/Matrix4Node.js';
import Vector2Node from 'nodes/inputs/Vector2Node.js';
import Vector3Node from 'nodes/inputs/Vector3Node.js';
import Vector4Node from 'nodes/inputs/Vector4Node.js';

export default function createConstantNode(value, forceFloat = false, forceSigned = true) {
	let node;
	
	if (value.isVector2 === true)
		node = new Vector2Node(value);
	else if (value.isVector3 === true)
		node = new Vector3Node(value);
	else if (value.isVector4 === true)
		node = new Vector4Node(value);
	else if (value.isMatrix3 === true)
		node = new Matrix3Node(value);
	else if (value.isMatrix4 === true)
		node = new Matrix4Node(value);
	else if (value.isMatrix4 === true)
		node = new Matrix4Node(value);
	else if (typeof value === 'boolean')
		node = new BoolNode(value);
	else if (typeof value !== 'number')
		throw new TypeError('Only numbers, booleans, vectors, and matrices are allowed');
	else if ((value % 1) || forceFloat)
		node = new FloatNode(value);
	else ((value < 0) || forceSigned)
		node = new IntNode(value);
	else
		node = new UintNode(value);
	
	node.setConst(true);
	
	return node;
}