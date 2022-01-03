import Node from '../nodes/core/Node.js';
import VarNode from '../nodes/core/VarNode.js';

import FloatNode from '../nodes/inputs/FloatNode.js';
import IntNode from '../nodes/inputs/IntNode.js';
import Matrix3Node from '../nodes/inputs/Matrix3Node.js';
import Matrix4Node from '../nodes/inputs/Matrix4Node.js';
import Vector2Node from '../nodes/inputs/Vector2Node.js';
import Vector3Node from '../nodes/inputs/Vector3Node.js';
import Vector4Node from '../nodes/inputs/Vector4Node.js';

class ConstantNode extends VarNode {
	constructor(name, value, forceFloat = false) {
		let nodeType, node;
		
		if (value.isVector2 === true) {
			nodeType = 'vec2';
			node = new Vector2Node(value);
		} else if (value.isVector3 === true) {
			nodeType = 'vec3';
			node = new Vector3Node(value);
		} else if (value.isVector4 === true) {
			nodeType = 'vec4';
			node = new Vector4Node(value);
		} else if (value.isMatrix3 === true) {
			nodeType = 'mat3';
			node = new Matrix3Node(value);
		} else if (value.isMatrix4 === true) {
			nodeType = 'mat4';
			node = new Matrix4Node(value);
		} else if (typeof value !== 'number') {
			throw new TypeError('Only numbers, vectors, and matrices are allowed');
		} else if ((value % 1) || forceFloat) {
			nodeType = 'float';
			node = new FloatNode(value);
		} else {
			nodeType = 'int';
			node = new IntNode(value);
		}
		
		node.setConst(true);
		
		super(node, name, nodeType);
	}
}

export default ConstantNode;