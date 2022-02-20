import VarNode from 'nodes/core/VarNode.js';
import {nodeObject} from 'nodes/ShaderNode.js';

export default function makeVarNode(node) {
	if (node.node) //node is a VarNode
		return node;
	return nodeObject(new VarNode(node));
}