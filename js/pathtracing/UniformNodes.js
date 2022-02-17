import BoolNode from './BoolNode.js';
import IntNode from 'nodes/inputs/IntNode.js';
import FloatNode from 'nodes/inputs/FloatNode.js';
import Vector2Node from 'nodes/inputs/Vector2Node.js';
import Matrix4Node from 'nodes/inputs/Matrix4Node.js';
import TextureNode from 'nodes/inputs/TextureNode.js';

export const cameraIsMoving = new BoolNode();

export const sampleCounter       = new IntNode();
export const frameCounter        = new IntNode();
export const previousSampleCount = new IntNode();

export const eps_intersect = new FloatNode();
export const time          = new FloatNode();
export const uLength       = new FloatNode();
export const vLength       = new FloatNode();
export const apertureSize  = new FloatNode();
export const focusDistance = new FloatNode();

export const resolution = new Vector2Node();
export const randomVec2 = new Vector2Node();

export const cameraMatrix = new Matrix4Node();

export const previousTexture  = new TextureNode(null, null);
export const blueNoiseTexture = new TextureNode(null, null);