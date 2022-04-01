import {float, vec3, cond, lessThan, abs, normalize, cross} from 'three-nodes/Nodes.js';

export default generateOrthonormalBasis(normal) {
	const vector = cond(lessThan(abs(normal.y), 0.9), vec3(0, 1, 0), vec3(1, 0, 0));
	
	const U = normalize(cross(vector, normal));
	const V = cross(normal, U);
	
	return [normal, U, V];
}