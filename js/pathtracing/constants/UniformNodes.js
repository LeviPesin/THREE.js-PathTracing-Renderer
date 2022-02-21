import {uniform, bool, uint, float, vec2, mat4, texture} from 'nodes/ShaderNode.js';

export const cameraIsMoving = uniform(bool());

export const sampleCounter       = uniform(uint());
export const frameCounter        = uniform(uint());
export const previousSampleCount = uniform(uint());

export const eps_intersect = uniform(float());
export const time          = uniform(float());
export const uLength       = uniform(float());
export const vLength       = uniform(float());
export const apertureSize  = uniform(float());
export const focusDistance = uniform(float());

export const resolution = uniform(vec2());
export const randomVec2 = uniform(vec2());

export const cameraMatrix = uniform(mat4());

export const previousTexture  = uniform(texture());
export const blueNoiseTexture = uniform(texture());