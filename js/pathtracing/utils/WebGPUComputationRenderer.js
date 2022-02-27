import {localInvocationIndex} from /*'something'*/;
import WebGPUTypedBuffer from './WebGPUTypedBuffer.js';

export default class WebGPUComputationRenderer {
	constructor(shaderNode) {
		this.shaderNode = shaderNode;
	}
	
	createBuffer(...params) {
		return new WebGPUTypedBuffer(...params);
	}
	
	setBuffers(srcBuffer, outBuffer) {
		this.srcBuffer = srcBuffer;
		this.outBuffer = outBuffer;
		
		const index = localInvocationIndex;
		const shaderParams = {index, element: srcBuffer.getBufferElement(index), buffer: srcBuffer};
		this._shader = outBuffer.setBufferElement(index, this.shaderNode(shaderParams));
	}
	
	compute(renderer) {
		renderer.compute(this._shader, {workgroupSize: this.outBuffer.length});
	}
}