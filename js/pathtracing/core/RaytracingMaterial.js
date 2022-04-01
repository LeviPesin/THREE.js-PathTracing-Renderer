import {DIFF} from '../constants/ConstantNodes.js';
import {vec3} from 'three-nodes/Nodes.js';

export default class RaytracingMaterial {
	constructor(type = DIFF, color = vec3(1, 1, 1), emission = vec3(0, 0, 0)) {
		this.type = type;
		this.color = color;
		this.emission = emission;
	}
}