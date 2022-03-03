import {BufferAttribute} from 'three';
import {storage, element, assign} from 'three-nodes/ShaderNode.js';
import TypedBuffer from './TypedBuffer.js';

export default class WebGPUTypedBuffer extends TypedBuffer {
	constructor(typedArray, elementSize) {
		super(typedArray, elementSize);
		
		this._buffer = storage(new BufferAttribute(this.typedArray, this.elementSize));
	}
	
	getBufferElement(i) {
		return temp(element(this._buffer, i));
	}
	
	setBufferElement(i, value) {
		return assign(element(this._buffer, i), value);
	}
}