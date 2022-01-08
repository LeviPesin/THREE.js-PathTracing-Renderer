import CondNode from '../nodes/math/CondNode.js';
import OperatorNode from '../nodes/math/OperatorNode.js';
import VarNode from '../nodes/core/VarNode.js';
import makeVarNode from './makeVarNode.js';
import {INFINITY} from './ConstantNodes.js';

const intersectionPointsMap = new Map();

function mapGetArr(arr, map = intersectionPointsMap) {
	if (arr.length === 1)
		return map.get(arr[0]);
	return mapGetArr(arr.slice(1), map.get(arr[0]));
}

function mapSetArr(arr, value, map = intersectionPointsMap) {
	if (arr.length === 1)
		return map.set(arr[0], value);
	if (!map.has(arr[0]))
		map.set(arr[0], new Map());
	return mapSetArr(arr.slice(1), value, map.get(arr[0]));
}

function mapHasArr(arr, map = intersectionPointsMap) {
	if (arr.length === 1)
		return map.has(arr[0]);
	return map.has(arr[0]) ? mapHasArr(arr.slice(1), map.get(arr[0])) : false;
}

function makeNonVarNode(node) {
	if (node instanceof VarNode)
		return node.node;
	return node;
}

function getIntersectionPoint(ray, intersection) {
	const node = makeNonVarNode(intersection);
	
	const arr1 = [ray, makeNonVarNode(node.elseNode)];
	if ((node instanceof CondNode) && (node.ifNode === INFINITY) && mapHasArr(arr1)) {
		node.node = makeVarNode(node.node);
		return makeVarNode(new CondNode(node.node, INFINITY, mapGetArr(arr1)));
	}
	
	const arr2 = [ray, makeNonVarNode(node.ifNode)];
	if ((node instanceof CondNode) && (node.elseNode === INFINITY) && mapHasArr(arr2)) {
		node.node = makeVarNode(node.node);
		return makeVarNode(new CondNode(node.node, mapGetArr(arr2), INFINITY));
	}
	
	const arr3 = [ray, node]
	if (mapHasArr(arr3))
		return mapGetArr(arr3);
	
	const point = makeVarNode(new OperatorNode('+', ray.origin, new OperatorNode('*', intersection, ray.direction)));
	mapSetArr(arr3, point);
	return point;
}

export default class Intersection {
	constructor(ray, intersection) {
		this.ray = ray;
		this.intersection = makeVarNode(intersection);
		this.point = getIntersectionPoint(ray, this.intersection);
	}
}