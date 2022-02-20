import {int, float, uint, add, mul, sub, remainder, floor, shiftRight, xor, makeFloat, sqrt, join, sin, cos, dot, greaterThanEqual, cond, negate} from 'nodes/ShaderNode.js';
import makeVarNode from './makeVarNode.js';
import {ZERO, ONE, TWO, TWO_PI} from './ConstantNodes.js';
import {uv} from './AttributeNodes.js';
import {resolution, frameCounter} from './UniformNodes.js';

const periodX = 50; //after how many X pixels the starting seed will loop
const periodY = 25; //after how many Y pixels the starting seed will loop
const periodFrames = 20; //after how many frames the starting seed will loop
const periodCalls = 10; //after how many random() calls seed will change to the next possible starting seed
//these variables are configurable
//their product is the number of possible seeds

const PRODUCT = uint(periodCalls * periodX * periodY * periodFrames);

const UONE = uint(1);

const ONE_OVER_MAX_UINT = float(1 / (2 ** 32 - 1));
const ONE_OVER_POW      = float(1 / 2 ** 32);

const FOUR = uint(4);
const n22  = uint(22);
const n28  = uint(28);
const n27e = uint(277803737);
const n28e = uint(2891336453);
const n74e = uint(747796405);

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
	const state = makeVarNode(add(mul(num, n74e), n28e));
	const word = makeVarNode(mul(xor(shiftRight(state, add(shiftRight(state, n28), FOUR)), state), n27e));
	return makeVarNode(makeFloat(xor(shiftRight(word, n22), word)));
}

function getNextHash() {
	return hash(makeVarNode(assign(seed, remainder(add(seed, UONE), PRODUCT))));
}

export default function random() { //returns a value between 0 (inclusive) and 1 (exclusive)
	return makeVarNode(mul(getNextHash(), ONE_OVER_POW));
}

export default function randomInclusive() { //returns a value between 0 (inclusive) and 1 (inclusive)
	return makeVarNode(mul(getNextHash(), ONE_OVER_MAX_UINT));
}

export default function randomDirection() { //based on https://mathworld.wolfram.com/SpherePointPicking.html
	const u = makeVarNode(sub(mul(TWO, randomInclusive()), ONE));
	const root = makeVarNode(sqrt(sub(ONE, mul(u, u))));
	const theta = makeVarNode(mul(TWO_PI, random()));
	return makeVarNode(join(
		mul(root, cos(theta)),
		mul(root, sin(theta)),
		u
	));
}

export default function randomHemisphereDirection(normal) {
	const direction = randomDirection();
	const condition = greaterThanEqual(dot(direction, normal), ZERO);
	return makeVarNode(cond(condition, normal, negate(normal)));
}