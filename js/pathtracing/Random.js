import {int, float, uint, add, mul, sub, remainder, floor, shiftRight, xor, makeFloat, sqrt, join, sin, cos, dot, greaterThanEqual, cond, negate} from 'nodes/ShaderNode.js';
import makeVarNode from './makeVarNode.js';
import {uv} from './AttributeNodes.js';
import {resolution, frameCounter} from './UniformNodes.js';

const periodX = 50; //after how many X pixels the starting seed will loop
const periodY = 25; //after how many Y pixels the starting seed will loop
const periodFrames = 20; //after how many frames the starting seed will loop
const periodCalls = 10; //after how many random() calls seed will change to the next possible starting seed
//these variables are configurable
//their product is the number of possible seeds

const PRODUCT = uint(periodCalls * periodX * periodY * periodFrames);

const u1 = uint(1);

const f0   = float(0.0);
const f1   = float(1.0);
const f2   = float(2.0);
const f2PI = float(2 * Math.PI);

const ONE_OVER_MAX_UINT = float(1 / (2 ** 32 - 1));
const ONE_OVER_POW      = float(1 / 2 ** 32);

const u4   = uint(4);
const u22  = uint(22);
const u28  = uint(28);
const u27e = uint(277803737);
const u28e = uint(2891336453);
const u74e = uint(747796405);

const seed = makeVarNode(
	makeUint(
		add(
			mul(int(periodCalls * periodX * periodY), remainder(frameCounter,                   int(periodFrames))),
			mul(int(periodCalls * periodY),           remainder(floor(mul(uv.x, resolution.x)), int(periodX))),
			mul(int(periodCalls),                     remainder(floor(mul(uv.y, resolution.y)), int(periodY))),
		)
	)
);

function hash(num) { //taken from pcg-random.org
	const state = makeVarNode(add(mul(num, u74e), u28e));
	const word = makeVarNode(mul(xor(shiftRight(state, add(shiftRight(state, u28), u4)), state), u27e));
	return makeVarNode(makeFloat(xor(shiftRight(word, u22), word)));
}

function getNextHash() {
	return hash(makeVarNode(assign(seed, remainder(add(seed, u1), PRODUCT))));
}

export default function random() { //returns a value between 0 (inclusive) and 1 (exclusive)
	return makeVarNode(mul(getNextHash(), ONE_OVER_POW));
}

export default function randomInclusive() { //returns a value between 0 (inclusive) and 1 (inclusive)
	return makeVarNode(mul(getNextHash(), ONE_OVER_MAX_UINT));
}

export default function randomDirection() { //based on https://mathworld.wolfram.com/SpherePointPicking.html
	const u = makeVarNode(sub(mul(f2, randomInclusive()), f1));
	const root = makeVarNode(sqrt(sub(f1, mul(u, u))));
	const theta = makeVarNode(mul(f2PI, random()));
	return makeVarNode(join(
		mul(root, cos(theta)),
		mul(root, sin(theta)),
		u
	));
}

export default function randomHemisphereDirection(normal) {
	const direction = randomDirection();
	const condition = greaterThanEqual(dot(direction, normal), f0);
	return makeVarNode(cond(condition, normal, negate(normal)));
}