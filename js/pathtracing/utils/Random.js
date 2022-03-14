import {ShaderNode, int, float, uint, temp, pixel, add, mul, sub, remainder, floor, shiftRight, bitXor, sqrt, join, sin, cos, dot, greaterThanEqual, cond, negate} from 'three-nodes/ShaderNode.js';
import WebGLComputationRenderer from './WebGLComputationalRenderer.js';
import WebGPUComputationRenderer from './WebGPUComputationalRenderer.js';
import {resolution, frameCounter} from '../constants/UniformNodes.js';

let getHash, periodX, periodY, periodFrames, periodCalls, product, buffer, seed;

function hash(num) { //taken from pcg-random.org
	const state = temp(add(mul(num, uint(747796405)), uint(2891336453)));
	const word = temp(mul(bitXor(shiftRight(state, add(shiftRight(state, uint(28)), uint(4))), state), uint(277803737)));
	return bitXor(shiftRight(word, uint(22)), word);
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
	const pix = temp(pixel(resolution));
	seed = temp(
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
	
	const pregenerate = options.pregenerate === true;
	const renderer = options.renderer;
	
	if (pregenerate) {
		generateRandomBuffer(renderer);
		getHash = num => buffer.getBufferElement(num);
	} else
		getHash = num => temp(float(hash(num)));
	
	seed = generateSeed();
}

function getNextHash() {
	return getHash(temp(assign(seed, remainder(add(seed, uint(1)), uint(product)))));
}

const ONE_OVER_MAX_UINT = float(1 / (2 ** 32 - 1));
const ONE_OVER_POW      = float(1 / 2 ** 32);

export function random() { //returns a value between 0 (inclusive) and 1 (exclusive)
	return temp(mul(getNextHash(), ONE_OVER_POW));
}

export function randomInclusive() { //returns a value between 0 (inclusive) and 1 (inclusive)
	return temp(mul(getNextHash(), ONE_OVER_MAX_UINT));
}

export function randomDirection() { //based on https://mathworld.wolfram.com/SpherePointPicking.html
	const u = temp(sub(mul(2, randomInclusive()), 1));
	const root = temp(sqrt(sub(1, mul(u, u))));
	const theta = temp(mul(2 * Math.PI, random()));
	return temp(join(mul(root, cos(theta)), mul(root, sin(theta)), u));
}

export function randomHemisphereDirection(normal) {
	const direction = randomDirection();
	const condition = greaterThanEqual(dot(direction, normal), 0);
	return temp(cond(condition, normal, negate(normal)));
}