import {float, vec3, cond, lessThan, abs, temp, normalize, cross} from 'three-nodes/ShaderNode.js';

const ZERO_POINT_NINE = float(0.9);

const Y = vec3(0, 1, 0);
const X = vec3(1, 0, 0);

export default generateOrthonormalBasis(normal) {
	const vector = cond(lessThan(abs(normal.y), ZERO_POINT_NINE), Y, X);
	
	const U = temp(normalize(cross(vector, normal)));
	const V = temp(cross(normal, U));
	
	return [normal, U, V];
}