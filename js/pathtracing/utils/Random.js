import {ShaderNode, int, float, uint, makeVar, pixel, add, mul, sub, remainder, floor, shiftRight, bitXor, sqrt, join, sin, cos, dot, greaterThanEqual, cond, negate} from 'three-nodes/ShaderNode.js';
import WebGLComputationRenderer from './WebGLComputationalRenderer.js';
import WebGPUComputationRenderer from './WebGPUComputationalRenderer.js';
import {resolution, frameCounter} from '../constants/UniformNodes.js';

let getHash, periodX, periodY, periodFrames, periodCalls, product, uPRODUCT, buffer, seed;

const u4   = uint(4);
const u22  = uint(22);
const u28  = uint(28);
const u27e = uint(277803737);
const u28e = uint(2891336453);
const u74e = uint(747796405);

function hash(num) { //taken from pcg-random.org
	const state = makeVar(add(mul(num, u74e), u28e));
	const word = makeVar(mul(bitXor(shiftRight(state, add(shiftRight(state, u28), u4)), state), u27e));
	return bitXor(shiftRight(word, u22), word);
}

function generateRandomBuffer(renderer) {
	const computationShader = new ShaderNode(({index}) => float(hash(index)));
	
	let computationRenderer;
	if (typeof renderer !== 'object')
		throw new TypeError('When pregenerating randomness a renderer is required');
	else if (renderer.isWebGLRenderer === true)
		computationRenderer = new WebGLComputationRenderer(computationShader);
	else if (renderer.isWebGPURenderer === true)
		computationRenderer = new WebGPUComputationRenderer(computationShader);
	else
		throw new TypeError('Renderer is not a WebGL or a WebGPU renderer');
	
	const srcBuffer = computationRenderer.createBuffer(new Int8Array(product));
	buffer = computationRenderer.createBuffer(new Float32Array(product));
	
	computationRenderer.setBuffers(srcBuffer, buffer);
	computationRenderer.compute(renderer);
}

function generateSeed() {
	const pix = makeVar(pixel(resolution));
	seed = makeVar(
		uint(
			add(
				mul(int(periodCalls * periodX * periodY), remainder(frameCounter, int(periodFrames))),
				mul(int(periodCalls * periodY),           remainder(int(pix.x),   int(periodX))),
				mul(int(periodCalls),                     remainder(int(pix.y),   int(periodY))),
			)
		)
	);
}

export function init(options) {
	options ||= {};
	
	options.periods ||= {};
	
	periodX = options.periods.x || 50; //after how many X pixels the starting seed will loop
	periodY = options.periods.y || 25; //after how many Y pixels the starting seed will loop
	periodFrames = options.periods.frames || 20; //after how many frames the starting seed will loop
	periodCalls = options.periods.calls || 10; //after how many random() calls seed will change to the next possible starting seed
	
	product = periodX * periodY * periodFrames * periodCalls;
	uPRODUCT = uint(product);
	
	const pregenerate = options.pregenerate === true;
	const renderer = options.renderer;
	
	if (pregenerate) {
		generateRandomBuffer(renderer);
		getHash = buffer.getBufferElement.bind(buffer);
	} else
		getHash = num => makeVar(float(hash(num)));
	
	seed = generateSeed();
}

const u1 = uint(1);

function getNextHash() {
	return getHash(makeVar(assign(seed, remainder(add(seed, u1), uPRODUCT))));
}

const ONE_OVER_MAX_UINT = float(1 / (2 ** 32 - 1));
const ONE_OVER_POW      = float(1 / 2 ** 32);

export function random() { //returns a value between 0 (inclusive) and 1 (exclusive)
	return makeVar(mul(getNextHash(), ONE_OVER_POW));
}

export function randomInclusive() { //returns a value between 0 (inclusive) and 1 (inclusive)
	return makeVar(mul(getNextHash(), ONE_OVER_MAX_UINT));
}

const f0   = float(0.0);
const f1   = float(1.0);
const f2   = float(2.0);
const f2PI = float(2 * Math.PI);

export function randomDirection() { //based on https://mathworld.wolfram.com/SpherePointPicking.html
	const u = makeVar(sub(mul(f2, randomInclusive()), f1));
	const root = makeVar(sqrt(sub(f1, mul(u, u))));
	const theta = makeVar(mul(f2PI, random()));
	return makeVar(join(mul(root, cos(theta)), mul(root, sin(theta)), u));
}

export function randomHemisphereDirection(normal) {
	const direction = randomDirection();
	const condition = greaterThanEqual(dot(direction, normal), f0);
	return makeVar(cond(condition, normal, negate(normal)));
}