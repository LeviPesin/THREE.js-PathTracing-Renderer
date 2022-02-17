import VarNode from 'nodes/core/VarNode.js';

export default function makeVarNode(node) {
	if (node instanceof VarNode)
		return node;
	return new VarNode(node);
}