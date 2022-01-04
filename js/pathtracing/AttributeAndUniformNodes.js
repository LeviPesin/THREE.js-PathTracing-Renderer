import UVNode from '../nodes/accessors/UVNode.js';
import IntNode from '../nodes/inputs/IntNode.js';
import FloatNode from '../nodes/inputs/FloatNode.js';
import Vector2Node from '../nodes/inputs/Vector2Node.js';
import Matrix4Node from '../nodes/inputs/Matrix4Node.js';
import TextureNode from '../nodes/inputs/TextureNode.js';

const attributeNodes = {uv: new UVNode()};

const uniformNodes = {
	cameraIsMoving: new IntNode(), //there is no BoolNode
	sceneIsDynamic: new IntNode(),
	
	sampleCounter  : new IntNode(),
	frameCounter   : new IntNode(),
	samplesPerFrame: new IntNode(),
	
	frameBlendingAmount: new FloatNode(),
	
	eps_intersect: new FloatNode(),
	time         : new FloatNode(),
	uLength      : new FloatNode(),
	vLength      : new FloatNode(),
	apertureSize : new FloatNode(),
	focusDistance: new FloatNode(),
	
	resolution: new Vector2Node(),
	randomVec2: new Vector2Node(),
	
	cameraMatrix: new Matrix4Node(),
	
	previousTexture : new TextureNode(null, null),
	blueNoiseTexture: new TextureNode(null, null)
};

export {attributeNodes, uniformNodes};