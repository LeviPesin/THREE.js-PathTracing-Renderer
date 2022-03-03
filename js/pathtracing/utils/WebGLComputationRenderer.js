import {Camera, Mesh, PlaneGeometry, Scene, WebGLRenderTarget} from 'three';
import {int, vec2, temp, pixel, add, mul} from 'three-nodes/ShaderNode.js';
import MeshBasicNodeMaterial from 'three-nodes/materials/MeshBasicNodeMaterial.js';
import {} from 'three-webgl/nodes/WebGLNodes.js';
import WebGLTypedBuffer from './WebGLTypedBuffer.js';

export default class WebGLComputationRenderer {
	constructor(shaderNode) {
		this.shaderNode = shaderNode;
		
		this._material = new MeshBasicNodeMaterial();
		this._scene = new Scene().add(new Mesh(new PlaneGeometry(2, 2), this._material));
		this._camera = new Camera();
	}
	
	createBuffer(...params) {
		return new WebGLTypedBuffer(...params);
	}
	
	setBuffers(srcBuffer, outBuffer) {
		this.srcBuffer = srcBuffer;
		this.outBuffer = outBuffer;
		
		outBuffer.isRenderTargetTexture = true;

		this._renderTarget = new WebGLRenderTarget(outBuffer.width, outBuffer.height, {depthBuffer: false});
		this._renderTarget.texture = outBuffer;
		
		const pixelNode = temp(pixel(vec2(outBuffer.width, outBuffer.height)));
		const index = temp(add(mul(int(pixelNode.y), int(outBuffer.width)), int(pixelNode.x)));
		const shaderParams = {index, element: srcBuffer.getBufferElement(index), buffer: srcBuffer};
		this._material.colorNode = outBuffer.setBufferElement(index, this.shaderNode(shaderParams));
	}
	
	compute(renderer) {
		const currentRenderTarget = renderer.getRenderTarget();
		renderer.setRenderTarget(this._renderTarget);
		renderer.render(this._scene, this._camera);
		renderer.setRenderTarget(currentRenderTarget);
	}
}