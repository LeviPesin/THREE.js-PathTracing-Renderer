import {float, vec3, cond, lessThan, abs, temp, normalize, cross} from 'three-nodes/Nodes.js';

export default generateOrthonormalBasis(normal) {
	const vector = cond(lessThan(abs(normal.y), 0.9), vec3(0, 1, 0), vec3(1, 0, 0));
	
	const U = temp(normalize(cross(vector, normal)));
	const V = temp(cross(normal, U));
	
	return [normal, U, V];
}