let lastUsedID = -1;

export default class RaytracingObject {
	constructor(type) {
		this.id = ++lastUsedID;
		this.type = type;
	}
}