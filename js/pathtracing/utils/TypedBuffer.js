export default class TypedBuffer {
	constructor(typedArray, elementSize = 1) {
		if ((elementSize !== 1) && (elementSize !== 2) && (elementSize !== 3) && (elementSize !== 4))
			throw new Error('Element size can be only 1, 2, 3, or 4');
		
		if ((typedArray instanceof Float64Array) || (typedArray instanceof BigInt64Array) || (typedArray instanceof BigUint64Array))
			throw new Error('Float64Array, BigInt64Array, and BigUint64Array are not allowed');
		else if (!ArrayBuffer.isView(typedArray) || (typedArray instanceof DataView))
			throw new Error('First argument must be a typed array');
		
		this.elementSize = elementSize;
		
		this._typedArray = typedArray;
		this._buffer = null;
	}
	
	get typedArray() {
		return this._typedArray;
	}
	
	set typedArray(typedArray) {
		this._typedArray.set(typedArray);
	}
	
	get buffer() {
		return this._buffer;
	}
	
	set buffer(value) {
		throw new Error('GPU buffer of a TypedBuffer cannot be changed');
	}
	
	get length() {
		return this._typedArray.length / this.elementSize;
	}
	
	getBufferElement(i) {
		console.warn('Abstract function.');
	}
	
	setBufferElement(i, value) {
		console.warn('Abstract function.');
	}
}