import {
	DataTexture,
	
	RepeatWrapping,
	RedFormat,
	
	UnsignedByteType,
	ByteType,
	ShortType,
	UnsignedShortType,
	IntType,
	UnsignedIntType,
	FloatType
} from 'three';
import {
	texture,
	element,
	temp,
	add,
	div,
	remainder,
	floor,
	
	float, int, uint,
	vec2, ivec2, uvec2,
	vec3, ivec3, uvec3,
	vec4, ivec4, uvec4
} from 'three-nodes/ShaderNode.js';
import TypedBuffer from './TypedBuffer.js';

const ZERO = int(0);

const floatMap = new Map();

function getFloat(num) {
	if (!floatMap.has(num))
		floatMap.set(num, float(num));
	return floatMap.get(num);
}

function getTextureElement(dataTexture, i, width, height) {
	const x = div(add(float(remainder(i, width)), getFloat(0.5)), width);
	const y = div(add(floor(div      (i, width)), getFloat(0.5)), height);
	
	return element(texture(dataTexture, vec2(x, y)), ZERO);
}

export default class WebGLTypedBuffer extends TypedBuffer {
	constructor(typedArray, elementSize) {
		//TODO: add support for UBOs when they will be added to the three.js
		
		super(typedArray, elementSize);
		
		let type, functionType;
		if (this.typedArray instanceof Int8Array) {
			type = ByteType;
			functionType = 'signed';
		} else if ((this.typedArray instanceof Uint8Array) || (this.typedArray instanceof Uint8ClampedArray)) {
			type = UnsignedByteType;
			functionType = 'unsigned';
		} else if (this.typedArray instanceof Int16Array) {
			type = ShortType;
			functionType = 'signed';
		} else if (this.typedArray instanceof Uint16Array) {
			type = UnsignedShortType;
			functionType = 'unsigned';
		} else if (this.typedArray instanceof Int32Array) {
			type = IntType;
			functionType = 'signed';
		} else if (this.typedArray instanceof Uint32Array) {
			type = UnsignedIntType;
			functionType = 'unsigned';
		} else if (this.typedArray instanceof Float32Array) {
			type = FloatType;
			functionType = 'float';
		}
		
		this.arrayLength = this.typedArray.length;
		this.length = this.arrayLength / this.elementSize;
		
		let width;
		for (width = Math.floor(Math.sqrt(this.arrayLength)); width > 0; width++) {
			if (this.arrayLength % width === 0)
				break;
		}
		const height = this.arrayLength / width;
			
		this._buffer = new DataTexture(this.typedArray, width, height, RedFormat, type);
		this._buffer.wrapS = this._buffer.wrapT = RepeatWrapping; //prevent from resizing if width or height is not a power of 2
		this._buffer.needsUpdate = true;
		
		this._width = getFloat(width);
		this._height = getFloat(height);
		
		if (this.elementSize === 1)
			this._function = (functionType === 'unsigned') ? uint : (functionType === 'signed') ? int : float;
		else if (this.elementSize === 2)
			this._function = (functionType === 'unsigned') ? uvec2 : (functionType === 'signed') ? ivec2 : vec2;
		else if (this.elementSize === 3)
			this._function = (functionType === 'unsigned') ? uvec3 : (functionType === 'signed') ? ivec3 : vec3;
		else if (this.elementSize === 4)
			this._function = (functionType === 'unsigned') ? uvec4 : (functionType === 'signed') ? ivec4 : vec4;
		
		this._elementSizeNode = getFloat(this.elementSize);
	}
	
	getBufferElement(i) {
		const start = mul(float(i), this._elementSizeNode);
		const arr = [];
		for (let ind = 0; ind < this.elementSize; ind++)
			arr.push(getTextureElement(this._buffer, add(start, getFloat(ind)), this._width, this._height));
		return temp(this._function(...arr));
	}
	
	setBufferElement(i, value) {
		//TODO: add support for elementSize > 1
		//for elementSize = 4 it could be added pretty easily by changing RedFormat to RGBAFormat
		
		if (elementSize !== 1)
			throw new Error('Output buffer cannot have element size greater than 1');
		
		return this._function(value);
	}
}